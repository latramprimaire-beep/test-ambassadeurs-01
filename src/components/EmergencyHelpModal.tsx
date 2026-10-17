import React, { useState } from 'react';
import { PhoneCall, X, ShieldCheck, MessageCircle, Heart, Copy, Check } from 'lucide-react';
import { playChoiceClick } from '../utils/soundEffects';

interface EmergencyHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyHelpModal: React.FC<EmergencyHelpModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const phraseStarters = [
    "« Maître / Maîtresse, j'ai besoin de vous parler d'un camarade qui n'a pas l'air bien dans la cour... »",
    "« Je m'inquiète pour Sarah / Lucas parce que plusieurs élèves se moquent toujours de lui/elle. »",
    "« Il y a des messages méchants qui circulent sur le tchat de la classe et je voulais vous montrer la capture d'écran. »"
  ];

  const handleCopyPhrase = (phrase: string, idx: number) => {
    playChoiceClick();
    navigator.clipboard?.writeText(phrase);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-modal-title"
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-rose-500 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fermer la fenêtre d'aide d'urgence"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-xl shrink-0">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 id="emergency-modal-title" className="text-2xl font-black font-display text-slate-900">
              SOS Harcèlement Scolaire & Cyberharcèlement
            </h2>
            <p className="text-xs sm:text-sm text-rose-700 font-semibold">
              Tu n'es pas seul(e) · Des personnes bienveillantes sont là pour t'écouter
            </p>
          </div>
        </div>

        {/* 3018 Highlight Box */}
        <div className="bg-rose-50 rounded-2xl p-5 border-2 border-rose-200 mb-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-1">
            Numéro d'urgence national gratuit et confidentiel
          </span>
          <div className="text-4xl sm:text-5xl font-black font-display text-rose-700 my-1 tracking-tight">
            3018
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Joignable <strong>7 jours sur 7, de 9h à 23h</strong>. Gratuit, anonyme et ne laisse aucune trace sur la facture téléphonique de tes parents.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs font-semibold text-rose-800">
            <span className="px-2.5 py-1 bg-white rounded-lg border border-rose-200">📞 Appel gratuit</span>
            <span className="px-2.5 py-1 bg-white rounded-lg border border-rose-200">💬 Tchat en direct sur 3018.fr</span>
            <span className="px-2.5 py-1 bg-white rounded-lg border border-rose-200">📱 Application mobile 3018</span>
          </div>
        </div>

        {/* Phrases types pour oser parler */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base font-display">
            <MessageCircle className="w-5 h-5 text-amber-500" />
            <span>Tu as peur de ne pas trouver les bons mots ? Voici des exemples :</span>
          </div>

          <div className="space-y-2">
            {phraseStarters.map((phrase, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-800 font-medium"
              >
                <span>{phrase}</span>
                <button
                  onClick={() => handleCopyPhrase(phrase, idx)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-600 font-semibold shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Qui contacter à l'école */}
        <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 text-xs sm:text-sm text-slate-800 space-y-1.5">
          <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Les personnes de confiance dans ton école :</span>
          </h3>
          <p>• <strong>Ton enseignant(e)</strong> (maître ou maîtresse de ta classe)</p>
          <p>• <strong>Le directeur ou la directrice</strong> de l'école primaire</p>
          <p>• <strong>Les animateurs et animatrices</strong> du périscolaire et de la cantine</p>
          <p>• <strong>L'infirmière ou le médecin scolaire</strong></p>
          <p>• <strong>Tes parents</strong> ou un adulte de ta famille</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors cursor-pointer"
          >
            J'ai compris, fermer
          </button>
        </div>
      </div>
    </div>
  );
};
