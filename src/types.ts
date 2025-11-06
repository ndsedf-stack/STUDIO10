export type Day = 'dimanche' | 'mardi' | 'jeudi' | 'vendredi';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string | number;
  rest: number;
  startWeight: number;
  progression: {
    increment: number;
    frequency: number; // every N weeks
  };
  notes?: string;
  isSuperset?: boolean;
  supersetWith?: string;
}

export interface Workout {
  name: string;
  day: Day;
  exercises: Exercise[];
  totalSets: number;
  duration: number;
}

export interface Week {
  weekNumber: number;
  block: number;
  isDeload: boolean;
  workouts: {
    [key in Day]?: Workout;
  };
}

export interface Block {
  id: number;
  name: string;
  weeks: number[];
  technique: {
    name: string;
    description: string;
  };
}

export interface Program {
  name: string;
  totalWeeks: number;
  sessionsPerWeek: number;
  blocks: Block[];
}

export interface UserProgress {
  currentWeek: number;
  completedWorkouts: string[];
  exerciseWeights: {
    [exerciseId: string]: number;
  };
  notes: {
    [workoutId: string]: string;
  };
}
