import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { calculateAmbassadorRank } from '../utils/gameLogic';
import { playCelebrationFanfare, playChoiceClick } from '../utils/soundEffects';
import badgeImage from '../assets/images/badge_sentinelle_or_1792239397749.jpg';
import { Printer, Sparkles, Award, Star, CheckCircle } from 'lucide-react';

interface DiplomaSectionProps {
  scenariosCompletedCount: number;
  quizScorePercentage: number;
  totalScore: number;
}

export const DiplomaSection: React.FC<DiplomaSectionProps> = ({
  scenariosCompletedCount,
  quizScorePercentage,
  totalScore
}) => {
  const [studentName, setStudentName] = useState('');
  const [schoolClass, setSchoolClass] = useState('CM1 - École Primaire');
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const rank = calculateAmbassadorRank(scenariosCompletedCount, quizScorePercentage);
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      playCelebrationFanfare();
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    if (!hasCelebrated && scenariosCompletedCount >= 1) {
      triggerConfetti();
      setHasCelebrated(true);
    }
  }, [hasCelebrated, scenariosCompletedCount]);

  const handlePrint = () => {
    playChoiceClick();
    window.print();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Customizer Panel (Hidden during printing) */}
      <div className="print:hidden bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                Personnalise ton Brevet d'Ambassadeur
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Inscris ton prénom et ta classe pour imprimer ton diplôme officiel !
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerConfetti}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Confettis !</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer mon Brevet</span>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Prénom et Nom de l'élève :
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ex: Camille Martin"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm font-semibold text-slate-900 bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Classe et École :
            </label>
            <input
              type="text"
              value={schoolClass}
              onChange={(e) => setSchoolClass(e.target.value)}
              placeholder="Ex: CM1 / CM2 - École Jules Ferry"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm font-semibold text-slate-900 bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Official Certificate Paper Document (Formatted for print) */}
      <div 
        id="diploma-document"
        className="bg-amber-50/30 print:bg-white rounded-3xl p-8 sm:p-12 border-8 border-double border-amber-600/80 shadow-2xl relative overflow-hidden text-center space-y-6"
      >
        {/* Subtle Watermark/Emblem */}
        <div className="absolute top-4 left-6 flex items-center gap-2 opacity-80">
          <span className="text-xs font-black tracking-widest text-slate-700 uppercase">
            RÉPUBLIQUE FRANÇAISE
          </span>
        </div>
        <div className="absolute top-4 right-6 flex items-center gap-2 opacity-80">
          <span className="text-xs font-bold tracking-wide text-amber-800">
            MINISTÈRE DE L'ÉDUCATION NATIONALE
          </span>
        </div>

        <div className="pt-6">
          <div className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3">
            Programme Phare · Lutte contre le Harcèlement Scolaire
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 tracking-tight">
            BREVET D'AMBASSADEUR
          </h1>
          <p className="text-lg sm:text-xl font-bold font-display text-amber-700 mt-1">
            DE LA BIENVEILLANCE ET DU RESPECT
          </p>
        </div>

        {/* Badge Medal Image */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto relative my-4">
          <img
            src={badgeImage}
            alt="Médaille d'Ambassadeur"
            className="w-full h-full object-contain filter drop-shadow-lg"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Certificate Text & Recipient */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <p className="text-sm sm:text-base text-slate-600 italic">
            Ce brevet officiel atteste avec honneur que :
          </p>

          <div className="py-2 border-b-2 border-amber-400">
            <span className="text-2xl sm:text-4xl font-extrabold font-display text-slate-950 tracking-wide">
              {studentName.trim() || 'Un(e) Super Élève'}
            </span>
          </div>

          <p className="text-sm font-semibold text-slate-700">
            De la classe de : <strong className="text-slate-900">{schoolClass}</strong>
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
            A complété avec succès la formation interactive <strong>Mission Bienveillance</strong>, maîtrise la règle des 3 piliers (V.R.I.), s'engage à briser le silence, à protéger ses camarades et à agir comme sentinelle dans la cour de récréation et sur les réseaux sociaux.
          </p>
        </div>

        {/* Rank & Stats Strip */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-xs max-w-xl mx-auto">
          <div className="text-left">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Grade Obtenu</div>
            <div className="text-base sm:text-lg font-black text-amber-800 font-display">{rank}</div>
          </div>
          <div className="w-px h-8 bg-amber-200 hidden sm:block" />
          <div className="text-left">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Missions Validées</div>
            <div className="text-base sm:text-lg font-black text-slate-900 font-display">{scenariosCompletedCount} / 4 situations</div>
          </div>
          <div className="w-px h-8 bg-amber-200 hidden sm:block" />
          <div className="text-left">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">Score Quiz</div>
            <div className="text-base sm:text-lg font-black text-emerald-700 font-display">{quizScorePercentage}%</div>
          </div>
        </div>

        {/* 5 Ambassador Commitments */}
        <div className="max-w-xl mx-auto text-left bg-amber-100/40 p-4 rounded-xl border border-amber-200/80 text-xs text-slate-700 space-y-1">
          <p className="font-bold text-slate-900 mb-1">Mes 4 engagements d'Ambassadeur :</p>
          <p>1. Je refuse d'être un témoin passif ou complice des moqueries.</p>
          <p>2. J'accueille et soutiens tout camarade isolé ou en détresse.</p>
          <p>3. Je ne répète aucune rumeur et je respecte la vie privée en ligne.</p>
          <p>4. J'alerte sans hésiter un adulte responsable ou le <strong>3018</strong>.</p>
        </div>

        {/* Signatures & Date */}
        <div className="pt-8 grid grid-cols-2 gap-8 max-w-xl mx-auto text-xs text-slate-700">
          <div>
            <div className="font-bold text-slate-900 mb-6">Date de délivrance :</div>
            <div className="font-medium underline decoration-amber-300 underline-offset-4">{currentDate}</div>
          </div>
          <div>
            <div className="font-bold text-slate-900 mb-6">Signature de l'Ambassadeur & Enseignant :</div>
            <div className="font-serif italic text-sm text-slate-500">Pour une école sans harcèlement</div>
          </div>
        </div>
      </div>
    </div>
  );
};
