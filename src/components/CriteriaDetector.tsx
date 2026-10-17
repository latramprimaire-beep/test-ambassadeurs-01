import React, { useState } from 'react';
import { evaluateBullyingCriteria } from '../utils/gameLogic';
import { playChoiceClick, playSuccessChime, playReflectionTone } from '../utils/soundEffects';
import { ShieldAlert, Check, X, Sparkles, Scale, Info, ArrowRight } from 'lucide-react';

interface PresetSituation {
  id: string;
  title: string;
  description: string;
  hasViolence: boolean;
  isRepeated: boolean;
  hasPowerImbalanceOrIsolation: boolean;
}

const PRESET_SITUATIONS: PresetSituation[] = [
  {
    id: 'p1',
    title: 'Dispute ponctuelle au jeu de billes',
    description: 'Arthur et Nathan se fâchent car Nathan refuse de prêter une bille. Ils se crient dessus une fois puis boudent 10 minutes avant de se réconcilier.',
    hasViolence: true, // dispute verbale
    isRepeated: false, // acte unique
    hasPowerImbalanceOrIsolation: false // ils sont d'égale force
  },
  {
    id: 'p2',
    title: 'Moqueries quotidiennes sur le cartable',
    description: 'Depuis 3 semaines, un groupe de 4 élèves prend le cartable de Théo tous les matins, le jette dans les buissons et l\'appelle « le bébé ». Théo est seul et pleure tous les jours.',
    hasViolence: true,
    isRepeated: true,
    hasPowerImbalanceOrIsolation: true
  },
  {
    id: 'p3',
    title: 'Le photomontage sur le groupe en ligne',
    description: 'Une photo humiliante de Léa a été partagée sur le groupe de classe. Des dizaines de messages moqueurs sont envoyés nuit et jour. Léa n\'ose plus sortir de chez elle.',
    hasViolence: true,
    isRepeated: true,
    hasPowerImbalanceOrIsolation: true
  }
];

