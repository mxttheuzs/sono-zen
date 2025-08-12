import { useState } from "react";
import { programDetailedData, type ProgramPhase } from "@shared/program-data";
import { Moon, Calendar, Target, ChevronDown, ChevronUp } from "lucide-react";

export function DetailedProgramView() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const phases = [
    { ...programDetailedData.phase1, number: 1, period: "Dias 1 a 7" },
    { ...programDetailedData.phase2, number: 2, period: "Dias 8 a 14" },
    { ...programDetailedData.phase3, number: 3, period: "Dias 15 a 21" },
    { ...programDetailedData.phase4, number: 4, period: "Dias 22 a 30" },
  ];

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhase(expandedPhase === phaseNumber ? null : phaseNumber);
    setExpandedActivity(null);
  };

  const toggleActivity = (activityKey: string) => {
    setExpandedActivity(expandedActivity === activityKey ? null : activityKey);
  };

  const getPhaseColor = (phaseNumber: number) => {
    const colors = [
      "from-blue-500/20 to-blue-600/20 border-blue-500/30",
      "from-purple-500/20 to-purple-600/20 border-purple-500/30",
      "from-green-500/20 to-green-600/20 border-green-500/30",
      "from-orange-500/20 to-orange-600/20 border-orange-500/30",
    ];
    return colors[phaseNumber - 1];
  };

  const getPhaseIconColor = (phaseNumber: number) => {
    const colors = ["text-blue-400", "text-purple-400", "text-green-400", "text-orange-400"];
    return colors[phaseNumber - 1];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--dark-bg)] via-[var(--card-bg)] to-[var(--dark-bg)] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--accent-blue)]/30 to-[var(--celestial-blue)]/30 rounded-2xl mb-6 backdrop-blur-sm border border-[var(--accent-blue)]/20">
            <Moon className="w-8 h-8 text-[var(--accent-blue)]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Programa Completo{" "}
            <span className="bg-gradient-to-r from-[var(--accent-blue)] via-[var(--celestial-blue)] to-[var(--accent-blue)] bg-clip-text text-transparent">
              Sono Zen
            </span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Transforme seu sono em 30 dias através de técnicas científicas e práticas milenares de relaxamento
          </p>
        </div>

        {/* Phases */}
        <div className="max-w-4xl mx-auto space-y-6">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className={`bg-gradient-to-r ${getPhaseColor(phase.number)} rounded-3xl border backdrop-blur-lg overflow-hidden transition-all duration-300`}
            >
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phase.number)}
                className="w-full p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${getPhaseIconColor(phase.number)}`}>
                      <span className="text-xl font-bold">{phase.number}</span>
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {phase.title}
                      </h2>
                      <p className="text-white/70 text-sm">{phase.period}</p>
                    </div>
                  </div>
                  {expandedPhase === phase.number ? (
                    <ChevronUp className="w-6 h-6 text-white/70" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-white/70" />
                  )}
                </div>
              </button>

              {/* Phase Activities */}
              {expandedPhase === phase.number && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {phase.activities.map((activity, index) => {
                      const activityKey = `${phase.number}-${index}`;
                      return (
                        <div
                          key={activityKey}
                          className="bg-black/20 rounded-2xl border border-white/10 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleActivity(activityKey)}
                            className="w-full p-4 text-left hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                  <Calendar className="w-4 h-4 text-white/70" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-white">
                                    {activity.day} - {activity.title}
                                  </h3>
                                </div>
                              </div>
                              {expandedActivity === activityKey ? (
                                <ChevronUp className="w-5 h-5 text-white/70" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-white/70" />
                              )}
                            </div>
                          </button>

                          {expandedActivity === activityKey && (
                            <div className="px-4 pb-4">
                              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                <Target className="w-5 h-5 text-[var(--accent-blue)] mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="text-sm font-medium text-[var(--accent-blue)] mb-2">
                                    Objetivo
                                  </h4>
                                  <p className="text-white/80 text-sm leading-relaxed">
                                    {activity.objective}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[var(--accent-blue)]/20 to-[var(--celestial-blue)]/20 rounded-3xl border border-[var(--accent-blue)]/30 p-8 max-w-2xl mx-auto backdrop-blur-lg">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para Transformar Seu Sono?
            </h3>
            <p className="text-white/80 mb-6">
              Comece hoje mesmo sua jornada para noites mais tranquilas e dias mais produtivos
            </p>
            <button className="bg-gradient-to-r from-[var(--accent-blue)] to-[var(--celestial-blue)] text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-[var(--accent-blue)]/25 transition-all duration-300">
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}