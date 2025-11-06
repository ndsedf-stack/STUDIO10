import { Day } from './types';

export const DAYS: Day[] = ['dimanche', 'mardi', 'jeudi', 'vendredi'];

export const PROGRAM_INFO = {
  name: 'HYBRID MASTER 51',
  description: 'Programme Complet Définitif - 26 Semaines',
  profile: 'Homme 51 ans, expérience intermédiaire (6 mois - 2 ans)',
  objective: 'Hypertrophie maximale sécurisée',
  duration: 26,
  frequency: 3,
  sessionDuration: '68-73 min',
  deloadWeeks: [6, 12, 18, 24, 26]
};

export const EXPECTED_RESULTS = {
  leanMass: '+4.5 à 5.5 kg',
  armCircumference: '+2.5 à 3 cm',
  chestCircumference: '+3.5 à 4 cm',
  shoulderCircumference: '+3 à 3.5 cm',
  backCircumference: '+4 à 5 cm',
  thighCircumference: '+3 à 3.5 cm',
  trapBarDeadlift: '+40 à 50 kg',
  completionRate: '95%+',
  injuryRisk: '<5%'
};

export const BLOCKS = [
  {
    id: 1,
    name: 'Fondations Hybrides',
    weeks: [1, 2, 3, 4, 5],
    technique: {
      name: 'Tempo Contrôlé',
      description: 'Tempo 3-1-2 sur TOUS les exercices + pauses stratégiques',
      rpe: '6-7'
    }
  },
  {
    id: 2,
    name: 'Surcharge Progressive',
    weeks: [7, 8, 9, 10, 11],
    technique: {
      name: 'Rest-Pause',
      description: 'Tempo 2-1-2 + Rest-Pause sur exercices principaux',
      rpe: '7-8'
    }
  },
  {
    id: 3,
    name: 'Surcompensation',
    weeks: [13, 14, 15, 16, 17],
    technique: {
      name: 'Drop-Sets + Myo-Reps',
      description: 'Intensification métabolique maximale',
      rpe: '8'
    }
  },
  {
    id: 4,
    name: 'Intensification Maximale',
    weeks: [19, 20, 21, 22, 23, 25],
    technique: {
      name: 'Clusters + Myo-Reps + Partials',
      description: 'Techniques avancées combinées',
      rpe: '8-9'
    }
  }
];

export const DIMANCHE_WORKOUT = {
  name: 'DOS + JAMBES LOURDES + BRAS',
  day: 'dimanche' as Day,
  totalSets: 31,
  duration: 68,
  exercises: [
    {
      id: 'trap_bar_dl',
      name: 'Trap Bar Deadlift',
      sets: 5,
      reps: '6-8',
      rest: 120,
      startWeight: 75,
      progression: { increment: 5, frequency: 3 },
      notes: 'Exercice principal - Progression +5kg tous les 3 semaines'
    },
    {
      id: 'goblet_squat',
      name: 'Goblet Squat',
      sets: 4,
      reps: 10,
      rest: 75,
      startWeight: 25,
      progression: { increment: 2.5, frequency: 2 },
      notes: 'Haltère - Progression +2.5kg tous les 2 semaines'
    },
    {
      id: 'leg_press_heavy',
      name: 'Leg Press',
      sets: 4,
      reps: 10,
      rest: 75,
      startWeight: 110,
      progression: { increment: 10, frequency: 2 },
      notes: 'Progression +10kg tous les 2 semaines'
    },
    {
      id: 'lat_pulldown',
      name: 'Lat Pulldown (prise large)',
      sets: 4,
      reps: 10,
      rest: 90,
      startWeight: 60,
      progression: { increment: 2.5, frequency: 2 },
      notes: 'SUPERSET avec Landmine Press - Prise large: mains écartées 1.5× largeur épaules',
      isSuperset: true,
      supersetWith: 'landmine_press'
    },
    {
      id: 'landmine_press',
      name: 'Landmine Press',
      sets: 4,
      reps: 10,
      rest: 90,
      startWeight: 35,
      progression: { increment: 2.5, frequency: 2 },
      notes: 'SUPERSET avec Lat Pulldown',
      isSuperset: true,
      supersetWith: 'lat_pulldown'
    },
    {
      id: 'rowing_machine_large',
      name: 'Rowing Machine (prise large)',
      sets: 4,
      reps: 10,
      rest: 75,
      startWeight: 50,
      progression: { increment: 2.5, frequency: 2 },
      notes: 'Prise large: coudes vers extérieur, tire vers bas des pecs'
    },
    {
      id: 'spider_incline_curl',
      name: 'Spider Curl / Incline Curl',
      sets: 4,
      reps: 12,
      rest: 75,
      startWeight: 12,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'SUPERSET avec Cable Pushdown - Spider Curl blocs 2&4 / Incline Curl blocs 1&3',
      isSuperset: true,
      supersetWith: 'cable_pushdown'
    },
    {
      id: 'cable_pushdown',
      name: 'Cable Pushdown',
      sets: 3,
      reps: 12,
      rest: 75,
      startWeight: 20,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'SUPERSET avec Spider/Incline Curl',
      isSuperset: true,
      supersetWith: 'spider_incline_curl'
    }
  ]
};

