import { useState, useEffect } from "react";
import { useModels, useOllama, useUpdater, useSystemStatus } from "../../hooks";
import { useProfile } from "./useProfile";

import { ProfileTab } from "./ProfileTab";
import { AppearanceTab } from "./AppearanceTab";
import { SystemTab } from "./SystemTab";
import { WhisperTab } from "./WhisperTab";
import { OllamaTab } from "./OllamaTab";
import { PrivacyTab } from "./PrivacyTab";
import { ShortcutsTab } from "./ShortcutsTab";
import { AboutTab } from "./AboutTab";
import { UpdatesTab } from "./UpdatesTab";
import { DisclaimerTab } from "./DisclaimerTab";

type SettingsTab =
  | "profile"
  | "appearance"
  | "system"
  | "whisper"
  | "ollama"
  | "privacy"
  | "shortcuts"
  | "about"
  | "updates"
  | "disclaimer";

interface SettingsProps {
  onClose: () => void;
  initialTab?: SettingsTab;
  onTabChange?: (tab: SettingsTab) => void;
}

const DEFAULT_TAB: SettingsTab = "about";

export function Settings({ onClose, initialTab = DEFAULT_TAB, onTabChange }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  const { profile } = useProfile();

  // Sync activeTab when initialTab changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const { loadedModel } = useModels();
  const { isRunning: ollamaRunning, selectedModel: ollamaModel } = useOllama();
  const { available: updateAvailable } = useUpdater();
  const { micAvailable, micPermission, systemAudioSupported, systemAudioPermission, loading: systemLoading } = useSystemStatus();

  // Check if each setting needs attention
  const profileNeedsSetup = !profile.name;
  const whisperNeedsSetup = !loadedModel;
  const ollamaNeedsSetup = !ollamaRunning || !ollamaModel;
  const systemNeedsSetup = !systemLoading && (!micAvailable || !micPermission || (systemAudioSupported && !systemAudioPermission));

  type TabItem = {
    id: SettingsTab;
    label: string;
    warning: boolean;
  };

  type TabSection = {
    title: string;
    tabs: TabItem[];
  };

  const sections: TabSection[] = [
    {
      title: "Generale",
      tabs: [
        { id: "appearance", label: "Aspetto", warning: false },
        { id: "profile", label: "Profilo", warning: profileNeedsSetup },
        { id: "system", label: "Sistema", warning: systemNeedsSetup },
      ],
    },
    {
      title: "IA",
      tabs: [
        { id: "whisper", label: "Whisper", warning: whisperNeedsSetup },
        { id: "ollama", label: "Ollama", warning: ollamaNeedsSetup },
      ],
    },
    {
      title: "Info",
      tabs: [
        { id: "about", label: "Info", warning: false },
        { id: "updates", label: "Updates", warning: updateAvailable },
        { id: "shortcuts", label: "Hotkeys", warning: false },
        { id: "privacy", label: "Privacy", warning: false },
        { id: "disclaimer", label: "Note", warning: false },
      ],
    },
  ];

  // Flatten tabs for lookup
  const allTabs = sections.flatMap((section) => section.tabs);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-3xl rounded-3xl overflow-hidden flex flex-col shadow-2xl relative transition-all duration-200"
        style={{
          backgroundColor: "var(--color-bg-elevated)",
          maxHeight: "85vh",
          height: "700px",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Content Container - Flex Row for "Smart" Navigation */}
        <div className="flex h-full">

          {/* Left Navigation - Linear Style */}
          <div className="w-56 shrink-0 py-6 pl-6 pr-2 flex flex-col gap-6 overflow-y-auto">
            <h2 className="px-3 text-lg font-bold tracking-tight" style={{ color: "var(--color-text)" }}>
              Impostazioni
            </h2>

            <div className="flex flex-col gap-6">
              {sections.map((section) => (
                <div key={section.title} className="flex flex-col gap-1">
                  <h3
                    className="px-3 text-[11px] font-bold uppercase tracking-widest opacity-40 select-none mb-1"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {section.title}
                  </h3>
                  {section.tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className="group relative flex items-center justify-between px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 text-left"
                      style={{
                        backgroundColor: activeTab === tab.id ? "var(--color-sidebar-hover)" : "transparent",
                        color: activeTab === tab.id ? "var(--color-text)" : "var(--color-text-secondary)",
                      }}
                    >
                      <span>{tab.label}</span>
                      {tab.warning && (
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Scrollable */}
          <div className="flex-1 min-w-0 flex flex-col bg-[var(--color-bg)]/50">
            {/* Close Button Mobile/Corner */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onClose}
                className="p-2 rounded-full transition-colors hover:bg-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text)]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="max-w-2xl mx-auto space-y-10 pt-2">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold tracking-tight" style={{ color: "var(--color-text)" }}>
                    {allTabs.find(t => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)]">Gestisci le impostazioni per questa sezione.</p>
                </div>

                {activeTab === "about" && <AboutTab />}
                {activeTab === "profile" && <ProfileTab />}
                {activeTab === "appearance" && <AppearanceTab />}
                {activeTab === "system" && <SystemTab />}
                {activeTab === "whisper" && <WhisperTab />}
                {activeTab === "ollama" && <OllamaTab />}
                {activeTab === "shortcuts" && <ShortcutsTab />}
                {activeTab === "privacy" && <PrivacyTab />}
                {activeTab === "updates" && <UpdatesTab />}
                {activeTab === "disclaimer" && <DisclaimerTab />}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