export const CriteriaDetector: React.FC = () => {
  const [hasViolence, setHasViolence] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [hasIsolation, setHasIsolation] = useState(false);

  const result = evaluateBullyingCriteria({
    hasViolence,
    isRepeated,
    hasPowerImbalanceOrIsolation: hasIsolation
  });

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, current: boolean) => {
    playChoiceClick();
    const next = !current;
    setter(next);
  };

  const applyPreset = (preset: PresetSituation) => {
    playChoiceClick();
    setHasViolence(preset.hasViolence);
    setIsRepeated(preset.isRepeated);
    setHasIsolation(preset.hasPowerImbalanceOrIsolation);
    if (preset.hasViolence && preset.isRepeated && preset.hasPowerImbalanceOrIsolation) {
      playSuccessChime();
    } else {
      playReflectionTone();
    }
  };

  const handleReset = () => {
    playChoiceClick();
    setHasViolence(false);
    setIsRepeated(false);
    setHasIsolation(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Introduction Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-display text-slate-900">
              Le Détecteur des 3 Piliers (V.R.I.)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Comment faire la différence entre une simple dispute et du harcèlement scolaire ?
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
          Dans la loi et dans la vie de l'école, on parle de <strong>harcèlement scolaire</strong> uniquement quand les <strong>3 critères</strong> suivants sont réunis en même temps : 
          <span className="text-amber-800 font-bold"> la Violence</span>, 
          <span className="text-amber-800 font-bold"> la Répétition</span> et 
          <span className="text-amber-800 font-bold"> l'Isolement</span>.
        </p>
      </div>

      {/* Interactive Toggle Matrix */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Pillar 1: Violence */}
        <button
          onClick={() => handleToggle(setHasViolence, hasViolence)}
          className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
            hasViolence
              ? 'bg-amber-500 text-white border-amber-600 shadow-lg scale-[1.02]'
              : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                hasViolence ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                Pilier 1
              </span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                hasViolence ? 'bg-white text-amber-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {hasViolence ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </div>
            </div>
            <h3 className="text-xl font-bold font-display mb-2">
              1. La Violence
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${hasViolence ? 'text-amber-100' : 'text-slate-600'}`}>
              Mots blessants, insultes, moqueries sur le physique, bousculades, affaires volées ou rejet systématique.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-current/20 text-xs font-bold">
            {hasViolence ? '✓ Critère ACTIF' : 'Touchez pour activer'}
          </div>
        </button>

        {/* Pillar 2: Répétition */}
        <button
          onClick={() => handleToggle(setIsRepeated, isRepeated)}
          className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
            isRepeated
              ? 'bg-amber-500 text-white border-amber-600 shadow-lg scale-[1.02]'
              : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                isRepeated ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                Pilier 2
              </span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                isRepeated ? 'bg-white text-amber-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {isRepeated ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </div>
            </div>
            <h3 className="text-xl font-bold font-display mb-2">
              2. La Répétition
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isRepeated ? 'text-amber-100' : 'text-slate-600'}`}>
              Ce n'est pas un événement qui arrive une seule fois : cela recommence régulièrement, jour après jour, semaine après semaine.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-current/20 text-xs font-bold">
            {isRepeated ? '✓ Critère ACTIF' : 'Touchez pour activer'}
          </div>
        </button>

        {/* Pillar 3: Isolement */}
        <button
          onClick={() => handleToggle(setHasIsolation, hasIsolation)}
          className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
            hasIsolation
              ? 'bg-amber-500 text-white border-amber-600 shadow-lg scale-[1.02]'
              : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                hasIsolation ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                Pilier 3
              </span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                hasIsolation ? 'bg-white text-amber-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {hasIsolation ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </div>
            </div>
            <h3 className="text-xl font-bold font-display mb-2">
              3. L'Isolement
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${hasIsolation ? 'text-amber-100' : 'text-slate-600'}`}>
              La victime est seule face à un ou plusieurs agresseurs et n'a pas la force de se défendre sans l'aide extérieure d'un adulte.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-current/20 text-xs font-bold">
            {hasIsolation ? '✓ Critère ACTIF' : 'Touchez pour activer'}
          </div>
        </button>
      </div>

      {/* Result Diagnostic Card */}
      <div className={`rounded-3xl p-6 sm:p-8 border-2 transition-all ${
        result.isBullying 
          ? 'bg-rose-50 border-rose-300 text-rose-950 shadow-md'
          : hasViolence || isRepeated || hasIsolation
          ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-sm'
          : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${
              result.isBullying ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
            }`}>
              {result.isBullying ? '!' : '?'}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-75">
                Diagnostic en direct
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display">
                {result.isBullying 
                  ? 'Situation de HARCÈLEMENT AVÉRÉ'
                  : hasViolence && !isRepeated
                  ? 'Conflit ou Violence PONCTUELLE (pas de harcèlement répété)'
                  : 'Sélectionnez des critères pour analyser'}
              </h3>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="self-start sm:self-center px-4 py-2 text-xs font-bold rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            Réinitialiser
          </button>
        </div>

        <p className="text-sm sm:text-base leading-relaxed font-medium mb-4">
          {result.advice}
        </p>

        {result.missingCriteria.length > 0 && (
          <div className="bg-white/80 rounded-xl p-4 border border-slate-200/60 text-xs sm:text-sm">
            <span className="font-bold text-slate-800">Critères manquants pour qualifier un harcèlement :</span>
            <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-600">
              {result.missingCriteria.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Preset Situations to Try */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-bold font-display text-slate-900">
            Cas concrets d'école à tester en 1 clic :
          </h3>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {PRESET_SITUATIONS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 text-left transition-all cursor-pointer group"
            >
              <h4 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-amber-800">
                {preset.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {preset.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-600">
                <span>Tester ce cas</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
