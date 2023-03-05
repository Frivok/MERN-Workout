import {createContext, useReducer} from "react";

export const WorkoutContext = createContext([]);

export const WorkoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      }
    case 'ADD_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        //filter out the workout that matches the id of the deleted workout
        workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
      }
    default:
      return state;
  }
}

export const WorkoutsContextProvider = ({children}) => {

  //useReducer is a hook that takes a reducer function and an initial state as arguments
  //and returns the current state paired with a dispatch method.
  const [state, dispatch] = useReducer(WorkoutsReducer, {
    workouts: []
  });

  return (
    <WorkoutContext.Provider value={{...state, dispatch}}>
      {children}
    </WorkoutContext.Provider>
  );
}