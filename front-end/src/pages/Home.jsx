import { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

// components 
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

    const { workouts, dispatch } = useWorkoutContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
        const response = await fetch('/api/workouts');

            if(response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: await response.json()});
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {/*map over the workouts array and for each workout, return a paragraph with the title*/}
                {workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))
                }
            </div>
            <WorkoutForm />
        </div>
    );
    };

export default Home;