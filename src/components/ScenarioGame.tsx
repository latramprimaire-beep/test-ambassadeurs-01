import React, { useState } from 'react';
import { STORY_MISSIONS, type StoryMission, type StoryStep, type StoryChoice } from '../data/scenariosData';
import { playSuccessChime, playReflectionTone, playChoiceClick } from '../utils/soundEffects';
import { 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  MapPin, 
  Sparkles,
  Star,
  Award,
  BookOpen,
  Heart
} from 'lucide-react';

interface ScenarioGameProps {
  onScenarioCompleted: (scenarioId: string, score: number) => void;
  completedScenarioIds: string[];
  onFinishAll: () => void;
}

function shuffleChoices(choices: StoryChoice[]): StoryChoice[] {
  const shuffled = [...choices];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const ScenarioGame: React.FC<ScenarioGameProps> = ({
  onScenarioCompleted,
  completedScenarioIds,
  onFinishAll
}) => {
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [currentStepNumber, setCurrentStepNumber] = useState<number>(1);
  const [stepChoices, setStepChoices] = useState<Record<number, StoryChoice>>({});
  const [selectedChoiceForCurrentStep, setSelectedChoiceForCurrentStep] = useState<StoryChoice | null>(null);
  const [isMissionFinished, setIsMissionFinished] = useState(false);

  // Pre-randomize all choices so the best response is never predictably first
  const [shuffledChoicesMap, setShuffledChoicesMap] = useState<Record<string, StoryChoice[]>>(() => {
    const map: Record<string, StoryChoice[]> = {};
    STORY_MISSIONS.forEach(m => {
      m.steps.forEach(s => {
        map[`${m.id}-${s.stepNumber}`] = shuffleChoices(s.choices);
      });
    });
    return map;
  });

  const mission: StoryMission = STORY_MISSIONS[currentMissionIndex];
  const currentStep: StoryStep = mission.steps[currentStepNumber - 1];
  const currentStepKey = `${mission.id}-${currentStepNumber}`;
  const displayedChoices = shuffledChoicesMap[currentStepKey] || currentStep.choices;

  const handleSelectChoice = (choice: StoryChoice) => {
    playChoiceClick();
    setSelectedChoiceForCurrentStep(choice);
    setStepChoices(prev => ({ ...prev, [currentStepNumber]: choice }));

    if (choice.isBestChoice) {
      playSuccessChime();
    } else {
      playReflectionTone();
    }
  };

  const handleNextStep = () => {
    playChoiceClick();
    if (currentStepNumber < 5) {
      const nextStep = currentStepNumber + 1;
      setCurrentStepNumber(nextStep);
      setSelectedChoiceForCurrentStep(stepChoices[nextStep] || null);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Calculate total mission score
      const totalMissionScore = Object.values(stepChoices).reduce((acc, c) => acc + c.score, 0);
      onScenarioCompleted(mission.id, totalMissionScore);
      setIsMissionFinished(true);
      playSuccessChime();
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    playChoiceClick();
    if (currentStepNumber > 1) {
      const prevStep = currentStepNumber - 1;
      setCurrentStepNumber(prevStep);
      setSelectedChoiceForCurrentStep(stepChoices[prevStep] || null);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleNextMission = () => {
    playChoiceClick();
    if (currentMissionIndex < STORY_MISSIONS.length - 1) {
      setCurrentMissionIndex(currentMissionIndex + 1);
      setCurrentStepNumber(1);
      setStepChoices({});
      setSelectedChoiceForCurrentStep(null);
      setIsMissionFinished(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onFinishAll();
    }
  };

  const handleRestartMission = () => {
    playChoiceClick();
    // Freshly re-randomize choices for this mission on restart
    setShuffledChoicesMap(prev => {
      const nextMap = { ...prev };
      mission.steps.forEach(s => {
        nextMap[`${mission.id}-${s.stepNumber}`] = shuffleChoices(s.choices);
      });
      return nextMap;
    });
    setCurrentStepNumber(1);
    setStepChoices({});
    setSelectedChoiceForCurrentStep(null);
    setIsMissionFinished(false);
  };

  const totalPointsInMission = Object.values(stepChoices).reduce((acc, c) => acc + c.score, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Missions Selector Strip */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100">
        <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-semibold text-slate-600">
          <span className="flex items-center gap-1.5 text-amber-800 font-bold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Histoire {currentMissionIndex + 1} sur {STORY_MISSIONS.length}
          </span>
          <span className="tabular-nums text-slate-500 font-medium">
            {completedScenarioIds.length} / {STORY_MISSIONS.length} histoires terminées
          </span>
        </div>

        {/* Story Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STORY_MISSIONS.map((m, idx) => {
            const isDone = completedScenarioIds.includes(m.id);
            const isCurrent = idx === currentMissionIndex;
            return (
              <button
                key={m.id}
                onClick={() => {
                  playChoiceClick();
                  setCurrentMissionIndex(idx);
                  setCurrentStepNumber(1);
                  setStepChoices({});
                  setSelectedChoiceForCurrentStep(null);
                  setIsMissionFinished(false);
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
                  {m.victimName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {!isMissionFinished ? (
        <>
          {/* Stepper with the 5 narrative chapters */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
              {[1, 2, 3, 4, 5].map((stepNum) => {
                const isPassed = currentStepNumber > stepNum;
                const isCurrent = currentStepNumber === stepNum;
                const hasChoice = !!stepChoices[stepNum];

                return (
                  <button
                    key={stepNum}
                    onClick={() => {
                      playChoiceClick();
                      setCurrentStepNumber(stepNum);
                      setSelectedChoiceForCurrentStep(stepChoices[stepNum] || null);
                    }}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-500 text-white shadow-xs'
                        : hasChoice
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      isCurrent
                        ? 'bg-white text-amber-600 font-black'
                        : hasChoice
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-300 text-slate-700'
                    }`}>
                      {hasChoice ? '✓' : stepNum}
                    </span>
                    <span>Étape {stepNum}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Story Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200/80">
            {/* Header Image */}
            <div className="relative">
              <div className="h-52 sm:h-64 w-full overflow-hidden relative">
                <img
                  src={mission.imagePath}
                  alt={mission.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{currentStep.location}</span>
                  <span className="opacity-60">·</span>
                  <span>{mission.victimName}</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display leading-snug">
                  {currentStep.stepTitle}
                </h2>
              </div>
            </div>

            {/* Story Text & Action Choice */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Narrative Story Block */}
              <div className="bg-amber-50/70 rounded-2xl p-5 sm:p-6 border border-amber-200/90">
                <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Récit de l'histoire (Étape {currentStepNumber}/5) :</span>
                </div>
                <p className="text-slate-800 text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium">
                  {currentStep.storyText}
                </p>
              </div>

              {/* The Narrative Question */}
              <div className="space-y-4 pt-2">
                <h3 className="text-base sm:text-lg font-extrabold font-display text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>{currentStep.question}</span>
                </h3>

                {/* 3 Narrative Action Choices with Randomized Order */}
                {!selectedChoiceForCurrentStep ? (
                  <div className="space-y-3">
                    {displayedChoices.map((choice, idx) => (
                      <button
                        key={choice.id}
                        onClick={() => handleSelectChoice(choice)}
                        className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/50 transition-all cursor-pointer group flex items-start gap-4 shadow-xs"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center font-bold text-slate-700 shrink-0 transition-colors">
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
                ) : (
                  /* Immediate Feedback & Story Consequence Card */
                  <div className="space-y-6">
                    <div
                      className={`rounded-2xl p-6 border-2 transition-all ${
                        selectedChoiceForCurrentStep.isBestChoice
                          ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950'
                          : 'bg-amber-50/90 border-amber-300 text-amber-950'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          {selectedChoiceForCurrentStep.isBestChoice ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          ) : (
                            <AlertTriangle className="w-6 h-6 text-amber-600" />
                          )}
                          <span className="text-base sm:text-lg font-black font-display">
                            {selectedChoiceForCurrentStep.feedbackTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 shadow-xs font-bold text-xs sm:text-sm">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                          <span>+{selectedChoiceForCurrentStep.score} points</span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base leading-relaxed mb-4 font-medium">
                        {selectedChoiceForCurrentStep.feedbackText}
                      </p>

                      <div className="bg-white/95 rounded-xl p-4 border border-slate-200/60">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Conséquence dans l'histoire :
                        </h4>
                        <p className="text-sm font-semibold text-slate-800">
                          {selectedChoiceForCurrentStep.consequenceText}
                        </p>
                      </div>
                    </div>

                    {/* Stepper Navigation Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        {currentStepNumber > 1 && (
                          <button
                            onClick={handlePrevStep}
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Étape précédente</span>
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedChoiceForCurrentStep(null)}
                          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 text-sm font-semibold cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Changer de choix</span>
                        </button>
                      </div>

                      <button
                        onClick={handleNextStep}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm sm:text-base shadow-md cursor-pointer"
                      >
                        <span>
                          {currentStepNumber < 5
                            ? `Continuer : Étape ${currentStepNumber + 1} sur 5`
                            : 'Découvrir le dénouement de la mission'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Mission Completed Celebration Card */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1 block">
              Mission 100% accomplie !
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
              {mission.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-2">
              Tu as traversé les 5 étapes de cette histoire en faisant des choix courageux et bienveillants pour protéger {mission.victimName}.
            </p>
          </div>

          {/* Golden Rule Callout */}
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-white text-left shadow-md">
            <div className="flex items-center gap-2 text-amber-100 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Règle d'or de l'Ambassadeur :</span>
            </div>
            <p className="text-base sm:text-lg font-bold font-display leading-snug">
              {mission.goldenRule}
            </p>
          </div>

          {/* Points earned */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Score obtenu sur cette histoire : {totalPointsInMission} / 50 points</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestartMission}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rejouer cette histoire</span>
            </button>

            <button
              onClick={handleNextMission}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>
                {currentMissionIndex < STORY_MISSIONS.length - 1
                  ? "Passer à l'histoire suivante"
                  : 'Terminer toutes les histoires'}
              </span>
              <ArrowRight className="w-5 h-5 text-amber-400 shrink-0" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
