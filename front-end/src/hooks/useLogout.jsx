import { useAuthContext } from './useAuthContext';
import { useWorkoutContext } from './useWorkoutContext';

export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch: dispatchWorkout } = useWorkoutContext();

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user');

        // remove user from context
        dispatch({ type: 'LOGOUT' });
        dispatchWorkout({type: 'SET_WORKOUTS', payload: null})
    }

    return { logout };
}