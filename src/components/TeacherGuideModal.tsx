import React from 'react';
import { X, BookOpen, Heart, CheckSquare, Printer } from 'lucide-react';
import { playChoiceClick } from '../utils/soundEffects';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrintPledge = () => {
    playChoiceClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-modal-title"
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Fermer le guide enseignant"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 id="teacher-modal-title" className="text-2xl font-black font-display text-slate-900">
              Espace Enseignant & Charte de Classe
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Ressources pédagogiques pour animer une séance en CM1 ou CM2
            </p>
          </div>
        </div>

        {/* 5 Pedagogical Steps for Classroom */}
        <div className="space-y-4 mb-6">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">
            Déroulement conseillé d'une séance de 45 minutes :
          </h3>

          <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-amber-700 block mb-1">Étape 1 · Le Détecteur (10 min)</span>
              <p className="text-slate-600">
                Projeter le Détecteur des 3 Piliers (V.R.I.) pour distinguer ensemble un conflit ponctuel du harcèlement répété.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-amber-700 block mb-1">Étape 2 · Le Serious Game (15 min)</span>
              <p className="text-slate-600">
                Chaque élève ou binôme sur tablette explore les 4 situations et teste les choix avec les retours immédiats.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-amber-700 block mb-1">Étape 3 · Le Quiz & Débat (10 min)</span>
              <p className="text-slate-600">
                Valider les acquis sur la différence entre "cafarder" et "protéger", ainsi que la mémorisation du 3018.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-amber-700 block mb-1">Étape 4 · Brevet & Signature (10 min)</span>
              <p className="text-slate-600">
                Imprimer les brevets individuels ou signer solennellement la Charte de la classe ci-dessous.
              </p>
            </div>
          </div>
        </div>

        {/* Charte de la Classe Bienveillante */}
        <div className="bg-amber-50/70 rounded-2xl p-6 border-2 border-amber-300 text-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h4 className="text-lg font-black font-display text-slate-900">
                Charte de notre Classe Bienveillante
              </h4>
            </div>
            <button
              onClick={handlePrintPledge}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer la charte</span>
            </button>
          </div>

          <div className="space-y-2 text-xs sm:text-sm font-medium">
            <div className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Dans notre classe, chacun a le droit d'être lui-même et d'être respecté sans aucune moquerie.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Nous refusons d'exclure un camarade des jeux de la cour ou de la cantine.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Si nous voyons quelqu'un de triste ou isolé, nous allons vers lui pour l'aider.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Nous savons que prévenir un adulte n'est pas cafarder, mais protéger un ami.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Sur Internet et les jeux, nous ne partageons que des mots gentils et aucune rumeur.</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
