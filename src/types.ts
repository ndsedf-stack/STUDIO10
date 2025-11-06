// Types pour les muscles
export type MuscleGroup = "Pectoraux" | "Dos" | "Quadriceps" | "Ischios" | "Fessiers" | "Épaules" | "Biceps" | "Triceps" | "Avant-bras";

// Types pour les exercices
export interface Muscles {
  primary: MuscleGroup[];
  secondary: MuscleGroup[];
}

export interface Progression {
  increment: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rir: number;
  rest: number;
  startWeight: number;
  progression: Progression;
  intensification?: string;
  muscles: Muscles;
  bicepsRotation?: boolean;
}

export interface Superset {
  type: 'superset';
  id: string;
  rest: number;
  exercises: Exercise[];
}

export type WorkoutExercise = Exercise | Superset;

// Type guards
export function isSuperset(exercise: WorkoutExercise): exercise is Superset {
  return (exercise as Superset).type === 'superset';
}

export function isExercise(exercise: WorkoutExercise): exercise is Exercise {
  return !isSuperset(exercise);
}

export interface Workout {
  name: string;
  exercises: WorkoutExercise[];
}

export interface HomeWorkout extends Exercise {}

// Types pour les blocs
export interface Technique {
  name: string;
  desc: string;
}

export interface Block {
  id: number;
  name: string;
  weeks: number[];
  technique: Technique;
}

// Types pour les stats
export interface Projection {
  id: string;
  name: string;
  start: number;
  end: number;
}

export interface WeeklyVolumeStat {
  muscle: string;
  series: number;
  optimal: [number, number];
}

export interface Stats {
  projections: Projection[];
  weeklyVolume: WeeklyVolumeStat[];
}

// Type pour les données du programme
export interface ProgramData {
  blocks: Block[];
  deloadWeeks: number[];
  workouts: {
    dimanche: Workout;
    mardi: Workout;
    vendredi: Workout;
  };
  homeWorkouts: {
    mardi?: HomeWorkout;
    jeudi?: HomeWorkout;
  };
  stats: Stats;
}

// Types pour l'historique
export interface Set {
  id: number;
  weight: number | string;
  reps: number | string;
  rir: number | string;
  completed: boolean;
  isBonus?: boolean;
}

export interface CompletedExercise extends Omit<Exercise, 'sets'> {
  sets: Set[];
}

export interface CompletedSuperset extends Omit<Superset, 'exercises'> {
  exercises: CompletedExercise[];
}

export type CompletedWorkoutExercise = CompletedExercise | CompletedSuperset;

export interface WorkoutHistoryEntry {
  date: string;
  week: number;
  day: string;
  isHomeWorkout?: boolean;
  exercises: CompletedWorkoutExercise[];
}

export interface WorkoutHistory {
  [date: string]: WorkoutHistoryEntry;
}

export interface UserProgress {
  currentWeek: number;
  completedWorkouts: string[];
  exerciseWeights: { [exerciseId: string]: number };
  notes: { [workoutId: string]: string };
}

export interface ExercisePR {
  weight: number;
  reps: number;
}

// Types pour les vues
export type ViewType = 'stats' | 'program';

export interface ActiveWorkout {
  workout: Workout;
  meta: {
    week: number;
    day: string;
    isHomeWorkout: boolean;
  };
  startTime: number;
}
