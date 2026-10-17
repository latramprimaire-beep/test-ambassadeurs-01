import type { QuizQuestion } from '../utils/gameLogic';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Quels sont les 3 critères obligatoires pour parler de harcèlement scolaire?',
    options: [
      'La violence (physique ou verbale), la répétition et l\'isolement de la victime',
      'Une simple dispute entre deux copains pendant une partie de billes',
      'Un gros mot dit une seule fois dans le couloir sans faire exprès',
      'Avoir une mauvaise note lors d\'une dictée'
    ],
    correctIndex: 0,
    explanation: 'Le harcèlement se caractérise toujours par trois éléments cumulés : la violence répétée dans le temps et un rapport de force déséquilibré où la victime est isolée et ne peut pas se défendre seule.',
    tip: 'Moyen mnémotechnique : V.R.I. = Violence, Répétition, Isolement !'
  },
  {
    id: 'q2',
    question: 'Quelle est la différence entre « cafarder » (rapporter) et « protéger / alerter » ?',
    options: [
      'Il n\'y a aucune différence, il ne faut jamais rien dire à la maîtresse',
      'Cafarder sert à faire punir un camarade pour se venger ; Alerter sert à secourir quelqu\'un qui souffre',
      'Cafarder rapporte des points bonus et protéger fait perdre la partie',
      'Alerter est puni par le règlement intérieur de l\'école'
    ],
    correctIndex: 1,
    explanation: 'Parler à un adulte pour sauver ou aider un camarade en souffrance n\'est JAMAIS du cafardage ! C\'est un acte de courage citoyen et d\'assistance à personne en détresse.',
    tip: 'Rappelle-toi : on ne rapporte pas pour nuire, on alerte pour protéger !'
  },
  {
    id: 'q3',
    question: 'Quel est le numéro de téléphone d\'urgence gratuit et confidentiel en France contre le harcèlement et le cyberharcèlement ?',
    options: [
      'Le 15 (SAMU)',
      'Le 3018 (Harcèlement et Cyberharcèlement)',
      'Le 18 (Pompiers)',
      'Le 118 218'
    ],
    correctIndex: 1,
    explanation: 'Le 3018 est le numéro national gratuit, anonyme et confidentiel, joignable par téléphone, tchat ou application mobile pour les élèves, parents et témoins.',
    tip: 'À retenir par cœur : le 3018 protège tous les élèves de France !'
  },
  {
    id: 'q4',
    question: 'Pourquoi le rôle des témoins (les camarades qui voient la scène) est-il si important ?',
    options: [
      'Parce que dans 80% des cas, le harcèlement s\'arrête quand les témoins s\'interposent ou alertent un adulte',
      'Parce que les témoins doivent prendre des photos et les poster sur TikTok',
      'Les témoins ne servent à rien dans une école',
      'Les témoins doivent rire pour rendre la situation moins triste'
    ],
    correctIndex: 0,
    explanation: 'Les agresseurs cherchent souvent le spectacle et l\'approbation du groupe. Si les témoins refusent de rire et préviennent un adulte, le harceleur perd tout son pouvoir.',
    tip: 'Un témoin bienveillant est un bouclier pour la victime.'
  },
  {
    id: 'q5',
    question: 'Quels peuvent être les signaux invisibles qu\'un camarade est victime de harcèlement ?',
    options: [
      'Il gagne toutes les courses et chante fort toute la journée',
      'Il a souvent mal au ventre, reste seul, ses notes chutent et il a peur d\'aller à l\'école',
      'Il invite tous ses copains à son anniversaire',
      'Il prête joyeusement ses feutres à tout le monde'
    ],
    correctIndex: 1,
    explanation: 'Le corps réagit au stress émotionnel : maux de tête, maux de ventre le matin, tristesse inhabituelle, mutisme ou repli sur soi sont des signes d\'alerte majeurs.',
    tip: 'Observe bien tes camarades : le silence cache parfois un grand appel à l\'aide.'
  },
  {
    id: 'q6',
    question: 'Sur un réseau social ou un jeu en ligne, si tu reçois une moquerie sur un élève de ta classe, que dois-tu faire ?',
    options: [
      'Liker la publication et la partager dans d\'autres groupes pour rigoler',
      'Ne rien dire et regarder les commentaires méchants défiler',
      'Refuser de propager, faire une capture d\'écran de preuve et montrer le message à un adulte / appeler le 3018',
      'Répondre avec des insultes encore plus méchantes'
    ],
    correctIndex: 2,
    explanation: 'Le cyberharcèlement est puni par la loi. La capture d\'écran est indispensable car elle sert de preuve juridique, même si l\'auteur supprime ensuite son message.',
    tip: 'La règle du numérique : Stop - Capture d\'écran - Parler à un adulte !'
  },
  {
    id: 'q7',
    question: 'À qui peux-tu parler à l\'école si tu remarques qu\'un élève est pris pour cible ?',
    options: [
      'Uniquement au président de la République',
      'À ton maître ou ta maîtresse, au directeur, à l\'infirmière scolaire ou aux animateurs du périscolaire',
      'À personne, il faut garder le secret pour toujours',
      'Uniquement à ton animal de compagnie'
    ],
    correctIndex: 1,
    explanation: 'Tous les adultes de l\'école sont formés pour écouter avec bienveillance et protéger les élèves. Tu peux aussi en parler à tes délégués de classe ou à tes parents.',
    tip: 'L\'école est une équipe : les adultes sont là pour assurer ta sécurité.'
  },
  {
    id: 'q8',
    question: 'Est-ce que la victime est un jour responsable du harcèlement qu\'elle subit ?',
    options: [
      'Oui, si elle s\'habille bizarrement ou qu\'elle est trop timide',
      'NON, JAMAIS ! La victime n\'a aucune faute, chacun a le droit d\'être respecté tel qu\'il est',
      'Oui, si elle ne sait pas se défendre toute seule',
      'Ça dépend si elle a de bonnes notes'
    ],
    correctIndex: 1,
    explanation: 'La diversité est une richesse. Rien, absolument rien ne justifie les moqueries, l\'exclusion ou la violence. La responsabilité incombe toujours à 100% à ceux qui attaquent.',
    tip: 'Chaque enfant est unique et a droit au respect le plus absolu !'
  }
];
