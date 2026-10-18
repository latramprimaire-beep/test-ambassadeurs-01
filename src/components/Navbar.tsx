import React from 'react';
import { PhoneCall, HelpCircle } from 'lucide-react';
import shieldCrest from '../assets/images/logo_groupe_bouclier_crest_1792243396239.jpg';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenEmergency: () => void;
  onOpenTeacherGuide: () => void;
  totalScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenEmergency,
  onOpenTeacherGuide,
  totalScore
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Brand wordmark with Groupe Bouclier Crest */}
          <button
            onClick={() => onSelectTab('accueil')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl p-1 cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-amber-300/80 shadow-xs bg-amber-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={shieldCrest}
                alt="Blason officiel Groupe Bouclier Notre Dame de la Tramontane"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 font-display leading-tight whitespace-nowrap">
                Mission Bienveillance
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-amber-800 tracking-tight leading-none whitespace-nowrap">
                Groupe Bouclier
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('accueil')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'accueil'
                  ? 'text-amber-700 bg-amber-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => onSelectTab('jeu')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'jeu'
                  ? 'text-amber-700 bg-amber-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Histoires en 5 Étapes
            </button>
            <button
              onClick={() => onSelectTab('detecteur')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'detecteur'
                  ? 'text-amber-700 bg-amber-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Détecteur 3 Piliers
            </button>
            <button
              onClick={() => onSelectTab('quiz')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'quiz'
                  ? 'text-amber-700 bg-amber-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Quiz des Acquis
            </button>
            <button
              onClick={onOpenTeacherGuide}
              className="px-3 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Espace Enseignant & Charte</span>
            </button>
          </nav>

          {/* Zone 3: Primary action button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>SOS Harcèlement 3018</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet subnavigation strip */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 text-xs no-scrollbar">
          <button
            onClick={() => onSelectTab('accueil')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'accueil' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-600'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => onSelectTab('jeu')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'jeu' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-600'
            }`}
          >
            Histoires (5 Étapes)
          </button>
          <button
            onClick={() => onSelectTab('detecteur')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'detecteur' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-600'
            }`}
          >
            Détecteur
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'quiz' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-600'
            }`}
          >
            Quiz
          </button>
          <button
            onClick={onOpenTeacherGuide}
            className="px-3 py-1.5 text-slate-500 whitespace-nowrap font-medium"
          >
            Charte
          </button>
        </div>
      </div>
    </header>
  );
};