export const MARDI_WORKOUT = {
  name: 'PECS + ÉPAULES + TRICEPS',
  day: 'mardi' as Day,
  totalSets: 35,
  duration: 70,
  exercises: [
    {
      id: 'dumbbell_press',
      name: 'Dumbbell Press',
      sets: 5,
      reps: 10,
      rest: 105,
      startWeight: 22,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'Exercice principal - 22kg par haltère'
    },
    {
      id: 'cable_fly_mid',
      name: 'Cable Fly (poulies moyennes)',
      sets: 4,
      reps: 12,
      rest: 60,
      startWeight: 10,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'Poulies à hauteur épaules'
    },
    {
      id: 'leg_press_light',
      name: 'Leg Press léger',
      sets: 3,
      reps: 15,
      rest: 60,
      startWeight: 80,
      progression: { increment: 10, frequency: 3 },
      notes: 'Version légère pour activation'
    },
    {
      id: 'extension_triceps',
      name: 'Extension Triceps Corde',
      sets: 5,
      reps: 12,
      rest: 75,
      startWeight: 20,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'SUPERSET avec Lateral Raises',
      isSuperset: true,
      supersetWith: 'lateral_raises_1'
    },
    {
      id: 'lateral_raises_1',
      name: 'Lateral Raises',
      sets: 5,
      reps: 15,
      rest: 75,
      startWeight: 8,
      progression: { increment: 2.5, frequency: 4 },
      notes: 'SUPERSET avec Extension Triceps - 8kg par haltère',
      isSuperset: true,
      supersetWith: 'extension_triceps'
    },
    {
      id: 'face_pull',
      name: 'Face Pull',
      sets: 5,
      reps: 15,
      rest: 60,
      startWeight: 20,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'Pour deltoïdes postérieurs'
    },
    {
      id: 'rowing_machine_narrow',
      name: 'Rowing Machine (prise serrée)',
      sets: 4,
      reps: 12,
      rest: 75,
      startWeight: 50,
      progression: { increment: 2.5, frequency: 2 },
      notes: 'Prise serrée: mains largeur épaules, coudes le long du corps, tire vers nombril'
    },
    {
      id: 'overhead_extension',
      name: 'Overhead Extension (corde, assis)',
      sets: 4,
      reps: 12,
      rest: 60,
      startWeight: 15,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'Assis pour stabilité'
    }
  ]
};

