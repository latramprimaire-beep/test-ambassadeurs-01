import React, { useState, useEffect, Component, type ErrorInfo, type ReactNode } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScenarioGame } from './components/ScenarioGame';
import { CriteriaDetector } from './components/CriteriaDetector';
import { QuizSection } from './components/QuizSection';
import { DiplomaSection } from './components/DiplomaSection';
import { EmergencyHelpModal } from './components/EmergencyHelpModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { ShieldCheck, PhoneCall, BookOpen, AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erreur interceptée par ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-amber-50/50 text-slate-800">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-amber-200 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold font-display text-slate-900">
              Oups ! Un petit problème est survenu
            </h1>
            <p className="text-sm text-slate-600">
              Pas d'inquiétude, clique sur le bouton ci-dessous pour recharger l'application Mission Bienveillance.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.hash = '#/';
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Recharger l'application</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

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

  // Normalize hash in case the user visits #jeu instead of #/jeu or passes ?autostart=1
  useEffect(() => {
    const rawHash = window.location.hash;
    if (rawHash && !rawHash.startsWith('#/')) {
      const cleanPath = rawHash.replace(/^#\/?/, '');
      if (['jeu', 'detecteur', 'quiz', 'diplome'].includes(cleanPath)) {
        navigate('/' + cleanPath, { replace: true });
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autostart') === '1') {
      navigate('/jeu', { replace: true });
    }
  }, [navigate]);

  // Map route pathname to active tab identifier
  const currentTab = (() => {
    const p = location.pathname.replace(/^\//, '');
    if (!p) return 'accueil';
    return p;
  })();

  const handleSelectTab = (tab: string) => {
    const targetPath = tab === 'accueil' ? '/' : `/${tab}`;
    navigate(targetPath);
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
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-900 font-sans">
        {/* Top Navigation */}
        <Navbar
          activeTab={currentTab}
          onSelectTab={handleSelectTab}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
          totalScore={totalScore}
        />

        {/* Main Content using React Router Routes */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <Routes>
            <Route
              path="/"
              element={
                <HeroSection
                  onStartGame={() => handleSelectTab('jeu')}
                  onOpenQuiz={() => handleSelectTab('quiz')}
                  onOpenDetector={() => handleSelectTab('detecteur')}
                  onOpenDiploma={() => handleSelectTab('diplome')}
                  scenariosCompleted={completedScenarioIds.length}
                />
              }
            />

            <Route
              path="/jeu"
              element={
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
                      Mission Ambassadeur : Le Serious Game
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Observe la situation, repère les indices de souffrance et choisis la réaction protectrice.
                    </p>
                  </div>

                  <ScenarioGame
                    completedScenarioIds={completedScenarioIds}
                    onScenarioCompleted={handleScenarioCompleted}
                    onFinishAll={() => handleSelectTab('quiz')}
                  />
                </div>
              }
            />

            <Route path="/detecteur" element={<CriteriaDetector />} />

            <Route
              path="/quiz"
              element={
                <QuizSection
                  onQuizCompleted={handleQuizCompleted}
                  onGoToDiploma={() => handleSelectTab('diplome')}
                />
              }
            />

            <Route
              path="/diplome"
              element={
                <DiplomaSection
                  scenariosCompletedCount={completedScenarioIds.length}
                  quizScorePercentage={quizScorePercentage}
                  totalScore={totalScore}
                />
              }
            />

            {/* Fallback route to prevent any 404 or white page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
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
    </ErrorBoundary>
  );
}
