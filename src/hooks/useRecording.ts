import { useCallback, useEffect, useRef, useState } from "react";
import { audioApi } from "../api";
import { RecordingPhase } from "../types";

import { useSettingsStore } from "../stores/settingsStore";

interface UseRecordingReturn {
  isRecording: boolean;
  isPaused: boolean;
  recordingPhase: RecordingPhase;
  audioLevel: number;
  audioPath: string | null;
  error: string | null;
  isDualRecording: boolean;
  startRecording: (noteId: string) => Promise<void>;
  stopRecording: (noteId?: string) => Promise<string | null>;
  pauseRecording: () => Promise<void>;
  resumeRecording: (noteId: string) => Promise<void>;
  continueRecording: (noteId: string) => Promise<void>;
}

export function useRecording(): UseRecordingReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingPhase, setRecordingPhase] = useState<RecordingPhase>(
    RecordingPhase.Idle
  );
  const [audioLevel, setAudioLevel] = useState(0);
  const [audioPath, setAudioPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDualRecording, setIsDualRecording] = useState(false);
  const levelIntervalRef = useRef<number | null>(null);
  const currentNoteIdRef = useRef<string | null>(null);

  // Load settings
  const audioSource = useSettingsStore((state) => state.audioSource);
  const selectedMicId = useSettingsStore((state) => state.selectedMicId);
  const loadSettings = useSettingsStore((state) => state.loadSettings);

  // Ensure settings are loaded on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const startRecording = useCallback(async (noteId: string) => {
    try {
      setError(null);
      currentNoteIdRef.current = noteId;

      // Determine if we should try system audio based on settings
      let trySystemAudio = audioSource === "auto";

      // If setting allows, check if system supports it
      if (trySystemAudio) {
        trySystemAudio = await audioApi.isSystemAudioSupported();
      }

      const hasPermission = trySystemAudio
        ? await audioApi.hasSystemAudioPermission()
        : false;

      if (trySystemAudio && hasPermission) {
        // Use dual recording (mic + system audio)
        console.log("Starting dual recording (mic + system audio). Mic:", selectedMicId || "Default");
        const result = await audioApi.startDualRecording(noteId, selectedMicId);
        // Use the playback path if available, otherwise mic path
        setAudioPath(result.playbackPath || result.systemPath || result.micPath);
        setIsDualRecording(true);
      } else {
        // Fall back to mic-only recording
        console.log("Starting mic-only recording. Mic:", selectedMicId || "Default");
        const path = await audioApi.startRecording(noteId, selectedMicId);
        setAudioPath(path);
        setIsDualRecording(false);
      }
      setIsRecording(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [audioSource, selectedMicId]); // Add audioSource and selectedMicId dependency

  const stopRecording = useCallback(
    async (noteId?: string): Promise<string | null> => {
      try {
        setError(null);
        const id = noteId || currentNoteIdRef.current;

        let path: string | null = null;

        if (isDualRecording && id) {
          // Stop dual recording
          console.log("Stopping dual recording");
          const result = await audioApi.stopDualRecording(id);
          // Use the merged playback path, or fall back to system path, then mic path
          path = result.playbackPath || result.systemPath || result.micPath;
        } else {
          // Stop mic-only recording
          console.log("Stopping mic-only recording");
          path = await audioApi.stopRecording();
        }

        setAudioPath(path);
        setIsRecording(false);
        setIsPaused(false);
        setRecordingPhase(RecordingPhase.Idle);
        setIsDualRecording(false);
        setAudioLevel(0);
        currentNoteIdRef.current = null;
        return path;
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        return null;
      }
    },
    [isDualRecording]
  );

  const pauseRecording = useCallback(async () => {
    try {
      setError(null);
      if (isDualRecording) {
        console.log("Pausing dual recording");
        await audioApi.pauseDualRecording();
      } else {
        // For mic-only, stop the recording (pause not supported for simple mic recording)
        console.log("Pausing mic-only recording (stopping)");
        await audioApi.stopRecording();
      }
      setIsRecording(false);
      setIsPaused(true);
      setRecordingPhase(RecordingPhase.Paused);
      setAudioLevel(0);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [isDualRecording]);

  const resumeRecording = useCallback(async (noteId: string) => {
    try {
      setError(null);
      currentNoteIdRef.current = noteId;

      // Check if we should use dual recording based on audioSource setting
      const useDualRecording = audioSource === "auto";

      if (useDualRecording) {
        console.log("Resuming dual recording (mic + system audio)");
        const result = await audioApi.resumeDualRecording(noteId);
        setAudioPath(result.playbackPath || result.systemPath || result.micPath);
        setIsDualRecording(result.systemPath !== null);
      } else {
        // User explicitly chose mic-only mode ("In Loco")
        // For resume, we need to continue the mic recording
        console.log("Resuming mic-only recording (In Loco mode). Mic:", selectedMicId || "Default");
        const path = await audioApi.startRecording(noteId, selectedMicId);
        setAudioPath(path);
        setIsDualRecording(false);
      }

      setIsRecording(true);
      setIsPaused(false);
      setRecordingPhase(RecordingPhase.Recording);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [audioSource, selectedMicId]);

  const continueRecording = useCallback(async (noteId: string) => {
    try {
      setError(null);
      currentNoteIdRef.current = noteId;

      // Check if we should use dual recording based on audioSource setting
      const useDualRecording = audioSource === "auto";

      if (useDualRecording) {
        // Check if system audio is supported and has permission
        const supported = await audioApi.isSystemAudioSupported();
        const hasPermission = supported ? await audioApi.hasSystemAudioPermission() : false;

        if (supported && hasPermission) {
          console.log("Continuing with dual recording (mic + system audio). Mic:", selectedMicId || "Default");
          const result = await audioApi.continueNoteRecording(noteId, selectedMicId);
          setAudioPath(result.playbackPath || result.systemPath || result.micPath);
          setIsDualRecording(true);
        } else {
          // Fall back to mic-only
          console.log("System audio not available, continuing with mic-only. Mic:", selectedMicId || "Default");
          const path = await audioApi.startRecording(noteId, selectedMicId);
          setAudioPath(path);
          setIsDualRecording(false);
        }
      } else {
        // User explicitly chose mic-only mode ("In Loco")
        console.log("Continuing with mic-only recording (In Loco mode). Mic:", selectedMicId || "Default");
        const path = await audioApi.startRecording(noteId, selectedMicId);
        setAudioPath(path);
        setIsDualRecording(false);
      }

      setIsRecording(true);
      setIsPaused(false);
      setRecordingPhase(RecordingPhase.Recording);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [audioSource, selectedMicId]);

  // Poll audio level while recording
  useEffect(() => {
    if (isRecording) {
      levelIntervalRef.current = window.setInterval(async () => {
        try {
          const level = await audioApi.getAudioLevel();
          setAudioLevel(level);
        } catch {
          // Ignore errors during polling
        }
      }, 100);
    } else {
      if (levelIntervalRef.current) {
        clearInterval(levelIntervalRef.current);
        levelIntervalRef.current = null;
      }
    }

    return () => {
      if (levelIntervalRef.current) {
        clearInterval(levelIntervalRef.current);
      }
    };
  }, [isRecording]);

  // Check initial recording status
  useEffect(() => {
    audioApi.getRecordingStatus().then(setIsRecording).catch(console.error);
  }, []);

  return {
    isRecording,
    isPaused,
    recordingPhase,
    audioLevel,
    audioPath,
    error,
    isDualRecording,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    continueRecording,
  };
}
