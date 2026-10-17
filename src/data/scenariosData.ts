import type { Scenario } from '../utils/gameLogic';

import playgroundImg from '../assets/images/scene_cour_recre_1792239397134.jpg';
import cafeteriaImg from '../assets/images/scene_cantine_scolaire_1792239397492.jpg';
import cyberChatImg from '../assets/images/scene_cyber_chat_1792239398317.jpg';

export const SCENARIOS: Scenario[] = [
  {
    id: 'cour-de-recre',
    title: 'La cour de récréation : Le ballon confisqué',
    location: 'Sous le préau de l\'école',
    victimName: 'Lucas (CM1)',
    theme: 'exclusion',
    summary: 'Lucas se fait exclure du jeu de football et confisquer sa casquette de manière répétée.',
    contextText: `Tu es dans la cour pendant la récréation de l'après-midi. Près du préau, tu aperçois Lucas, assis seul sur un banc. Un groupe de trois élèves s'approche de lui. Maxime lui arrache sa casquette en criant : « Tu ne joues pas au foot avec nous, t'es trop nul et t'as pas le droit ! ». 

Les autres élèves ricanent et se passent la casquette au-dessus de sa tête. Lucas tente de la récupérer, il rougit et semble sur le point de pleurer. C'est déjà la quatrième fois cette semaine que ce groupe s'en prend à lui.`,
    distressSignals: [
      'Lucas a la tête baissée et les yeux embués de larmes',
      'Il est seul et isolé sur le banc à chaque récréation',
      'Le groupe de trois élèves agit de façon répétée cette semaine',
      'Il n\'arrive pas à se défendre seul face à trois camarades'
    ],
    imagePath: playgroundImg,
    choices: [
      {
        id: 'c1-empathy',
        text: 'Aller voir Lucas, lui proposer de venir jouer avec toi et aller ensemble voir la maîtresse de surveillance pour récupérer sa casquette.',
        isBestChoice: true,
        score: 25,
        badgeTag: 'Allié Protecteur',
        feedbackTitle: 'Bravo ! C\'est le réflexe d\'un vrai Ambassadeur !',
        feedbackText: 'En brisant l\'isolement de Lucas et en faisant intervenir un adulte de surveillance, tu désamorces la situation sans violence. Les agresseurs perdent leur pouvoir quand le groupe refuse d\'être complice.',
        impactExplanation: 'Lucas retrouve le sourire et se sent en sécurité. La maîtresse a pu intervenir calmement et rappeler les règles de respect.',
        distressCluesIdentified: [
          'Tu as repéré l\'isolement de Lucas',
          'Tu as compris que la répétition rendait la situation insupportable',
          'Tu as alerté un adulte responsable sans agressivité'
        ]
      },
      {
        id: 'c1-passive',
        text: 'Regarder la scène de loin et rigoler discrètement avec tes copains pour ne pas te faire remarquer par Maxime.',
        isBestChoice: false,
        score: 5,
        badgeTag: 'Témoin Passif',
        feedbackTitle: 'Attention au piège du témoin passif !',
        feedbackText: 'Quand on rigole ou qu\'on ne dit rien, les agresseurs pensent qu\'on est d\'accord avec eux. Le silence des témoins renforce leur sentiment d\'impunité et augmente la tristesse de Lucas qui se sent abandonné de tous.',
        impactExplanation: 'Lucas pense que toute la classe est contre lui. La situation risque de recommencer dès demain.',
        distressCluesIdentified: [
          'Le silence et les rires font le jeu du harcèlement',
          'Un témoin passif encourage sans le vouloir les moqueries'
        ]
      },
      {
        id: 'c1-aggressive',
        text: 'Courir vers Maxime en hurlant des insultes et le pousser par terre pour lui arracher la casquette.',
        isBestChoice: false,
        score: 10,
        badgeTag: 'Réaction Impulsive',
        feedbackTitle: 'La violence ne résout jamais la violence !',
        feedbackText: 'Même si ton intention de protéger Lucas est généreuse, répondre par des coups ou des insultes crée une bagarre générale. Tu risques d\'être puni à ton tour et de compliquer la situation.',
        impactExplanation: 'La maîtresse arrive en entendant les cris et sépare la dispute. Lucas est encore plus effrayé par l\'escalade de violence.',
        distressCluesIdentified: [
          'L\'agressivité physique ne protège pas durablement la victime',
          'La bonne force d\'un ambassadeur réside dans le calme et l\'alerte d\'un adulte'
        ]
      }
    ]
  },
  {
    id: 'cantine-scolaire',
    title: 'La cantine : Le plateau bousculé et les chuchotements',
    location: 'Au réfectoire scolaire',
    victimName: 'Sarah (CM2)',
    theme: 'moqueries',
    summary: 'Sarah est la cible de moqueries sur son apparence et d\'un geste délibéré pour renverser son repas.',
    contextText: `C'est l'heure du déjeuner à la cantine. Sarah s'assoit au bout d'une table avec son plateau. Deux élèves de sa classe s'assoient juste en face et commencent à chuchoter en la regardant, en pouffant de rire. L'une d'elles imite sa façon de manger et se moque de ses lunettes.

Quand Sarah se lève pour remplir la carafe d'eau, un des élèves allonge sa jambe et donne un coup de coude dans son plateau. Son pot de compote tombe par terre et s'écrase. Toute la table éclate de rire. Sarah rougit violemment, regarde ses chaussures et n'ose rien dire par honte.`,
    distressSignals: [
      'Sarah est ciblée par des moqueries répétées sur son physique',
      'Le geste de faire tomber le plateau est volontaire mais maquillé en accident',
      'Elle n\'ose pas appeler à l\'aide par honte d\'attirer l\'attention',
      'Les rires des autres amplifient son humiliation publique'
    ],
    imagePath: cafeteriaImg,
    choices: [
      {
        id: 'c2-empathy',
        text: 'T\'approcher de Sarah, l\'aider à ramasser la compote, lui dire « Ne fais pas attention à eux » et prévenir gentiment l\'animateur de cantine.',
        isBestChoice: true,
        score: 25,
        badgeTag: 'Bouclier Bienveillant',
        feedbackTitle: 'Excellent réflexe de solidarité !',
        feedbackText: 'En apportant une aide concrète et des paroles réconfortantes, tu montres à Sarah qu\'elle n\'est pas seule. Prévenir l\'animateur de la cantine permet de rétablir la justice sans que Sarah n\'ait à porter toute la charge de l\'alerte.',
        impactExplanation: 'L\'animateur nettoie avec Sarah, prend à part les élèves moqueurs et rappelle que la cantine est un lieu de convivialité pour tous.',
        distressCluesIdentified: [
          'Tu as identifié la détresse silencieuse et la honte de la victime',
          'Un geste simple de solidarité désarme l\'effet d\'humiliation publique'
        ]
      },
      {
        id: 'c2-passive',
        text: 'Regarder fixement ton assiette en te disant : « Ce ne sont pas mes affaires, je ne veux pas d\'ennuis avec les deux élèves ». ',
        isBestChoice: false,
        score: 5,
        badgeTag: 'Regard Évitant',
        feedbackTitle: 'Ne pas voir, c\'est laisser faire !',
        feedbackText: 'La peur de représailles est naturelle, mais le silence laisse la victime totalement désemparée. À l\'école, porter secours à un camarade en détresse est le rôle de chacun.',
        impactExplanation: 'Sarah quitte la cantine sans avoir mangé son dessert et va s\'enfermer dans les toilettes pour pleurer.',
        distressCluesIdentified: [
          'L\'indifférence isole davantage la personne en souffrance'
        ]
      },
      {
        id: 'c2-blame',
        text: 'Dire à Sarah : « Bah alors Sarah, t\'es maladroite ! Fais attention la prochaine fois ! »',
        isBestChoice: false,
        score: 5,
        badgeTag: 'Inversion des rôles',
        feedbackTitle: 'Attention à ne pas culpabiliser la victime !',
        feedbackText: 'Sarah n\'est pas maladroite : son plateau a été bousculé intentionnellement ! Lui faire des reproches, c\'est renverser la responsabilité et lui faire croire que c\'est de sa faute.',
        impactExplanation: 'Sarah se sent coupable d\'une injustice subie, ce qui détruit encore plus sa confiance en elle.',
        distressCluesIdentified: [
          'La victime n\'est JAMAIS responsable des attaques qu\'elle subit'
        ]
      }
    ]
  },
  {
    id: 'cyber-groupe',
    title: 'Le groupe en ligne : La photo détournée et les emojis moqueurs',
    location: 'Sur le tchat de messagerie de la classe',
    victimName: 'Thomas (CM2)',
    theme: 'cyberharcelement',
    summary: 'Une photo compromettante de Thomas est diffusée sur le groupe de classe avec des moqueries en chaîne.',
    contextText: `Le soir, tu ouvres la messagerie sur ta tablette. Sur le groupe créé par des élèves de la classe pour discuter des devoirs et des jeux vidéo, un élève vient de publier une photo de Thomas prise en cachette pendant la gym où il a trébuché dans les haies. 

La photo a été gribouillée avec des inscriptions méchantes : « Le boulet de l'année ». Plusieurs élèves ont répondu avec des emojis de rire aux larmes et des commentaires : « Trop la honte », « Supprime ta vie ». Thomas a quitté le groupe sans répondre. Demain matin, il a cours avec tout le monde.`,
    distressSignals: [
      'Photo prise sans autorisation et diffusée publiquement',
      'Effet de meute numérique : les moqueries continuent 24h/24 hors de l\'école',
      'Thomas a quitté le groupe brusquement, signe de grand désarroi',
      'La peur d\'affronter la classe le lendemain matin'
    ],
    imagePath: cyberChatImg,
    choices: [
      {
        id: 'c3-empathy',
        text: 'Écrire sur le groupe : « Stop, ce n\'est pas drôle du tout, supprimez cette photo ! », faire une capture d\'écran pour garder la preuve, envoyer un message de soutien à Thomas et en parler à tes parents.',
        isBestChoice: true,
        score: 25,
        badgeTag: 'Sentinelle Numérique',
        feedbackTitle: 'C\'est exactement la démarche exemplaire !',
        feedbackText: 'Sur Internet, la règle d\'or est : refuser d\'alimenter la chaîne, manifester publiquement son désaccord pour stopper l\'effet de groupe, conserver des captures d\'écran de preuve et prévenir des adultes de confiance.',
        impactExplanation: 'Grâce à ton message, d\'autres élèves silencieux osent dire qu\'ils sont d\'accord avec toi. La photo est retirée et l\'enseignant organise un échange le lendemain matin.',
        distressCluesIdentified: [
          'Garder les captures d\'écran comme preuve légale',
          'Rompre la viralité en disant fermement stop',
          'Soutenir en privé la personne ciblée'
        ]
      },
      {
        id: 'c3-share',
        text: 'Mettre un emoji qui rigole et transférer l\'image à d\'autres copains qui ne sont pas dans le groupe.',
        isBestChoice: false,
        score: 0,
        badgeTag: 'Complice du Cyberharcèlement',
        feedbackTitle: 'Très dangereux : c\'est puni par la loi !',
        feedbackText: 'Partager une photo humiliante ou y ajouter un emoji moqueur fait de toi un auteur de cyberharcèlement. Même mineur, la loi française interdit formellement la diffusion de contenus portant atteinte à la dignité d\'autrui.',
        impactExplanation: 'La photo fait le tour de l\'école. Thomas a tellement d\'angoisse qu\'il refuse de manger et ne veut plus retourner à l\'école.',
        distressCluesIdentified: [
          'Liker ou retweeter / transférer une moquerie propage la violence',
          'La responsabilité pénale commence aussi sur les écrans'
        ]
      },
      {
        id: 'c3-leave',
        text: 'Quitter discrètement le groupe pour ne plus voir les messages sans rien dire à personne.',
        isBestChoice: false,
        score: 10,
        badgeTag: 'Témoin Déconnecté',
        feedbackTitle: 'Tu te protèges, mais Thomas reste seul face aux attaques.',
        feedbackText: 'Quitter le groupe t\'évite de participer, ce qui est bien. Mais Thomas reste la cible de toute la meute numérique sans aucun allié. Un ambassadeur utilise sa voix pour alerter et soutenir.',
        impactExplanation: 'Les messages continuent toute la nuit. Personne n\'a prévenu les adultes et Thomas arrive en pleurs le lendemain.',
        distressCluesIdentified: [
          'Le cyberharcèlement ne s\'arrête pas tout seul si personne n\'intervient'
        ]
      }
    ]
  },
  {
    id: 'couloir-rumeurs',
    title: 'Le couloir et les vestiaires : La rumeur venimeuse',
    location: 'Dans le couloir devant la classe',
    victimName: 'Emma (CM1)',
    theme: 'rumeur',
    summary: 'Une fausse rumeur se propage sur Emma, provoquant son isolement total et des maux de ventre.',
    contextText: `Dans le couloir avant la sonnerie, Léa chuchote à un groupe d'élèves : « Vous savez quoi ? Emma a fouillé dans les cartables ce matin et elle vole les feutres des autres ! Et en plus elle sent bizarre ! ». Deux autres élèves répètent déjà la phrase à d'autres camarades.

Depuis trois jours, personne ne veut s'asseoir à côté d'Emma en classe ni lui prêter de matériel. Emma reste collée au mur du couloir, la tête rentrée dans son blouson. Elle se tient le ventre à deux mains et a demandé deux fois dans la semaine d'aller à l'infirmerie pour des nausées.`,
    distressSignals: [
      'Propagation de fausses rumeurs calomnieuses',
      'Mise en quarantaine / exclusion systématique de la classe',
      'Signes physiques de détresse : maux de ventre récurrents (somatisation)',
      'Emma cherche refuge à l\'infirmerie pour fuir le groupe'
    ],
    imagePath: playgroundImg,
    choices: [
      {
        id: 'c4-empathy',
        text: 'Dire aux élèves : « Arrêtez d\'inventer des choses fausses, c\'est méchant et injuste ». Proposer à Emma de vous asseoir ensemble en classe et lui demander comment elle va.',
        isBestChoice: true,
        score: 25,
        badgeTag: 'Porteur de Vérité',
        feedbackTitle: 'Magistral ! Tu brises la chaîne des rumeurs !',
        feedbackText: 'Les rumeurs se nourrissent de la crédulité et de la répétition. En exigeant des faits et en refusant de relayer le mensonge, tu détruis la mécanique de rejet. Aller vers Emma dissipe immédiatement son sentiment d\'exclusion.',
        impactExplanation: 'Emma ressent un immense soulagement. Les autres élèves se rendent compte de la bêtise de la rumeur et s\'excusent.',
        distressCluesIdentified: [
          'Comprendre que les maux de ventre sont un signal d\'alarme corporel face au stress',
          'S\'opposer fermement aux rumeurs infondées',
          'Rétablir le lien social en offrant sa présence amicale'
        ]
      },
      {
        id: 'c4-repeat',
        text: 'Aller répéter l\'histoire à tes meilleurs amis en disant : « Attention, faites gaffe à vos trousses avec Emma ! »',
        isBestChoice: false,
        score: 0,
        badgeTag: 'Vecteur de Rumeur',
        feedbackTitle: 'Très néfaste ! Tu deviens le moteur du harcèlement !',
        feedbackText: 'Colporter une rumeur sans preuve blesse profondément et détruit la réputation d\'une personne. Même si ce n\'est pas toi qui l\'as inventée, la relayer te rend co-responsable de sa souffrance.',
        impactExplanation: 'Toute l\'école pointe Emma du doigt. Ses parents doivent venir la chercher car ses maux de ventre deviennent insupportables.',
        distressCluesIdentified: [
          'La rumeur est une forme d\'agression psychologique grave'
        ]
      },
      {
        id: 'c4-ignore',
        text: 'Ne rien dire, mais changer de place pour ne pas risquer d\'être assis à côté d\'elle.',
        isBestChoice: false,
        score: 5,
        badgeTag: 'Conformisme de Groupe',
        feedbackTitle: 'Tu renforces son exclusion par peur des autres !',
        feedbackText: 'Changer de place valide silencieusement la rumeur et envoie le message qu\'Emma est coupable. Pour être un ambassadeur, il faut le courage d\'agir selon son cœur et sa conscience.',
        impactExplanation: 'Emma se retrouve complètement isolée dans un coin de la classe et perd l\'envie de travailler.',
        distressCluesIdentified: [
          'L\'exclusion spatiale est une douleur invisible très vive'
        ]
      }
    ]
  }
];
