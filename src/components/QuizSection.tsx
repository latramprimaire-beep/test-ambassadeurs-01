import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { evaluateQuizAnswers } from '../utils/gameLogic';
import { playSuccessChime, playReflectionTone, playChoiceClick } from '../utils/soundEffects';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Award, Lightbulb, Star } from 'lucide-react';

interface QuizSectionProps {
  onQuizCompleted: (scorePercentage: number) => void;
  onGoToDiploma: () => void;
}

function randomizeQuiz(questions: typeof QUIZ_QUESTIONS) {
  return questions.map(q => {
    const paired = q.options.map((opt, idx) => ({ opt, isCorrect: idx === q.correctIndex }));
    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paired[i], paired[j]] = [paired[j], paired[i]];
    }
    const newCorrectIndex = paired.findIndex(p => p.isCorrect);
    return {
      ...q,
      options: paired.map(p => p.opt),
      correctIndex: newCorrectIndex
    };
  });
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onQuizCompleted,
  onGoToDiploma
}) => {
  const [shuffledQuestions, setShuffledQuestions] = useState(() => randomizeQuiz(QUIZ_QUESTIONS));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const question = shuffledQuestions[currentQuestionIndex];
  const isCorrect = selectedOption === question.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    playChoiceClick();
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    const updatedAnswers = { ...answers, [question.id]: idx };
    setAnswers(updatedAnswers);

    if (idx === question.correctIndex) {
      playSuccessChime();
    } else {
      playReflectionTone();
    }
  };

  const handleNextQuestion = () => {
    playChoiceClick();
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      const result = evaluateQuizAnswers(answers, shuffledQuestions);
      onQuizCompleted(result.percentage);
      setIsFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    playChoiceClick();
    setShuffledQuestions(randomizeQuiz(QUIZ_QUESTIONS));
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsFinished(false);
  };

  const quizResult = evaluateQuizAnswers(answers, shuffledQuestions);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Quiz Progress Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-100 shadow-sm">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700 mb-2">
          <span>Question {currentQuestionIndex + 1} sur {QUIZ_QUESTIONS.length}</span>
          <span className="tabular-nums text-amber-700">
            {quizResult.correctCount} / {QUIZ_QUESTIONS.length} bonnes réponses
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          {/* Question Text */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Défis des Sentinelles</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 leading-snug">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isOptionCorrect = idx === question.correctIndex;
              
              let optionStyle = 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/40 text-slate-800';
              if (isAnswerSubmitted) {
                if (isOptionCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (isSelected) {
                  optionStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                } else {
                  optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-sm shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base font-semibold leading-relaxed">
                      {option}
                    </span>
                  </div>

                  {isAnswerSubmitted && (
                    <div className="shrink-0">
                      {isOptionCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : isSelected ? (
                        <XCircle className="w-6 h-6 text-rose-500" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {isAnswerSubmitted && (
            <div className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
              isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              <div className="flex items-center gap-2 font-black font-display text-base sm:text-lg">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Exact ! Bonne réponse !</span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    <span>Pas tout à fait... Retiens bien cette explication :</span>
                  </>
                )}
              </div>

              <p className="text-sm sm:text-base leading-relaxed font-medium">
                {question.explanation}
              </p>

              <div className="bg-white/80 rounded-xl p-3 border border-current/20 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 shrink-0 fill-amber-400" />
                <span>{question.tip}</span>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md cursor-pointer"
                >
                  <span>
                    {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Question suivante' : 'Voir mon bilan'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-amber-600">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mb-2">
              Quiz terminé avec succès !
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Tu as obtenu <strong className="text-amber-600 text-lg">{quizResult.correctCount} sur {quizResult.total}</strong> bonnes réponses ({quizResult.percentage}% de réussite).
            </p>
          </div>

          <div className="max-w-md mx-auto p-5 rounded-2xl bg-amber-50 border border-amber-200 text-left">
            <h3 className="font-bold text-sm text-slate-900 mb-2">Bilan de tes acquis :</h3>
            <ul className="text-xs sm:text-sm space-y-1.5 text-slate-700">
              <li>✓ Tu sais reconnaître les 3 critères (Violence, Répétition, Isolement).</li>
              <li>✓ Tu as compris que parler à un adulte n'est pas cafarder mais protéger.</li>
              <li>✓ Tu as mémorisé le numéro d'urgence gratuit <strong>3018</strong>.</li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Recommencer le quiz</span>
            </button>

            <button
              onClick={onGoToDiploma}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Award className="w-5 h-5" />
              <span>Lancer les Missions (5 Étapes)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
