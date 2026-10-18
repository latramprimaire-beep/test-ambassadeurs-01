import React from 'react';
import { Play, Sparkles, Compass, CheckCircle2, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import heroImageFr from '../assets/images/hero_ambassadeurs_fr_1792242366727.jpg';

interface HeroSectionProps {
  onStartGame: () => void;
  onOpenQuiz: () => void;
  onOpenDetector: () => void;
  scenariosCompleted: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartGame,
  onOpenQuiz,
  onOpenDetector,
  scenariosCompleted
}) => {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Banner with French illustration */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 text-white shadow-xl">
        <div className="grid lg:grid-cols-12 items-stretch min-h-[460px]">
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold mb-5 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-100" />
                <span>Groupe Bouclier Notre Dame de la Tramontane · CM1 & CM2</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight text-white mb-4">
                Deviens un Super Ambassadeur de la Bienveillance !
              </h1>

              <p className="text-base sm:text-lg text-amber-50 leading-relaxed max-w-xl mb-8 font-medium">
                Dans la cour, à la cantine ou sur les écrans, découvre nos missions interactives en <strong>5 étapes pédagogiques</strong> pour repérer la détresse, briser le silence et protéger tes camarades.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onStartGame}
                className="flex items-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-base sm:text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current text-amber-400" />
                <span>Lancer les Missions (5 Étapes)</span>
              </button>

              <button
                onClick={onOpenDetector}
                className="flex items-center gap-2 px-5 py-3.5 bg-white/90 hover:bg-white text-slate-800 text-base font-semibold rounded-2xl shadow-md transition-colors cursor-pointer"
              >
                <Compass className="w-5 h-5 text-amber-600" />
                <span>Détecteur des 3 Piliers</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Illustration in French */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full">
            <img
              src={heroImageFr}
              alt="Enfants ambassadeurs avec banderole en français Ensemble contre le harcèlement"
              className="w-full h-full object-cover object-center lg:absolute lg:inset-0 rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>

      {/* 3 Pillars / Mission Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        <div 
          onClick={onStartGame}
          className="group relative bg-white rounded-2xl p-6 border border-amber-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-amber-300"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-display font-black text-xl mb-4 group-hover:scale-105 transition-transform">
            01
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900 mb-2">
            Missions en 5 Étapes
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Chaque situation se déroule en 5 étapes : Observation, Détection des indices, Diagnostic VRI, Choix d'action et Bilan bienveillant.
          </p>
          <div className="flex items-center justify-between text-xs font-semibold text-amber-700">
            <span>{scenariosCompleted}/4 missions validées</span>
            <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Commencer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        <div 
          onClick={onOpenDetector}
          className="group relative bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-300"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-display font-black text-xl mb-4 group-hover:scale-105 transition-transform">
            02
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900 mb-2">
            Le Détecteur des 3 Piliers
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Est-ce une simple dispute ou du vrai harcèlement ? Vérifie en direct la formule <strong>V.R.I.</strong> (Violence, Répétition, Isolement).
          </p>
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
            <span>Tester les situations</span>
            <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        <div 
          onClick={onOpenQuiz}
          className="group relative bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-indigo-300"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-display font-black text-xl mb-4 group-hover:scale-105 transition-transform">
            03
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900 mb-2">
            Quiz des Sentinelles
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            8 défis interactifs pour tester tes connaissances sur le rôle du témoin, le cyberharcèlement et le numéro d'urgence 3018.
          </p>
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-700">
            <span>Valider ses acquis</span>
            <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Lancer le Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Key fact banner */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-2xl shrink-0">
            <Heart className="w-7 h-7 fill-slate-900" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-amber-300">
              Le chiffre clé à retenir
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Dans <strong>80% des situations</strong>, le harcèlement scolaire cesse dans la minute quand un camarade témoin intervient calmement ou alerte un adulte.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onStartGame}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Rejoindre la mission</span>
          </button>
        </div>
      </div>
    </div>
  );
};
