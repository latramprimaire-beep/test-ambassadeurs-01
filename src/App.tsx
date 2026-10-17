import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScenarioGame } from './components/ScenarioGame';
import { CriteriaDetector } from './components/CriteriaDetector';
import { QuizSection } from './components/QuizSection';
import { DiplomaSection } from './components/DiplomaSection';
import { EmergencyHelpModal } from './components/EmergencyHelpModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { ShieldCheck, PhoneCall, Heart, Award, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mb_completed_scenarios');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [scenarioScores, setScenarioScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('mb_scenario_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [quizScorePercentage, setQuizScorePercentage] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mb_quiz_percentage');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState(false);

  // Sync hash routing for GitHub Pages subfolder compatibility
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['accueil', 'jeu', 'detecteur', 'quiz', 'diplome'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    // Check ?autostart=1 or hash on initial load
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autostart') === '1') {
      setActiveTab('jeu');
      window.location.hash = '#jeu';
    } else if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScenarioCompleted = (scenarioId: string, score: number) => {
    setScenarioScores(prev => {
      const updated = { ...prev, [scenarioId]: score };
      try {
        localStorage.setItem('mb_scenario_scores', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });

    setCompletedScenarioIds(prev => {
      if (!prev.includes(scenarioId)) {
        const updated = [...prev, scenarioId];
        try {
          localStorage.setItem('mb_completed_scenarios', JSON.stringify(updated));
        } catch {
          // Ignore
        }
        return updated;
      }
      return prev;
    });
  };

  const handleQuizCompleted = (percentage: number) => {
    setQuizScorePercentage(percentage);
    try {
      localStorage.setItem('mb_quiz_percentage', String(percentage));
    } catch {
      // Ignore
    }
  };

  const totalScenarioScore = Object.values(scenarioScores).reduce((acc, curr) => acc + curr, 0);
  const totalScore = totalScenarioScore + Math.round(quizScorePercentage * 0.5);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        totalScore={totalScore}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'accueil' && (
          <HeroSection
            onStartGame={() => handleSelectTab('jeu')}
            onOpenQuiz={() => handleSelectTab('quiz')}
            onOpenDetector={() => handleSelectTab('detecteur')}
            onOpenDiploma={() => handleSelectTab('diplome')}
            scenariosCompleted={completedScenarioIds.length}
          />
        )}

        {activeTab === 'jeu' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
                  Mission Ambassadeur : Le Serious Game
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Observe la situation, repère les indices de souffrance et choisis la réaction protectrice.
                </p>
              </div>
            </div>

            <ScenarioGame
              completedScenarioIds={completedScenarioIds}
              onScenarioCompleted={handleScenarioCompleted}
              onFinishAll={() => handleSelectTab('quiz')}
            />
          </div>
        )}

        {activeTab === 'detecteur' && <CriteriaDetector />}

        {activeTab === 'quiz' && (
          <QuizSection
            onQuizCompleted={handleQuizCompleted}
            onGoToDiploma={() => handleSelectTab('diplome')}
          />
        )}

        {activeTab === 'diplome' && (
          <DiplomaSection
            scenariosCompletedCount={completedScenarioIds.length}
            quizScorePercentage={quizScorePercentage}
            totalScore={totalScore}
          />
        )}
      </main>

      {/* Reassuring Footer */}
      <footer className="print:hidden bg-white border-t border-amber-200/80 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-800 text-sm">Mission Bienveillance · CM1 & CM2</span>
              <p className="text-xs text-slate-500">
                Outil pédagogique interactif de sensibilisation et de prévention du harcèlement scolaire.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Numéro vert 3018</span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsTeacherGuideOpen(true)}
              className="hover:text-amber-800 cursor-pointer flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Charte de classe</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>Programme pHARe · République Française</span>
          </div>
        </div>
      </footer>

      {/* Emergency & Guide Modals */}
      <EmergencyHelpModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
