import { create } from "zustand";
import { settingsApi } from "../api";
import { invoke } from "@tauri-apps/api/core";

// Database keys
const SETTINGS_KEY_AUDIO_SOURCE = "audio_source";
const SETTINGS_KEY_SELECTED_MIC_ID = "selected_mic_id";

export type AudioSource = "auto" | "mic_only";

interface SettingsState {
    audioSource: AudioSource;
    selectedMicId: string | null;
    settingsLoaded: boolean;

    // Actions
    loadSettings: () => Promise<void>;
    setAudioSource: (source: AudioSource) => Promise<void>;
    setSelectedMicId: (id: string | null) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    audioSource: "auto",
    selectedMicId: null,
    settingsLoaded: false,

    loadSettings: async () => {
        try {
            const settings = await invoke<Record<string, string | null>>('get_settings', {
                keys: [SETTINGS_KEY_AUDIO_SOURCE, SETTINGS_KEY_SELECTED_MIC_ID],
            });

            const source = settings[SETTINGS_KEY_AUDIO_SOURCE];
            const micId = settings[SETTINGS_KEY_SELECTED_MIC_ID];

            if (source && (source === "auto" || source === "mic_only")) {
                set({ audioSource: source as AudioSource });
            }
            if (micId) {
                set({ selectedMicId: micId });
            }
            set({ settingsLoaded: true });
        } catch (e) {
            console.error("Failed to load settings:", e);
            set({ settingsLoaded: true });
        }
    },

    setAudioSource: async (source: AudioSource) => {
        try {
            set({ audioSource: source });
            await settingsApi.set(SETTINGS_KEY_AUDIO_SOURCE, source);
        } catch (e) {
            console.error("Failed to save audio source:", e);
        }
    },

    setSelectedMicId: async (id: string | null) => {
        try {
            set({ selectedMicId: id });
            await settingsApi.set(SETTINGS_KEY_SELECTED_MIC_ID, id || "");
        } catch (e) {
            console.error("Failed to save selected mic id:", e);
        }
    },
}));
