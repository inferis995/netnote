import { Note } from "../types";
import { Logo3DCard } from "./Logo3DCard";
// import logoImage from "../assets/logo_3d.jpg"; // Removed static import

interface DashboardProps {
    onNewNote: () => void;
    recentNotes: Note[];
    onSelectNote: (note: Note) => void;
    onOpenSettings: () => void;
    stats: {
        totalNotes: number;
        totalRecordings: number;
    };
}

export function Dashboard({
    onNewNote,
    recentNotes,
    onSelectNote,
    onOpenSettings,
    stats,
}: DashboardProps) {
    return (
        <div className="flex-1 overflow-y-auto bg-[var(--color-bg)] p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-4">
                        {/* 3D Brand Logo */}
                        <div className="w-14 h-14">
                            <Logo3DCard />
                        </div>
                        <div>
                            <h1 className="text-2xl tracking-tight text-[var(--color-text)] flex items-center">
                                <span className="font-light">Net</span><span className="font-bold">Note</span>
                            </h1>
                            <p className="text-xs text-[var(--color-text-tertiary)] font-medium uppercase tracking-widest">
                                Workspace Intelligente
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onOpenSettings}
                        className="p-2.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)] dark:hover:bg-white/5 transition-all flex items-center justify-center"
                        title="Impostazioni"
                    >
                        <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-1.066 2.573c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[160px]">

                    {/* Main Action - Create Note (Span 2 columns, 2 rows) */}
                    <button
                        onClick={onNewNote}
                        className="group relative col-span-1 md:col-span-2 row-span-2 rounded-2xl p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                        style={{
                            backgroundColor: "var(--color-bg-elevated)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <div className="absolute top-0 right-0 p-32 bg-[var(--color-sidebar-hover)] blur-[100px] rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                        </div>

                        <div className="relative z-10">
                            <span className="inline-flex items-center justify-center p-3 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] mb-6 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-300">
                                <svg className="w-6 h-6 text-[var(--color-text)] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                            </span>
                            <h2 className="text-3xl font-bold text-[var(--color-text)] mb-2">Nuova Sessione</h2>
                            <p className="text-[var(--color-text-secondary)] max-w-sm text-lg leading-relaxed opacity-80">
                                Avvia una registrazione o scrivi appunti. L'IA è pronta.
                            </p>
                        </div>

                        <div className="relative z-10 flex items-center text-sm font-bold text-[var(--color-text-tertiary)] group-hover:text-orange-500 transition-colors uppercase tracking-wider">
                            Inizia Subito <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </button>

                    {/* Stats Card - Notes (Span 1 col, 1 row) */}
                    <div
                        className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group"
                        style={{
                            backgroundColor: "var(--color-bg-elevated)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />

                        <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest z-10 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Note Totali
                        </span>

                        <div>
                            <span className="text-5xl font-black tracking-tighter text-[var(--color-text)]">
                                {stats.totalNotes}
                            </span>
                            <span className="block text-sm text-[var(--color-text-secondary)] mt-1 font-medium">Archiviate in locale</span>
                        </div>
                    </div>

                    {/* Pro Tips / Hotkeys (Span 1 col, 1 row) - REPLACED RECORDING MINS */}
                    <div
                        className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
                        style={{
                            backgroundColor: "var(--color-bg-elevated)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Scorciatoie
                        </span>

                        <div className="space-y-2 mt-4 overflow-y-auto max-h-[220px] pr-2 custom-scrollbar">
                            <div className="flex items-center justify-between text-sm group cursor-help">
                                <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">Nuova Nota</span>
                                <kbd className="px-2 py-0.5 rounded bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-bold text-[var(--color-text-secondary)]">Ctrl+N</kbd>
                            </div>
                            <div className="flex items-center justify-between text-sm group cursor-help">
                                <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">Nuova e Registra</span>
                                <kbd className="px-2 py-0.5 rounded bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-bold text-[var(--color-text-secondary)]">Ctrl+R</kbd>
                            </div>
                            <div className="flex items-center justify-between text-sm group cursor-help">
                                <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">Stop Registra</span>
                                <kbd className="px-2 py-0.5 rounded bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-bold text-[var(--color-text-secondary)]">Ctrl+S</kbd>
                            </div>
                            <div className="flex items-center justify-between text-sm group cursor-help">
                                <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">Tema</span>
                                <kbd className="px-2 py-0.5 rounded bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-bold text-[var(--color-text-secondary)]">Ctrl+M</kbd>
                            </div>
                            <div className="flex items-center justify-between text-sm group cursor-help">
                                <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">Impostazioni</span>
                                <kbd className="px-2 py-0.5 rounded bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-bold text-[var(--color-text-secondary)]">Ctrl+,</kbd>
                            </div>
                            <div className="flex items-center justify-between text-sm group cursor-help">
                                <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">Chiudi</span>
                                <kbd className="px-2 py-0.5 rounded bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-bold text-[var(--color-text-secondary)]">Esc</kbd>
                            </div>
                        </div>
                    </div>

                </div>


                {/* Recent Notes Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-[var(--color-text)]">Note Recenti</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentNotes.length > 0 ? (
                            recentNotes.map((note) => (
                                <button
                                    key={note.id}
                                    onClick={() => onSelectNote(note)}
                                    className="group flex flex-col items-start p-5 rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                                    style={{
                                        backgroundColor: "var(--color-bg-elevated)",
                                        border: "1px solid var(--color-border)",
                                    }}
                                >
                                    <div className="w-full flex justify-between items-start mb-3">
                                        <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                                            {(() => {
                                                if (!note.updated_at) return "Oggi";
                                                const d = new Date(note.updated_at);
                                                return isNaN(d.getTime()) ? "Oggi" : d.toLocaleDateString("it-IT", { day: 'numeric', month: 'long' });
                                            })()}
                                        </span>
                                        {/* Optional Icon/Dot */}
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-border)] group-hover:bg-orange-500 transition-colors" />
                                    </div>

                                    <h4 className="text-base font-semibold text-[var(--color-text)] mb-2 line-clamp-1 group-hover:underline decoration-1 underline-offset-4 decoration-zinc-500/30">
                                        {note.title}
                                    </h4>

                                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 text-left">
                                        {note.description || "Nessun contenuto aggiuntivo..."}
                                    </p>
                                </button>
                            ))
                        ) : (
                            <div
                                className="col-span-3 py-12 rounded-2xl border border-dashed flex items-center justify-center text-[var(--color-text-tertiary)]"
                                style={{ borderColor: "var(--color-border)" }}
                            >
                                Nessuna nota recente.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
