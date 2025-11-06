import { Exercise, UserProgress, Workout } from '../types';
import { BLOCKS, DIMANCHE_WORKOUT, MARDI_WORKOUT, VENDREDI_WORKOUT, PROGRAM_INFO } from '../constants';

class WorkoutService {
  private userProgress: UserProgress;

  constructor() {
    this.userProgress = this.loadProgress();
  }

  // Load user progress from localStorage
  private loadProgress(): UserProgress {
    const saved = localStorage.getItem('hybrid_master_progress');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      currentWeek: 1,
      completedWorkouts: [],
      exerciseWeights: {},
      notes: {}
    };
  }

  // Save user progress to localStorage
  saveProgress(): void {
    localStorage.setItem('hybrid_master_progress', JSON.stringify(this.userProgress));
  }

  // Get current week number
  getCurrentWeek(): number {
    return this.userProgress.currentWeek;
  }

  // Set current week
  setCurrentWeek(week: number): void {
    if (week >= 1 && week <= PROGRAM_INFO.duration) {
      this.userProgress.currentWeek = week;
      this.saveProgress();
    }
  }

  // Get current block based on week
  getCurrentBlock(): number {
    const week = this.userProgress.currentWeek;
    
    for (const block of BLOCKS) {
      if (block.weeks.includes(week)) {
        return block.id;
      }
    }
    
    // Deload weeks (6, 12, 18, 24, 26)
    if (PROGRAM_INFO.deloadWeeks.includes(week)) {
      // Return the block that precedes this deload
      for (const block of BLOCKS) {
        if (block.weeks.some(w => w < week)) {
          return block.id;
        }
      }
    }
    
    return 1;
  }

  // Check if current week is a deload week
  isDeloadWeek(week?: number): boolean {
    const checkWeek = week ?? this.userProgress.currentWeek;
    return PROGRAM_INFO.deloadWeeks.includes(checkWeek);
  }

  // Get workout for a specific day
  getWorkoutForDay(day: string): Workout | null {
    switch (day.toLowerCase()) {
      case 'dimanche':
        return DIMANCHE_WORKOUT;
      case 'mardi':
        return MARDI_WORKOUT;
      case 'vendredi':
        return VENDREDI_WORKOUT;
      default:
        return null;
    }
  }

  // Get all workouts for current week
  getWeekWorkouts(): Workout[] {
    return [DIMANCHE_WORKOUT, MARDI_WORKOUT, VENDREDI_WORKOUT];
  }

  // Calculate exercise weight with progression
  calculateExerciseWeight(exercise: Exercise): number {
    const week = this.userProgress.currentWeek;
    
    // Check if user has a custom weight for this exercise
    if (this.userProgress.exerciseWeights[exercise.id]) {
      return this.userProgress.exerciseWeights[exercise.id];
    }

    // Calculate based on progression
    const weeksElapsed = week - 1;
    const incrementsApplied = Math.floor(weeksElapsed / exercise.progression.frequency);
    const weight = exercise.startWeight + (incrementsApplied * exercise.progression.increment);

    // Apply deload if current week is deload (-40%)
    if (this.isDeloadWeek()) {
      return Math.round(weight * 0.6 * 10) / 10; // Round to 1 decimal
    }

    return weight;
  }

  // Set custom weight for an exercise
  setExerciseWeight(exerciseId: string, weight: number): void {
    this.userProgress.exerciseWeights[exerciseId] = weight;
    this.saveProgress();
  }

  // Mark workout as completed
  completeWorkout(day: string): void {
    const workoutId = `week${this.userProgress.currentWeek}_${day}`;
    if (!this.userProgress.completedWorkouts.includes(workoutId)) {
      this.userProgress.completedWorkouts.push(workoutId);
      this.saveProgress();
    }
  }

  // Check if workout is completed
  isWorkoutCompleted(day: string, week?: number): boolean {
    const checkWeek = week ?? this.userProgress.currentWeek;
    const workoutId = `week${checkWeek}_${day}`;
    return this.userProgress.completedWorkouts.includes(workoutId);
  }

  // Add note to workout
  addWorkoutNote(day: string, note: string): void {
    const workoutId = `week${this.userProgress.currentWeek}_${day}`;
    this.userProgress.notes[workoutId] = note;
    this.saveProgress();
  }

  // Get workout note
  getWorkoutNote(day: string, week?: number): string {
    const checkWeek = week ?? this.userProgress.currentWeek;
    const workoutId = `week${checkWeek}_${day}`;
    return this.userProgress.notes[workoutId] || '';
  }

  // Get block technique info
  getBlockTechnique() {
    const blockId = this.getCurrentBlock();
    const block = BLOCKS.find(b => b.id === blockId);
    return block?.technique || null;
  }

  // Get week completion percentage
  getWeekCompletion(week?: number): number {
    const checkWeek = week ?? this.userProgress.currentWeek;
    const totalWorkouts = 3; // 3 workouts per week
    let completed = 0;

    ['dimanche', 'mardi', 'vendredi'].forEach(day => {
      if (this.isWorkoutCompleted(day, checkWeek)) {
        completed++;
      }
    });

    return Math.round((completed / totalWorkouts) * 100);
  }

  // Get overall program completion
  getProgramCompletion(): number {
    let totalCompleted = 0;
    const totalWorkouts = PROGRAM_INFO.duration * 3;

    for (let week = 1; week <= PROGRAM_INFO.duration; week++) {
      ['dimanche', 'mardi', 'vendredi'].forEach(day => {
        if (this.isWorkoutCompleted(day, week)) {
          totalCompleted++;
        }
      });
    }

    return Math.round((totalCompleted / totalWorkouts) * 100);
  }

  // Reset all progress
  resetProgress(): void {
    this.userProgress = {
      currentWeek: 1,
      completedWorkouts: [],
      exerciseWeights: {},
      notes: {}
    };
    this.saveProgress();
  }

  // Export progress as JSON
  exportProgress(): string {
    return JSON.stringify(this.userProgress, null, 2);
  }

  // Import progress from JSON
  importProgress(jsonData: string): boolean {
    try {
      const imported = JSON.parse(jsonData);
      if (imported.currentWeek && imported.completedWorkouts && imported.exerciseWeights) {
        this.userProgress = imported;
        this.saveProgress();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import progress:', error);
      return false;
    }
  }
}

export default new WorkoutService();