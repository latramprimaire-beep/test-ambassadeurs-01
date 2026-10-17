import React, { useState } from 'react';
import { SCENARIOS } from '../data/scenariosData';
import type { ScenarioChoice } from '../utils/gameLogic';
import { playSuccessChime, playReflectionTone, playChoiceClick } from '../utils/soundEffects';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  RotateCcw, 
  ArrowRight, 
  MapPin, 
  ShieldAlert, 
  Star,
  Sparkles,
  Award
} from 'lucide-react';

interface ScenarioGameProps {
  onScenarioCompleted: (scenarioId: string, score: number) => void;
  completedScenarioIds: string[];
  onFinishAll: () => void;
}

export const ScenarioGame: React.FC<ScenarioGameProps> = ({
  onScenarioCompleted,
  completedScenarioIds,
  onFinishAll
}) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoice | null>(null);
  const [revealedClues, setRevealedClues] = useState<Record<number, boolean>>({});

  const scenario = SCENARIOS[currentScenarioIndex];
  const isCompleted = completedScenarioIds.includes(scenario.id);

  const handleSelectChoice = (choice: ScenarioChoice) => {
    playChoiceClick();
    setSelectedChoice(choice);
    if (choice.isBestChoice) {
      playSuccessChime();
    } else {
      playReflectionTone();
    }
    onScenarioCompleted(scenario.id, choice.score);
  };

  const handleNextScenario = () => {
    setSelectedChoice(null);
    setRevealedClues({});
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      onFinishAll();
    }
  };

  const handleResetCurrent = () => {
    playChoiceClick();
    setSelectedChoice(null);
  };

  const toggleClue = (idx: number) => {
    playChoiceClick();
    setRevealedClues(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Scenario Progress Tabs for Tablets */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100">
        <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-semibold text-slate-600">
          <span className="flex items-center gap-1.5 text-amber-800">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Situation {currentScenarioIndex + 1} sur {SCENARIOS.length}
          </span>
          <span className="tabular-nums text-slate-500">
            {completedScenarioIds.length} / {SCENARIOS.length} situations validées
          </span>
        </div>

        {/* Tab pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SCENARIOS.map((sc, idx) => {
            const isDone = completedScenarioIds.includes(sc.id);
            const isCurrent = idx === currentScenarioIndex;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  playChoiceClick();
                  setCurrentScenarioIndex(idx);
                  setSelectedChoice(null);
                  setRevealedClues({});
                }}
                className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-[1.02]'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>Mission {idx + 1}</span>
                  {isDone && <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />}
                </div>
                <div className={`text-xs truncate font-medium ${isCurrent ? 'text-amber-100' : 'text-slate-600'}`}>
                  {sc.victimName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scenario Interactive Card */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200/80">
        {/* Header with image */}
        <div className="relative">
          <div className="h-56 sm:h-72 w-full overflow-hidden relative">
            <img
              src={scenario.imagePath}
              alt={scenario.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{scenario.location}</span>
              <span className="opacity-60">·</span>
              <span>Cible : {scenario.victimName}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display leading-snug">
              {scenario.title}
            </h2>
          </div>
        </div>

        {/* Scenario Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Narrative context prose */}
          <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200/80">
            <p className="text-slate-800 text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium">
              {scenario.contextText}
            </p>
          </div>

          {/* Detective Radar: Clues to reveal */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">
                  Indices de détresse à repérer dans cette situation :
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Touche pour révéler
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {scenario.distressSignals.map((signal, idx) => {
                const isRevealed = revealedClues[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleClue(idx)}
                    className={`text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-2.5 ${
                      isRevealed
                        ? 'bg-amber-100/70 border-amber-300 text-amber-950'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                      isRevealed ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {idx + 1}
                    </span>
                    <span>
                      {isRevealed ? signal : 'Clique pour découvrir un signe de détresse...'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Narrative Choices */}
          {!selectedChoice ? (
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-extrabold font-display text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                <span>Que décides-tu de faire ?</span>
              </h3>
              <p className="text-sm text-slate-600">
                Choisis la réponse qui te semble la plus protectrice et juste pour ton camarade :
              </p>

              <div className="space-y-3">
                {scenario.choices.map((choice, idx) => (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/50 transition-all cursor-pointer group flex items-start gap-4 shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center font-bold text-slate-700 shrink-0 transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-800 text-sm sm:text-base font-semibold group-hover:text-slate-950 leading-relaxed">
                        {choice.text}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Educational Feedback card */
            <div className="space-y-6 pt-2">
              <div
                className={`rounded-2xl p-6 border-2 transition-all ${
                  selectedChoice.isBestChoice
                    ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950'
                    : 'bg-amber-50/90 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    {selectedChoice.isBestChoice ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-7 h-7 text-amber-600" />
                    )}
                    <span className="text-lg sm:text-xl font-black font-display">
                      {selectedChoice.feedbackTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 shadow-xs font-bold text-xs sm:text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span>+{selectedChoice.score} points</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed mb-4 font-medium">
                  {selectedChoice.feedbackText}
                </p>

                <div className="bg-white/90 rounded-xl p-4 border border-slate-200/60 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Conséquence pour le camarade :
                  </h4>
                  <p className="text-sm font-semibold text-slate-800">
                    {selectedChoice.impactExplanation}
                  </p>
                </div>

                {selectedChoice.distressCluesIdentified.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Ce que tu as compris :
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm">
                      {selectedChoice.distressCluesIdentified.map((clue, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{clue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleResetCurrent}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tester un autre choix</span>
                </button>

                <button
                  onClick={handleNextScenario}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>
                    {currentScenarioIndex < SCENARIOS.length - 1
                      ? 'Situation suivante'
                      : 'Terminer la mission'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
