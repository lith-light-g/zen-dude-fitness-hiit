import { v4 } from 'uuid';

const defaultUuid = v4();

export const defaultState = {
  selected: defaultUuid,
  routines: {
    [defaultUuid]: {
      name: 'Week 1 Day 1',
      exercises: ['jumpRopeRegular', 'highKnees', 'buttKicks', 'feetFrontToBack', 'starJumps'],
      restTime: 10000,
      exerciseTime: 5000,
      setRestTime: 60000,
    },
  },
  restTime: 10000,
  exerciseTime: 30000,
  setRestTime: 60000,
  setRepetitions: 5,
  overrideRestTime: false,
  overrideExerciseTime: false,
  overrideSetRestTime: false,
};

export const SET_SETTINGS = 'SET_SETTINGS';

export const setSettings = settings => ({
  type: SET_SETTINGS,
  settings,
});

export default (state = defaultState, { type, ...action }) => {
  switch (type) {
    case SET_SETTINGS:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
};
