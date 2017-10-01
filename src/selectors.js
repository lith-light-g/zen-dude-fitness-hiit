import routineDefinitions from './modules/routines';

export const getSettings = state => state.settings;

export const getSelectedSettings = ({
  routines,
  selected,
  overrideExerciseTime,
  overrideRestTime,
  overrideSetRestTime,
  restTime,
  exerciseTime,
  setRestTime,
  repetitions,
}) => {
  const selectedRoutine = routines[selected].exercises.map(id => routineDefinitions[id]);
  return {
    set: selectedRoutine,
    restTime: overrideRestTime ? restTime : selectedRoutine.restTime,
    exerciseTime: overrideExerciseTime ? exerciseTime : selectedRoutine.exerciseTime,
    setRestTime: overrideSetRestTime ? setRestTime : selectedRoutine.setRestTime,
    repetitions,
  };
};
