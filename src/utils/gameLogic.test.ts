import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  calculateAmbassadorRank, 
  evaluateBullyingCriteria, 
  evaluateQuizAnswers, 
  canGenerateDiploma,
  type QuizQuestion 
} from './gameLogic.ts';

test('calculateAmbassadorRank gives correct titles based on stars and quiz score', () => {
  assert.equal(calculateAmbassadorRank(4, 100), 'Super Ambassadeur de la Bienveillance');
  assert.equal(calculateAmbassadorRank(4, 80), 'Super Ambassadeur de la Bienveillance');
  assert.equal(calculateAmbassadorRank(3, 70), 'Sentinelle de la Cour');
  assert.equal(calculateAmbassadorRank(2, 50), 'Éclaireur Bienveillant');
  assert.equal(calculateAmbassadorRank(1, 20), 'Novice de l\'Amitié');
});

test('evaluateBullyingCriteria accurately detects all 3 legal criteria', () => {
  const fullHarcelement = evaluateBullyingCriteria({
    hasViolence: true,
    isRepeated: true,
    hasPowerImbalanceOrIsolation: true
  });
  assert.equal(fullHarcelement.isBullying, true);
  assert.equal(fullHarcelement.missingCriteria.length, 0);

  const isolatedFight = evaluateBullyingCriteria({
    hasViolence: true,
    isRepeated: false,
    hasPowerImbalanceOrIsolation: true
  });
  assert.equal(isolatedFight.isBullying, false);
  assert.equal(isolatedFight.missingCriteria.includes('La répétition (ce n\'est pas un acte isolé)'), true);
});

test('evaluateQuizAnswers calculates accuracy percentage and pass status', () => {
  const dummyQuestions: QuizQuestion[] = [
    { id: 'q1', question: 'Numéro d\'urgence ?', options: ['3018', '118', '999'], correctIndex: 0, explanation: '', tip: '' },
    { id: 'q2', question: 'Le témoin a un rôle ?', options: ['Non', 'Oui crucial'], correctIndex: 1, explanation: '', tip: '' },
    { id: 'q3', question: 'Le harcèlement est répété ?', options: ['Non', 'Oui'], correctIndex: 1, explanation: '', tip: '' },
    { id: 'q4', question: 'Cafarder ou protéger ?', options: ['C\'est pareil', 'Protéger sauve'], correctIndex: 1, explanation: '', tip: '' },
  ];

  const perfectAnswers = { q1: 0, q2: 1, q3: 1, q4: 1 };
  const resPerfect = evaluateQuizAnswers(perfectAnswers, dummyQuestions);
  assert.equal(resPerfect.correctCount, 4);
  assert.equal(resPerfect.percentage, 100);
  assert.equal(resPerfect.hasPassed, true);

  const partialAnswers = { q1: 0, q2: 0, q3: 1, q4: 0 };
  const resPartial = evaluateQuizAnswers(partialAnswers, dummyQuestions);
  assert.equal(resPartial.correctCount, 2);
  assert.equal(resPartial.percentage, 50);
  assert.equal(resPartial.hasPassed, false);
});

test('canGenerateDiploma requires all scenarios and high quiz score', () => {
  assert.equal(canGenerateDiploma(4, 4, 85), true);
  assert.equal(canGenerateDiploma(3, 4, 90), false);
  assert.equal(canGenerateDiploma(4, 4, 60), false);
});