export const VENDREDI_WORKOUT = {
  name: 'DOS + JAMBES LÉGÈRES + BRAS + ÉPAULES',
  day: 'vendredi' as Day,
  totalSets: 33,
  duration: 73,
  exercises: [
    {
      id: 'landmine_row',
      name: 'Landmine Row',
      sets: 5,
      reps: 10,
      rest: 105,
      startWeight: 55,
      progression: { increment: 2.5, frequency: 2 },
      notes: 'Exercice principal dos'
    },
    {
      id: 'leg_curl',
      name: 'Leg Curl',
      sets: 5,
      reps: 12,
      rest: 75,
      startWeight: 40,
      progression: { increment: 5, frequency: 3 },
      notes: 'SUPERSET avec Leg Extension',
      isSuperset: true,
      supersetWith: 'leg_extension'
    },
    {
      id: 'leg_extension',
      name: 'Leg Extension',
      sets: 4,
      reps: 15,
      rest: 75,
      startWeight: 35,
      progression: { increment: 5, frequency: 3 },
      notes: 'SUPERSET avec Leg Curl',
      isSuperset: true,
      supersetWith: 'leg_curl'
    },
    {
      id: 'cable_fly',
      name: 'Cable Fly',
      sets: 4,
      reps: 15,
      rest: 60,
      startWeight: 10,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'SUPERSET avec Dumbbell Fly',
      isSuperset: true,
      supersetWith: 'dumbbell_fly'
    },
    {
      id: 'dumbbell_fly',
      name: 'Dumbbell Fly',
      sets: 4,
      reps: 12,
      rest: 60,
      startWeight: 10,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'SUPERSET avec Cable Fly - 10kg par haltère',
      isSuperset: true,
      supersetWith: 'cable_fly'
    },
    {
      id: 'ez_bar_curl',
      name: 'EZ Bar Curl',
      sets: 5,
      reps: 12,
      rest: 75,
      startWeight: 25,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'SUPERSET avec Overhead Extension',
      isSuperset: true,
      supersetWith: 'overhead_extension_2'
    },
    {
      id: 'overhead_extension_2',
      name: 'Overhead Extension',
      sets: 3,
      reps: 12,
      rest: 75,
      startWeight: 15,
      progression: { increment: 2.5, frequency: 3 },
      notes: 'SUPERSET avec EZ Bar Curl',
      isSuperset: true,
      supersetWith: 'ez_bar_curl'
    },
    {
      id: 'lateral_raises_2',
      name: 'Lateral Raises',
      sets: 3,
      reps: 15,
      rest: 60,
      startWeight: 8,
      progression: { increment: 2.5, frequency: 4 },
      notes: '8kg par haltère'
    },
    {
      id: 'wrist_curl',
      name: 'Wrist Curl',
      sets: 3,
      reps: 20,
      rest: 45,
      startWeight: 30,
      progression: { increment: 2.5, frequency: 4 },
      notes: 'Avant-bras'
    }
  ]
};

export const HAMMER_CURL_HOME = {
  id: 'hammer_curl_home',
  name: 'Hammer Curl (Maison)',
  sets: 3,
  reps: 12,
  startWeight: 12,
  progression: { increment: 2.5, frequency: 3 },
  notes: 'À faire Mardi soir ET Jeudi soir - 12kg par haltère'
};

export const SUPPLEMENTS = [
  { name: 'Protéines', dosage: '2g/kg poids corps', timing: 'Répartis sur journée', objective: 'Construction musculaire' },
  { name: 'Créatine Monohydrate', dosage: '5g/jour', timing: 'Post-training', objective: 'Force + volume cellulaire' },
  { name: 'Collagène', dosage: '10g/jour', timing: 'Matin à jeun', objective: 'Santé tendons/articulations' },
  { name: 'Oméga-3 (EPA/DHA)', dosage: '3g/jour', timing: 'Avec repas', objective: 'Anti-inflammatoire' },
  { name: 'Vitamine D3', dosage: '4000 UI/jour', timing: 'Matin', objective: 'Testostérone + immunité' },
  { name: 'ZMA (Zinc+Magnésium)', dosage: 'Selon étiquette', timing: '30 min avant coucher', objective: 'Testostérone + sommeil' },
  { name: 'Whey Isolate', dosage: '30g', timing: 'Post-training immédiat', objective: 'Récupération rapide' },
  { name: 'Glucides rapides', dosage: '50g', timing: 'Post-training', objective: 'Recharge glycogène' },
  { name: 'Électrolytes', dosage: '1 dose', timing: 'Pendant training', objective: 'Hydratation optimale' }
];