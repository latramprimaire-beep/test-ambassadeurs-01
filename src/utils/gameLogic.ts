/**
 * Pure business logic for the Mission Bienveillance application.
 * Fully decoupled and unit testable.
 */

export interface ScenarioChoice {
  id: string;
  text: string;
  isBestChoice: boolean;
  score: number;
  badgeTag?: string;
  feedbackTitle: string;
  feedbackText: string;
  impactExplanation: string;
  distressCluesIdentified: string[];
}

export interface Scenario {
  id: string;
  title: string;
  location: string;
  victimName: string;
  theme: 'exclusion' | 'moqueries' | 'cyberharcelement' | 'rumeur';
  summary: string;
  contextText: string;
  distressSignals: string[];
  choices: ScenarioChoice[];
  imagePath: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  tip: string;
}

export interface EvaluationResult {
  score: number;
  isBestChoice: boolean;
  feedbackTitle: string;
  feedbackText: string;
  impactExplanation: string;
  distressClues: string[];
}

export type AmbassadorRank = 
  | 'Novice de l\'Amitié'
  | 'Éclaireur Bienveillant'
  | 'Sentinelle de la Cour'
  | 'Super Ambassadeur de la Bienveillance';

/**
 * Calculates the ambassador rank based on scenario stars and quiz percentage.
 */
export function calculateAmbassadorRank(scenarioStars: number, quizScorePercent: number): AmbassadorRank {
  const totalWeight = scenarioStars * 15 + quizScorePercent * 0.4; // max = 4*15 + 100*0.4 = 100
  if (totalWeight >= 85) {
    return 'Super Ambassadeur de la Bienveillance';
  } else if (totalWeight >= 65) {
    return 'Sentinelle de la Cour';
  } else if (totalWeight >= 40) {
    return 'Éclaireur Bienveillant';
  }
  return 'Novice de l\'Amitié';
}

/**
 * Verifies if the 3 legal/pedagogical criteria of school bullying are fulfilled.
 * Harcèlement scolaire = Violence (verbale, physique, psychologique) + Répétition + Isolement / Asymétrie.
 */
export function evaluateBullyingCriteria(criteria: {
  hasViolence: boolean;
  isRepeated: boolean;
  hasPowerImbalanceOrIsolation: boolean;
}): { isBullying: boolean; missingCriteria: string[]; advice: string } {
  const missing: string[] = [];
  if (!criteria.hasViolence) missing.push('La violence (mots blessants, gestes ou rejet)');
  if (!criteria.isRepeated) missing.push('La répétition (ce n\'est pas un acte isolé)');
  if (!criteria.hasPowerImbalanceOrIsolation) missing.push('L\'isolement (la victime a du mal à se défendre seule)');

  if (missing.length === 0) {
    return {
      isBullying: true,
      missingCriteria: [],
      advice: 'Attention : les 3 critères sont réunis ! C\'est une situation de harcèlement scolaire qui nécessite l\'intervention immédiate d\'un adulte et l\'appel au 3018.'
    };
  }

  return {
    isBullying: false,
    missingCriteria: missing,
    advice: missing.length === 1 && !criteria.isRepeated 
      ? 'C\'est une violence ou un conflit ponctuel. Même si ce n\'est pas encore du harcèlement répété, c\'est interdit et cela doit être arrêté tout de suite !' 
      : 'Tous les critères ne sont pas réunis pour du harcèlement répété, mais chaque situation de détresse compte.'
  };
}

/**
 * Calculates quiz score and accuracy percentage.
 */
export function evaluateQuizAnswers(answers: Record<string, number>, questions: QuizQuestion[]): {
  correctCount: number;
  total: number;
  percentage: number;
  hasPassed: boolean;
} {
  let correctCount = 0;
  for (const q of questions) {
    if (answers[q.id] === q.correctIndex) {
      correctCount++;
    }
  }
  const total = questions.length;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  return {
    correctCount,
    total,
    percentage,
    hasPassed: percentage >= 75
  };
}

/**
 * Determines whether a student qualifies for the printable Ambassador Diploma.
 */
export function canGenerateDiploma(completedScenariosCount: number, totalScenarios: number, quizScorePercent: number): boolean {
  return completedScenariosCount >= totalScenarios && quizScorePercent >= 70;
}
