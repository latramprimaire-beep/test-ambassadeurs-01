import playgroundImg from '../assets/images/cour_recre_fr_1792242367600.jpg';
import cafeteriaImg from '../assets/images/cantine_scolaire_fr_1792242367491.jpg';
import cyberChatImg from '../assets/images/cyber_chat_fr_1792242367321.jpg';

export interface StoryChoice {
  id: string;
  text: string;
  isBestChoice: boolean;
  score: number;
  badgeTag: string;
  feedbackTitle: string;
  feedbackText: string;
  consequenceText: string;
}

export interface StoryStep {
  stepNumber: number; // 1 à 5
  stepTitle: string;
  location: string;
  storyText: string;
  question: string;
  choices: StoryChoice[];
}

export interface StoryMission {
  id: string;
  title: string;
  location: string;
  victimName: string;
  theme: 'exclusion' | 'moqueries' | 'cyberharcelement' | 'rumeur';
  summary: string;
  imagePath: string;
  goldenRule: string;
  steps: StoryStep[];
}

export const STORY_MISSIONS: StoryMission[] = [
  {
    id: 'cour-de-recre',
    title: 'Mission 1 · La cour de récréation : L\'histoire de Lucas',
    location: 'Sous le préau de l\'école élémentaire',
    victimName: 'Lucas (CM1)',
    theme: 'exclusion',
    summary: 'Lucas subit des moqueries répétées et le vol de sa casquette dans la cour.',
    imagePath: playgroundImg,
    goldenRule: 'Dans 80% des cas, le harcèlement scolaire cesse dans la minute quand un camarade témoin intervient calmement ou alerte un adulte !',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Étape 1 : Le début de la récréation',
        location: 'Près du banc de la cour',
        storyText: `La cloche de 15h sonne. Les élèves se précipitent dans la cour pour jouer. Tu aperçois Lucas qui s'assoit seul sur un banc en bois. Il sort sa balle de tennis de sa poche.
Aussitôt, Maxime et deux de ses copains arrivent d'un pas rapide, se plantent devant lui les bras croisés, et lui lancent avec mépris : « Rentre ta balle Lucas, tu joues pas avec nous, t'es trop nul et t'as pas le droit ! ».`,
        question: 'Tu es à quelques mètres et tu assistes à cette première scène. Quelle est ta réaction immédiate ?',
        choices: [
          {
            id: 'm1-s1-good',
            text: 'T\'approcher calmement et dire : « Pourquoi vous lui parlez comme ça ? La cour appartient à tout le monde ! »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Voix du Courage',
            feedbackTitle: 'Excellente prise de parole immédiate !',
            feedbackText: 'En intervenant dès les premiers mots méchants, tu montres tout de suite à Maxime que son comportement ne sera pas toléré en silence.',
            consequenceText: 'Maxime s\'arrête net, surpris que quelqu\'un ose contester son autorité devant les autres.'
          },
          {
            id: 'm1-s1-passive',
            text: 'Détourner le regard et partir jouer ailleurs pour ne pas te faire remarquer par le groupe.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Silence Évitant',
            feedbackTitle: 'Attention au silence : il donne du pouvoir aux agresseurs.',
            feedbackText: 'Quand personne ne réagit, le groupe se sent fort et libre de continuer son attaque.',
            consequenceText: 'Voyant que personne ne s\'interpose, Maxime passe à l\'étape supérieure...'
          },
          {
            id: 'm1-s1-aggressive',
            text: 'Insulter Maxime en lui disant : « C\'est toi le gros nul dégage de là ! »',
            isBestChoice: false,
            score: 4,
            badgeTag: 'Colère Impulsive',
            feedbackTitle: 'L\'agressivité entraîne l\'escalade.',
            feedbackText: 'Répondre par des insultes fait monter la tension et risque de déclencher une bagarre générale dans la cour.',
            consequenceText: 'Les copains de Maxime s\'énervent et la dispute devient violente.'
          }
        ]
      },
      {
        stepNumber: 2,
        stepTitle: 'Étape 2 : L\'escalade et la provocation',
        location: 'Sous le préau',
        storyText: `L'ambiance devient pesante. Maxime sourit d'un air narquois et arrache brusquement la casquette de Lucas d'un coup sec.
Il la jette en l'air à ses deux complices qui se la passent au-dessus de la tête de Lucas comme une balle de passe-à-dix. Lucas court de l'un à l'autre en sautillant pour essayer de l'attraper, rouge de honte, les larmes aux yeux. Des élèves autour s'arrêtent et commencent à regarder la scène.`,
        question: 'Le jeu humiliant attire du monde. Que fais-tu maintenant ?',
        choices: [
          {
            id: 'm1-s2-good',
            text: 'Te placer aux côtés de Lucas, lui poser une main réconfortante sur l\'épaule et dire au groupe : « Rendez-lui sa casquette, ce n\'est pas un jeu ! »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Bouclier Humain',
            feedbackTitle: 'Bravo ! Tu brises l\'isolement physique de Lucas !',
            feedbackText: 'Être deux désamorce le sentiment d\'abandon de la victime. Lucas ne se sent plus seul face à la meute.',
            consequenceText: 'Lucas reprend son souffle et sent qu\'il a un allié précieux à ses côtés.'
          },
          {
            id: 'm1-s2-laugh',
            text: 'Rigoler avec les autres élèves spectateurs pour faire comme tout le monde.',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Complice Spectateur',
            feedbackTitle: 'Rire de l\'humiliation, c\'est participer au harcèlement !',
            feedbackText: 'Pour la victime, le rire des spectateurs fait encore plus mal que le geste de l\'agresseur.',
            consequenceText: 'Lucas s\'effondre moralement, croyant que tout le monde se réjouit de son malheur.'
          },
          {
            id: 'm1-s2-passive',
            text: 'Attendre en espérant que la sonnerie retentisse vite pour mettre fin à l\'histoire.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Attentisme',
            feedbackTitle: 'Le temps paraît interminable pour celui qui souffre.',
            feedbackText: 'Chaque minute de passivité est une souffrance supplémentaire pour Lucas.',
            consequenceText: 'Les trois élèves continuent et menacent de jeter sa casquette sur le toit.'
          }
        ]
      },
      {
        stepNumber: 3,
        stepTitle: 'Étape 3 : Le piège de l\'isolement',
        location: 'Près des marronniers',
        storyText: `Maxime ne lâche rien : « Si tu la veux, viens la chercher dans la boue ! ». Lucas est coincé contre le tronc d'un arbre, il baisse les bras et ne cherche même plus à courir. Il tremble.
Deux autres élèves de la classe s'approchent et te murmurent : « Laisse tomber, si tu t'en mêles, Maxime va nous embêter nous aussi demain... ». C'est la peur des représailles qui paralyse tout le monde.`,
        question: 'Tes camarades te conseillent de laisser tomber par peur. Quel choix fais-tu ?',
        choices: [
          {
            id: 'm1-s3-good',
            text: 'Leur répondre : « Si on est plusieurs à dire non, il ne pourra rien faire ! Venez avec moi, on va voir la maîtresse de surveillance ensemble ! »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Leader Bienveillant',
            feedbackTitle: 'Magnifique réflexe d\'union collective !',
            feedbackText: 'La solidarité transforme la peur en force. Quand les témoins s\'unissent, les agresseurs perdent tout leur ascendant.',
            consequenceText: 'Tes deux camarades reprennent courage et décident de t\'accompagner !'
          },
          {
            id: 'm1-s3-fear',
            text: 'Écouter tes copains, avoir peur d\'être la prochaine cible et reculer.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Peur Contagieuse',
            feedbackTitle: 'La peur est normale, mais elle protège le harceleur.',
            feedbackText: 'Si tout le monde recule, personne n\'est à l\'abri d\'être la prochaine victime.',
            consequenceText: 'Lucas perd tout espoir et s\'assoit par terre en larmes.'
          },
          {
            id: 'm1-s3-mock',
            text: 'Crier sur tes copains : « Vous êtes des lâches et des trouillards ! »',
            isBestChoice: false,
            score: 3,
            badgeTag: 'Jugement Agressif',
            feedbackTitle: 'Juger les autres ne crée pas de solidarité.',
            feedbackText: 'Pour rallier ses camarades, il faut les encourager avec bienveillance, pas les rabaisser.',
            consequenceText: 'Tes amis se vexent et s\'en vont, te laissant seul.'
          }
        ]
      },
      {
        stepNumber: 4,
        stepTitle: 'Étape 4 : L\'intervention de l\'adulte responsable',
        location: 'Devant la maîtresse de surveillance',
        storyText: `Tu décides d'agir. Tu t'approches de la maîtresse de surveillance avec Lucas et tes amis. La maîtresse voit que vous arrivez en groupe et demande calmement : « Que se passe-t-il les enfants ? ».
Maxime, voyant que vous parlez à la maîtresse, te lance un regard noir depuis le préau et te chuchote de loin : « T'es qu'une balance ! ».`,
        question: 'Comment t\'exprimes-tu auprès de la maîtresse pour expliquer la situation sans intimidation ?',
        choices: [
          {
            id: 'm1-s4-good',
            text: 'Expliquer clairement : « Maîtresse, Maxime a confisqué la casquette de Lucas et se moque de lui depuis plusieurs jours. Lucas est triste et on a besoin de votre aide pour que ça cesse. »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Alerteur Citoyen',
            feedbackTitle: 'Formulation parfaite : factuelle et protectrice !',
            feedbackText: 'Alerter pour secourir un camarade n\'est pas cafarder. Tu décris les faits sans haine pour rétablir la justice et la sécurité.',
            consequenceText: 'La maîtresse comprend tout de suite la gravité et se dirige vers Maxime pour récupérer la casquette.'
          },
          {
            id: 'm1-s4-hesitate',
            text: 'Avoir honte du mot "balance", baisser les yeux et bafouiller : « Euh... rien en fait, c\'est juste un petit jeu... »',
            isBestChoice: false,
            score: 1,
            badgeTag: 'Piège du Cafardage',
            feedbackTitle: 'Le mot "balance" est une arme manipulatrice des agresseurs !',
            feedbackText: 'Les harceleurs utilisent ce mot pour faire taire les témoins. Protéger quelqu\'un est un acte noble.',
            consequenceText: 'La maîtresse repart et Lucas reste sans défense.'
          },
          {
            id: 'm1-s4-punish',
            text: 'Crier : « Maîtresse, punissez Maxime pour toujours, collez-lui deux heures de colle ! »',
            isBestChoice: false,
            score: 4,
            badgeTag: 'Désir de Vengeance',
            feedbackTitle: 'Ce n\'est pas aux élèves de décider des punitions.',
            feedbackText: 'L\'adulte est là pour enquêter, écouter et sanctionner selon le règlement scolaire.',
            consequenceText: 'La maîtresse te demande de baisser d\'un ton pour comprendre calmement.'
          }
        ]
      },
      {
        stepNumber: 5,
        stepTitle: 'Étape 5 : Le bilan et la nouvelle récréation',
        location: 'La cour apaisée',
        storyText: `La maîtresse est intervenue avec fermeté et écoute. Elle a récupéré la casquette de Lucas, a pris Maxime et ses copains à part pour un rappel à la loi et une convocation avec la directrice.
Lucas a retrouvé le sourire. La cloche de fin de récréation sonne. Demain, une nouvelle récréation commencera.`,
        question: 'Quel geste d\'Ambassadeur de la Bienveillance fais-tu pour consolider la paix durablement ?',
        choices: [
          {
            id: 'm1-s5-good',
            text: 'Proposer à Lucas de monter en rang ensemble et convenir de faire une partie de ballon tous ensemble dès demain midi.',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Bâtisseur d\'Amitié',
            feedbackTitle: 'Victoire totale ! Lucas est désormais intégré et protégé !',
            feedbackText: 'La meilleure arme contre le harcèlement est l\'inclusion active et la création de liens d\'amitié durables.',
            consequenceText: 'Lucas se sent enfin aimé et respecté dans sa classe. Mission 1 accomplie avec brio !'
          },
          {
            id: 'm1-s5-brag',
            text: 'Aller narguer Maxime en disant : « Bien fait pour toi, t\'es puni ! »',
            isBestChoice: false,
            score: 1,
            badgeTag: 'Rancœur Nuisible',
            feedbackTitle: 'La moquerie inversée ne guérit rien.',
            feedbackText: 'Narguer l\'agresseur puni entretient la rancœur et risque de créer de nouveaux conflits plus tard.',
            consequenceText: 'Maxime rumine sa vengeance au lieu de réfléchir à sa faute.'
          },
          {
            id: 'm1-s5-forget',
            text: 'Repartir seul sans un mot à Lucas maintenant que la maîtresse a géré.',
            isBestChoice: false,
            score: 3,
            badgeTag: 'Aide Ponctuelle',
            feedbackTitle: 'L\'amitié se construit sur la durée.',
            feedbackText: 'Une parole amicale après l\'orage ancre définitivement la sécurité affective de Lucas.',
            consequenceText: 'Lucas est soulagé, mais il hésite encore à s\'ouvrir aux autres.'
          }
        ]
      }
    ]
  },
  {
    id: 'cantine-scolaire',
    title: 'Mission 2 · La cantine : Le déjeuner de Sarah',
    location: 'Au réfectoire de l\'école élémentaire',
    victimName: 'Sarah (CM2)',
    theme: 'moqueries',
    summary: 'Sarah est la cible de moqueries sur son apparence et d\'un plateau bousculé à la cantine.',
    imagePath: cafeteriaImg,
    goldenRule: 'Un mot gentil et un accueil à sa table désarment instantanément l\'humiliation publique !',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Étape 1 : L\'entrée au réfectoire',
        location: 'La file du self',
        storyText: `C'est midi et demi. L'odeur du pain chaud et des légumes emplit le réfectoire. Sarah prend son plateau orange et s'avance dans la file. Deux filles de sa classe se penchent l'une vers l'autre en la regardant de haut en bas, en gloussant derrière leur main : « Regarde ses chaussures déchirées et ses lunettes de grand-mère... trop la honte ». Sarah baisse les yeux et serre son plateau contre elle.`,
        question: 'Tu es juste derrière Sarah dans la file. Comment réagis-tu ?',
        choices: [
          {
            id: 'm2-s1-good',
            text: 'Parler joyeusement à Sarah : « Salut Sarah ! Tu as vu le menu aujourd\'hui ? Tu veux qu\'on mange ensemble ? »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Accueil Chaleureux',
            feedbackTitle: 'Un bouclier de gentillesse immédiat !',
            feedbackText: 'En engageant la conversation positivement, tu coupes court aux chuchotements méchants et tu montres à Sarah qu\'elle a de la valeur.',
            consequenceText: 'Sarah relève la tête avec un grand sourire, soulagée d\'avoir quelqu\'un avec qui parler.'
          },
          {
            id: 'm2-s1-passive',
            text: 'Faire comme si tu n\'avais rien entendu et regarder le menu sur le tableau.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Indifférence',
            feedbackTitle: 'Le silence valide les médisances.',
            feedbackText: 'Sarah se sent observée et jugée par toute la file d\'attente.',
            consequenceText: 'Les deux filles continuent leurs ricanements en s\'asseyant à une table.'
          },
          {
            id: 'm2-s1-judge',
            text: 'Regarder discrètement les chaussures de Sarah pour voir si elles sont vraiment abîmées.',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Curiosité Malplacée',
            feedbackTitle: 'Ne participe pas à l\'examen humiliant.',
            feedbackText: 'L\'apparence des autres ne regarde personne : chacun s\'habille comme il peut et a droit au respect absolu.',
            consequenceText: 'Sarah voit ton regard et rougit encore plus.'
          }
        ]
      },
      {
        stepNumber: 2,
        stepTitle: 'Étape 2 : Le plateau renversé',
        location: 'Entre deux tables de cantine',
        storyText: `Sarah s'assoit au bout d'une table. Les deux filles viennent s'asseoir juste en face. Alors que Sarah se lève pour aller chercher une carafe d'eau, un élève allonge sa jambe sous la table et heurte délibérément son genou.
Le plateau bascule : le verre d'eau vole, la soupe se renverse et son assiette s'écrase sur le sol avec un bruit sourd. Toute la salle de cantine s'arrête de parler. Des rires éclatent. Sarah est tétanisée au milieu du réfectoire.`,
        question: 'Tous les regards sont braqués sur Sarah. Quelle est ton action immédiate ?',
        choices: [
          {
            id: 'm2-s2-good',
            text: 'Te lever immédiatement, aller vers Sarah, l\'aider à ramasser et dire fort : « Arrêtez de rire, ce n\'est pas drôle, son plateau a été poussé exprès ! »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Défenseur Spontané',
            feedbackTitle: 'Formidable courage devant toute la cantine !',
            feedbackText: 'Prendre la parole devant un groupe de spectateurs désarme l\'humiliation collective et remet les rieurs face à leur bêtise.',
            consequenceText: 'Les rires s\'éteignent immédiatement. Les élèves prennent conscience de la méchanceté du geste.'
          },
          {
            id: 'm2-s2-laugh',
            text: 'Rigoler avec tes voisins en disant : « Quel strike ! »',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Humiliation Amplifiée',
            feedbackTitle: 'Cruauté inacceptable !',
            feedbackText: 'Transformer le malheur d\'un camarade en spectacle est une blessure morale dévastatrice.',
            consequenceText: 'Sarah s\'effondre et commence à pleurer au milieu des débris.'
          },
          {
            id: 'm2-s2-freeze',
            text: 'Rester assis sans bouger de peur de renverser ton propre verre.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Tétanie',
            feedbackTitle: 'La surprise paralyse, mais Sarah a besoin d\'aide.',
            feedbackText: 'Quand un accident ou une injustice arrive, le premier qui bouge pour aider sauve la situation.',
            consequenceText: 'Sarah reste seule de longues secondes au milieu du sol mouillé.'
          }
        ]
      },
      {
        stepNumber: 3,
        stepTitle: 'Étape 3 : L\'arrivée de l\'animateur',
        location: 'Au milieu de la cantine',
        storyText: `L'animateur de cantine, alerté par le bruit de vaisselle cassée, arrive avec une serpillère et un balai.
Les deux élèves moqueuses s'empressent de dire d'un ton innocent : « C'est pas nous monsieur, c'est Sarah qui est super maladroite, elle ne regarde jamais où elle marche ! ». Sarah n'ose pas contredire par peur de représailles.`,
        question: 'L\'animateur regarde Sarah d\'un air perplexe. Comment rétablis-tu la vérité ?',
        choices: [
          {
            id: 'm2-s3-good',
            text: 'Expliquer calmement à l\'animateur : « Monsieur, ce n\'est pas de la maladresse. J\'ai vu la jambe allongée exprès pour faire tomber son plateau, et les moqueries durent depuis la file d\'attente. »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Témoin de Vérité',
            feedbackTitle: 'Rétablissement parfait de la vérité !',
            feedbackText: 'Un témoignage précis et posé permet à l\'adulte de comprendre le piège tendu à la victime sans se laisser berner par les coupables.',
            consequenceText: 'L\'animateur fronce les sourcils, prend les deux élèves à part et demande un nouveau plateau pour Sarah.'
          },
          {
            id: 'm2-s3-silent',
            text: 'Te taire et laisser l\'animateur gronder Sarah pour sa maladresse.',
            isBestChoice: false,
            score: 1,
            badgeTag: 'Injustice Tolérée',
            feedbackTitle: 'Laisser punir un innocent est insupportable.',
            feedbackText: 'Quand un témoin se tait, l\'injustice triomphe et la victime perd toute confiance envers les adultes.',
            consequenceText: 'Sarah ramasse seule sous les reproches injustes.'
          },
          {
            id: 'm2-s3-shout',
            text: 'Hurler sur les deux filles : « Espèces de menteuses, vous êtes des pestes ! »',
            isBestChoice: false,
            score: 3,
            badgeTag: 'Emportement',
            feedbackTitle: 'L\'énervement brouille ton message.',
            feedbackText: 'L\'animateur risque de te recadrer pour les insultes au lieu d\'écouter ton explication.',
            consequenceText: 'La situation devient confuse pour l\'adulte qui ne sait plus qui croire.'
          }
        ]
      },
      {
        stepNumber: 4,
        stepTitle: 'Étape 4 : Le réconfort et le repas partagé',
        location: 'À une table chaleureuse',
        storyText: `L'animateur a changé Sarah de table et a demandé aux élèves responsables de nettoyer avec lui.
Sarah a un nouveau plateau tout chaud, mais elle reste assise avec les yeux rouges, sans appétit, les mains tremblotantes sur ses genoux. Le repas va bientôt se terminer.`,
        question: 'Comment l\'aides-tu à retrouver son appétit et son sourire ?',
        choices: [
          {
            id: 'm2-s4-good',
            text: 'T\'asseoir à côté d\'elle, lui couper un morceau de pain en souriant et lui parler de votre matière préférée pour la changer les idées.',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Cœur Bienveillant',
            feedbackTitle: 'C\'est l\'essence même de la bienveillance !',
            feedbackText: 'Un geste d\'attention simple et une écoute douce apaisent le choc émotionnel. Sarah peut enfin souffler et manger son repas.',
            consequenceText: 'Sarah esquisse un sourire et commence à manger son déjeuner dans le calme.'
          },
          {
            id: 'm2-s4-quiz',
            text: 'Lui poser des dizaines de questions sur pourquoi elle se laisse faire par les autres.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Interrogatoire',
            feedbackTitle: 'Ce n\'est pas le moment de poser des questions insistantes.',
            feedbackText: 'Sarah a besoin de réconfort et de calme, pas d\'un interrogatoire qui la met mal à l\'aise.',
            consequenceText: 'Sarah se referme sur elle-même.'
          },
          {
            id: 'm2-s4-leave',
            text: 'Partir débarrasser ton plateau sans un mot car tu as fini de manger.',
            isBestChoice: false,
            score: 3,
            badgeTag: 'Départ Précipité',
            feedbackTitle: 'Accompagne ton geste jusqu\'au bout.',
            feedbackText: 'Rester avec elle jusqu\'à la sonnerie scelle un sentiment de sécurité totale.',
            consequenceText: 'Sarah se retrouve à nouveau seule pour finir son repas.'
          }
        ]
      },
      {
        stepNumber: 5,
        stepTitle: 'Étape 5 : La charte du réfectoire',
        location: 'La cour après le repas',
        storyText: `En sortant de la cantine, l'animateur te remercie pour ton attitude exemplaire et informe l'enseignante de CM2 de l'incident. L'après-midi, la maîtresse décide d'ouvrir un échange de 10 minutes sur le respect et le vivre-ensemble à la cantine.`,
        question: 'Quelle proposition fais-tu pour que la cantine reste un lieu agréable pour tous ?',
        choices: [
          {
            id: 'm2-s5-good',
            text: 'Proposer de créer une table d\'accueil bienveillante où chaque élève isolé peut s\'asseoir avec des ambassadeurs volontaires.',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Ambassadeur Inspirant',
            feedbackTitle: 'Idée remarquable ! Un projet concret pour toute l\'école !',
            feedbackText: 'Cette idée élimine la peur d\'être seul à table et transforme la cantine en lieu d\'amitié pour tous.',
            consequenceText: 'Toute la classe et la maîtresse applaudissent l\'initiative. Mission 2 réussie !'
          },
          {
            id: 'm2-s5-punitive',
            text: 'Demander à ce que les deux filles mangent par terre dans un coin.',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Punition Vindicative',
            feedbackTitle: 'L\'humiliation ne doit jamais être la réponse.',
            feedbackText: 'L\'école doit éduquer au respect, jamais humilier en retour.',
            consequenceText: 'La maîtresse rappelle que la justice se fait dans le respect des personnes.'
          },
          {
            id: 'm2-s5-nothing',
            text: 'Ne rien proposer et attendre que la récréation sonne.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Passivité Post-Crise',
            feedbackTitle: 'Partager ses idées rend toute la classe meilleure.',
            feedbackText: 'La voix d\'un ambassadeur inspire ses camarades.',
            consequenceText: 'La séance se termine sans idée nouvelle pour améliorer le quotidien.'
          }
        ]
      }
    ]
  },
  {
    id: 'cyber-groupe',
    title: 'Mission 3 · Le groupe en ligne : Le message de Thomas',
    location: 'Sur la tablette de messagerie de la classe',
    victimName: 'Thomas (CM2)',
    theme: 'cyberharcelement',
    summary: 'Une photo humiliante de Thomas est diffusée en ligne avec des commentaires cruels.',
    imagePath: cyberChatImg,
    goldenRule: 'Sur Internet : Ne like pas, ne partage pas, fais une capture d\'écran de preuve et alerte le 3018 !',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Étape 1 : La notification du soir',
        location: 'À la maison sur la tablette',
        storyText: `Il est 19h30. Tu termines tes devoirs de français quand une notification vibre sur ta tablette. Sur le groupe de tchat créé par les élèves de la classe pour les exposés, un camarade vient d'envoyer une photo prise en cachette en cours de sport.
On y voit Thomas, le pantalon déchiré après avoir trébuché sur une haie d'athlétisme. La photo a été gribouillée avec une flèche rouge et le mot : « Le gros boulet de l'année ».`,
        question: 'Dès l\'apparition de ce message dans le groupe, quelle est ta première réaction ?',
        choices: [
          {
            id: 'm3-s1-good',
            text: 'Écrire immédiatement sur le tchat : « Ce n\'est pas drôle du tout, supprime cette photo tout de suite ! »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Bouclier Numérique',
            feedbackTitle: 'Excellente réaction immédiate !',
            feedbackText: 'Sur Internet, la viralité se nourrit de l\'approbation ou du silence. Dire non publiquement stoppe net l\'élan moqueur.',
            consequenceText: 'L\'élève qui a posté la photo hésite et commence à douter de sa blague.'
          },
          {
            id: 'm3-s1-like',
            text: 'Mettre un emoji "mort de rire" et transférer la photo à ton meilleur ami.',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Amplificateur Nuisible',
            feedbackTitle: 'Grave erreur : relayer, c\'est harceler !',
            feedbackText: 'Liker ou transférer une moquerie fait de toi un auteur légal de cyberharcèlement.',
            consequenceText: 'La photo commence à circuler sur d\'autres téléphones.'
          },
          {
            id: 'm3-s1-ignore',
            text: 'Fermer l\'application sans rien écrire en te disant que ce n\'est pas tes affaires.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Silence Écran',
            feedbackTitle: 'Le silence en ligne encourage les attaques.',
            feedbackText: 'Thomas voit que personne ne le défend et croit que toute la classe se moque de lui.',
            consequenceText: 'D\'autres élèves commencent à envoyer des commentaires méchants.'
          }
        ]
      },
      {
        stepNumber: 2,
        stepTitle: 'Étape 2 : L\'effet de meute numérique',
        location: 'Le fil de discussion',
        storyText: `Malgré tout, deux autres élèves ont renchéri avec des gifs humiliants et des messages : « T'es trop nul Thomas », « Cache-toi demain ».
Soudain, une ligne grise apparaît sur l'écran : *« Thomas a quitté le groupe »*. Thomas ne répond plus aux messages et a coupé sa tablette. Demain matin, il doit affronter toute la classe à 8h30.`,
        question: 'Thomas a quitté le groupe et semble désemparé. Que fais-tu ?',
        choices: [
          {
            id: 'm3-s2-good',
            text: 'Lui envoyer un message privé chaleureux : « Thomas, ne fais pas attention à ces bêtises, ce qu\'ils ont fait est nul. Je suis avec toi et on va régler ça demain ! »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Lien Sauveur',
            feedbackTitle: 'Geste salvateur de soutien privé !',
            feedbackText: 'Recevoir un message d\'amitié au moment le plus sombre évite à la victime de sombrer dans le désespoir et l\'angoisse nocturne.',
            consequenceText: 'Thomas lit ton message, respire un grand coup et se sent infiniment moins seul.'
          },
          {
            id: 'm3-s2-leave',
            text: 'Quitter le groupe toi aussi pour ne plus rien voir.',
            isBestChoice: false,
            score: 3,
            badgeTag: 'Fuite Numérique',
            feedbackTitle: 'Quitter le groupe te protège, mais n\'aide pas Thomas.',
            feedbackText: 'Thomas reste seul face aux répercussions si aucun allié ne garde le contact.',
            consequenceText: 'Les moqueries continuent sans témoin bienveillant.'
          },
          {
            id: 'm3-s2-mock',
            text: 'Écrire sur le groupe : « Bah alors Thomas, pourquoi tu rages et tu quittes ? »',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Cruauté Gratuite',
            feedbackTitle: 'Culpabilisation cruelle.',
            feedbackText: 'Reprocher à une victime d\'exprimer sa souffrance est indigne d\'un élève ambassadeur.',
            consequenceText: 'Thomas passe une nuit blanche dans les larmes.'
          }
        ]
      },
      {
        stepNumber: 3,
        stepTitle: 'Étape 3 : La sauvegarde de la preuve',
        location: 'Gestion de l\'écran',
        storyText: `Tu te rappelles les conseils de la formation sur le cyberharcèlement : les auteurs suppriment souvent leurs messages dès le lendemain pour faire comme s'il ne s'était rien passé et accuser la victime de mentir.`,
        question: 'Quel geste technique capital dois-tu accomplir sur ta tablette dès maintenant ?',
        choices: [
          {
            id: 'm3-s3-good',
            text: 'Faire une capture d\'écran (screenshot) montrant bien la photo, les commentaires moqueurs, l\'heure et les prénoms des auteurs.',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Gardien des Preuves',
            feedbackTitle: 'Le réflexe d\'or du numérique !',
            feedbackText: 'La capture d\'écran est la preuve juridique irréfutable en cas de cyberharcèlement. Elle protège la parole de la victime.',
            consequenceText: 'La preuve est enregistrée en sécurité dans tes photos.'
          },
          {
            id: 'm3-s3-delete',
            text: 'Supprimer toute la conversation pour faire disparaître la photo de tes yeux.',
            isBestChoice: false,
            score: 1,
            badgeTag: 'Destruction de Preuve',
            feedbackTitle: 'Erreur fréquente : supprimer détruit la preuve !',
            feedbackText: 'Si tu supprimes le tchat, les adultes ne pourront pas voir qui a envoyé quoi et l\'agresseur niera.',
            consequenceText: 'Il devient difficile de prouver ce qui a été dit.'
          },
          {
            id: 'm3-s3-post',
            text: 'Reposter la photo sur ton propre statut pour demander l\'avis de tout le monde.',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Sur-Diffusion',
            feedbackTitle: 'Catastrophique ! Tu amplifies la diffusion !',
            feedbackText: 'La rediffusion est une faute grave qui étend l\'humiliation à un public encore plus large.',
            consequenceText: 'Toute l\'école voit la photo à cause de ce repost.'
          }
        ]
      },
      {
        stepNumber: 4,
        stepTitle: 'Étape 4 : L\'alerte aux adultes',
        location: 'Le salon familial',
        storyText: `Il est 20h. Tes parents sont dans le salon. Demain matin, Thomas risque de refuser d'aller à l'école par peur du regard des autres élèves. Tu as la capture d'écran dans ta tablette.`,
        question: 'Comment passes-tu le relais aux adultes responsables ce soir ?',
        choices: [
          {
            id: 'm3-s4-good',
            text: 'Montrer la capture d\'écran à tes parents, leur expliquer la situation et leur demander d\'écrire un mot à l\'enseignant ou d\'appeler le 3018 si besoin.',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Sentinelle Responsable',
            feedbackTitle: 'Parfait ! Tu confies la situation aux adultes protecteurs !',
            feedbackText: 'Les adultes ont les moyens légaux et éducatifs pour intervenir dès l\'arrivée à l\'école et contacter les familles concernées.',
            consequenceText: 'Tes parents te félicitent pour ta vigilance et préviennent l\'école par email ce soir même.'
          },
          {
            id: 'm3-s4-keep',
            text: 'Garder le secret pour ne pas inquiéter tes parents et attendre de voir ce qui se passe demain.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Secret Risqué',
            feedbackTitle: 'Les adultes doivent être prévenus le plus vite possible.',
            feedbackText: 'Laisser passer la nuit sans intervention augmente le stress de Thomas qui ne dort pas.',
            consequenceText: 'Thomas fait une crise d\'angoisse au réveil le matin.'
          },
          {
            id: 'm3-s4-call',
            text: 'Appeler l\'élève qui a posté la photo pour le menacer de lui casser la figure demain matin.',
            isBestChoice: false,
            score: 1,
            badgeTag: 'Menace Nocturne',
            feedbackTitle: 'Les menaces ne résolvent rien.',
            feedbackText: 'En menaçant, tu te mets en tort et tu aggraves le conflit.',
            consequenceText: 'La dispute s\'envenime entre les familles.'
          }
        ]
      },
      {
        stepNumber: 5,
        stepTitle: 'Étape 5 : L\'accueil du lendemain matin',
        location: 'Devant la grille de l\'école à 8h20',
        storyText: `Le lendemain matin, Thomas arrive devant la grille de l'école. Il a l'air fatigué, le regard inquiet, la capuche sur la tête, hésitant à franchir le portail.`,
        question: 'Que fais-tu dès que tu aperçois Thomas arriver ?',
        choices: [
          {
            id: 'm3-s5-good',
            text: 'Aller vers lui d\'un pas amical, lui dire « Salut Thomas, viens avec nous ! », et entrer ensemble dans la cour comme une équipe soudée.',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Allié Exemplaire',
            feedbackTitle: 'Mission accomplie avec éclat !',
            feedbackText: 'Arriver aux côtés d\'amis dissout immédiatement l\'angoisse. Les moqueurs voient que Thomas n\'est pas une proie isolée.',
            consequenceText: 'Thomas retrouve le sourire, l\'enseignant règle la situation en classe dans la matinée. Bravo !'
          },
          {
            id: 'm3-s5-wait',
            text: 'Attendre qu\'il vienne vers toi tout seul pour voir s\'il a envie de parler.',
            isBestChoice: false,
            score: 3,
            badgeTag: 'Hésitation',
            feedbackTitle: 'C\'est à l\'ambassadeur de faire le premier pas.',
            feedbackText: 'Quand on a honte, on n\'ose pas aller vers les autres.',
            consequenceText: 'Thomas reste quelques minutes hésitant près du trottoir.'
          },
          {
            id: 'm3-s5-loud',
            text: 'Crier devant tout le monde : « T\'inquiète Thomas, j\'ai montré la photo à mes parents ! »',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Manque de Tact',
            feedbackTitle: 'Attention à la discrétion et au respect de sa pudeur.',
            feedbackText: 'Crier le problème en public peut gêner Thomas devant ses camarades.',
            consequenceText: 'Thomas baisse la tête, gêné par l\'attention de la foule.'
          }
        ]
      }
    ]
  },
  {
    id: 'couloir-rumeurs',
    title: 'Mission 4 · Le couloir : La rumeur sur Emma',
    location: 'Dans le couloir et les vestiaires de sport',
    victimName: 'Emma (CM1)',
    theme: 'rumeur',
    summary: 'Une rumeur calomnieuse isole Emma et provoque de violents maux de ventre.',
    imagePath: playgroundImg,
    goldenRule: 'Face à une rumeur : exige des faits, refuse de colporter et offre ta présence amicale !',
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Étape 1 : Le ragot du matin',
        location: 'Le couloir devant les porte-manteaux',
        storyText: `À 8h25, dans le couloir avant la sonnerie, Léa chuchote à un groupe de trois camarades : « Vous savez quoi ? Emma a fouillé dans mon cartable hier et elle m'a volé mes feutres pailletés ! Et en plus elle sent bizarre ! ». Deux élèves répètent déjà la phrase à d'autres camarades qui hochent la tête sans vérifier.`,
        question: 'Tu entends Léa colporter cette rumeur. Comment interviens-tu ?',
        choices: [
          {
            id: 'm4-s1-good',
            text: 'Dire calmement : « Tu as des preuves de ce que tu dis ? Inventer des mensonges sur quelqu\'un est méchant et interdit. »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Éteignoir de Rumeur',
            feedbackTitle: 'Réaction parfaite : exiger les faits !',
            feedbackText: 'Les rumeurs s\'effondrent dès que quelqu\'un demande des preuves réelles. Tu bloques la transmission du mensonge.',
            consequenceText: 'Léa bafouille et admet qu\'elle n\'a rien vu directement.'
          },
          {
            id: 'm4-s1-repeat',
            text: 'Aller répéter à tes copains : « Faites gaffe, Emma vole les feutres des autres ! »',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Colporteur de Mensonges',
            feedbackTitle: 'Répéter sans preuve est un acte grave.',
            feedbackText: 'En relayant une rumeur, tu participes activement à la destruction de la réputation d\'Emma.',
            consequenceText: 'Toute la classe commence à se méfier d\'Emma.'
          },
          {
            id: 'm4-s1-ignore',
            text: 'Haussers les épaules en pensant que ce n\'est qu\'un bavardage sans importance.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Sous-estimation',
            feedbackTitle: 'Une rumeur n\'est jamais anodine.',
            feedbackText: 'Un ragot répété 10 fois devient une vérité pour ceux qui l\'entendent.',
            consequenceText: 'La rumeur fait le tour de l\'école en moins d\'une heure.'
          }
        ]
      },
      {
        stepNumber: 2,
        stepTitle: 'Étape 2 : L\'exclusion en classe',
        location: 'Dans la classe de CM1',
        storyText: `L'heure de géographie commence. Le maître demande aux élèves de se mettre par deux pour travailler sur une carte de France.
Emma se tourne vers sa voisine habituelle qui recule brusquement sa chaise : « Non, je ne veux pas me mettre avec toi, tu touches pas à mes affaires ! ». Emma regarde autour d'elle : personne ne veut faire équipe avec elle. Elle se recroqueville, les bras croisés sur son ventre.`,
        question: 'Emma est mise en quarantaine devant tout le monde. Que décides-tu ?',
        choices: [
          {
            id: 'm4-s2-good',
            text: 'Lever la main et dire joyeusement : « Emma, viens avec moi, on fait la carte ensemble ! »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Partenaire Solidaire',
            feedbackTitle: 'Geste d\'inclusion héroïque !',
            feedbackText: 'Briser publiquement le boycott d\'une victime montre à toute la classe que le rejet est injustifié.',
            consequenceText: 'Emma sourit avec soulagement et s\'installe à ta table avec enthousiasme.'
          },
          {
            id: 'm4-s2-avoid',
            text: 'Choisir vite un autre copain pour ne pas risquer d\'être associé à Emma.',
            isBestChoice: false,
            score: 1,
            badgeTag: 'Peur du Regard des Autres',
            feedbackTitle: 'Le conformisme isole la victime.',
            feedbackText: 'Suivre le groupe par lâcheté valide la fausse rumeur.',
            consequenceText: 'Emma reste seule à sa table et pleure discrètement sur son cahier.'
          },
          {
            id: 'm4-s2-laugh',
            text: 'Changer de trousse pour ne pas qu\'elle voie tes feutres.',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Humiliation Tacite',
            feedbackTitle: 'Geste blessant qui valide le mensonge.',
            feedbackText: 'Ce comportement renforce l\'idée injuste qu\'Emma est une voleuse.',
            consequenceText: 'Emma se sent rejetée comme une coupable.'
          }
        ]
      },
      {
        stepNumber: 3,
        stepTitle: 'Étape 3 : Les signes corporels de souffrance',
        location: 'La récréation de l\'après-midi',
        storyText: `À la récréation, Emma ne sort pas jouer. Elle reste assise dans le couloir contre un radiateur, les genoux repliés contre sa poitrine, le visage pâle. Elle dit qu'elle a très mal au ventre et qu'elle a envie de vomir.
Tu te rappelles que le stress intense et la tristesse se traduisent souvent par des maux de ventre (somatisation).`,
        question: 'Tu vois Emma prostrée contre le radiateur. Quelle attention lui portes-tu ?',
        choices: [
          {
            id: 'm4-s3-good',
            text: 'T\'asseoir à sa hauteur, lui parler doucement : « Emma, je sais que cette histoire de feutres est fausse et méchante. Ton ventre te fait mal parce que tu as trop de chagrin. Veux-tu qu\'on aille à l\'infirmerie ensemble ? »',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Écoute Empathique',
            feedbackTitle: 'Une compréhension profonde de la détresse !',
            feedbackText: 'Mettre des mots sur l\'angoisse permet à la victime de décharger le poids physique de sa souffrance.',
            consequenceText: 'Emma fond en larmes dans tes bras et te remercie de la croire.'
          },
          {
            id: 'm4-s3-blame',
            text: 'Lui dire : « Tu as mal au ventre parce que tu as trop mangé à midi ! »',
            isBestChoice: false,
            score: 1,
            badgeTag: 'Incompréhension',
            feedbackTitle: 'Ne nie pas la détresse émotionnelle.',
            feedbackText: 'Les maux de ventre liés au harcèlement n\'ont rien à voir avec la digestion, ils sont le cri d\'un cœur blessé.',
            consequenceText: 'Emma se sent incomprise et s\'isole encore plus.'
          },
          {
            id: 'm4-s3-walk',
            text: 'Passer devant elle en courant vers la cour pour ne pas perdre une minute de jeu.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Indifférence',
            feedbackTitle: 'Une minute pour un ami peut changer sa journée.',
            feedbackText: 'Prendre un instant pour écouter est le devoir d\'une sentinelle.',
            consequenceText: 'Emma reste seule dans le couloir désert.'
          }
        ]
      },
      {
        stepNumber: 4,
        stepTitle: 'Étape 4 : La vérité révélée à l\'enseignant',
        location: 'Le bureau du maître',
        storyText: `À l'infirmerie, Emma t'explique qu'elle a retrouvé les feutres pailletés de Léa : ils étaient simplement tombés derrière le casier du fond de la classe depuis mardi !
Léa n'avait même pas vérifié et avait préféré accuser Emma pour se rendre intéressante auprès du groupe.`,
        question: 'Maintenant que le mystère est résolu, comment rétablir la dignité d\'Emma ?',
        choices: [
          {
            id: 'm4-s4-good',
            text: 'Apporter les feutres retrouvés au maître avec Emma et expliquer calmement comment cette fausse accusation a fait souffrir Emma.',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Rétablisseur de Justice',
            feedbackTitle: 'La vérité triomphe enfin au grand jour !',
            feedbackText: 'Présenter la preuve matérielle au maître permet de rétablir solennellement l\'innocence d\'Emma.',
            consequenceText: 'Le maître félicite votre démarche et décide d\'intervenir immédiatement auprès de la classe.'
          },
          {
            id: 'm4-s4-hide',
            text: 'Garder les feutres pour toi puisque personne ne savait où ils étaient.',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Malhonnêteté',
            feedbackTitle: 'Inacceptable !',
            feedbackText: 'Garder un objet perdu fait de toi un voleur et laisse Emma sous l\'accusation injuste.',
            consequenceText: 'Le mensonge perdure et Emma reste soupçonnée.'
          },
          {
            id: 'm4-s4-throw',
            text: 'Jeter les feutres à la figure de Léa dans le couloir.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Vengeance Agressive',
            feedbackTitle: 'La violence gâche la victoire de la vérité.',
            feedbackText: 'C\'est par le calme et les faits que l\'on désarme les calomniateurs.',
            consequenceText: 'La dispute dégénère et vous êtes punis tous les deux.'
          }
        ]
      },
      {
        stepNumber: 5,
        stepTitle: 'Étape 5 : Les excuses et la Charte de classe',
        location: 'La classe réunie en cercle',
        storyText: `Le maître a réuni la classe en cercle de discussion. Léa, confuse et honteuse, s'est excusée publiquement devant Emma pour avoir colporté une accusation sans fondement.
Le maître rappelle la règle essentielle : « Une rumeur fait autant de mal qu'un coup physique ».`,
        question: 'Pour clore cette épreuve, quelle action scelle la réconciliation bienveillante ?',
        choices: [
          {
            id: 'm4-s5-good',
            text: 'Accepter avec Emma les excuses de Léa et inviter toute la classe à signer ensemble la Charte du Groupe Bouclier.',
            isBestChoice: true,
            score: 10,
            badgeTag: 'Pacificateur d\'Honneur',
            feedbackTitle: 'Pardon et union retrouvée !',
            feedbackText: 'Savoir pardonner après la reconnaissance de la faute permet de reconstruire un groupe soudé et bienveillant.',
            consequenceText: 'Emma n\'a plus jamais mal au ventre et retrouve toute sa joie d\'apprendre. Mission 4 terminée avec panache !'
          },
          {
            id: 'm4-s5-reject',
            text: 'Refuser les excuses et dire à tout le monde de ne plus jamais parler à Léa.',
            isBestChoice: false,
            score: 0,
            badgeTag: 'Harcèlement Inversé',
            feedbackTitle: 'Ne reproduis pas le harcèlement en sens inverse !',
            feedbackText: 'Isoler Léa après ses excuses ferait d\'elle une nouvelle victime de harcèlement. L\'objectif est la réconciliation.',
            consequenceText: 'Un nouveau cycle de rancœur commence dans la classe.'
          },
          {
            id: 'm4-s5-leave',
            text: 'Regarder par la fenêtre en attendant la fin de journée sans participer au cercle.',
            isBestChoice: false,
            score: 2,
            badgeTag: 'Désintérêt',
            feedbackTitle: 'Chaque voix compte dans la vie de la classe.',
            feedbackText: 'S\'engager dans le groupe renforce la protection de tous.',
            consequenceText: 'La charte est signée sans ta participation.'
          }
        ]
      }
    ]
  }
];
