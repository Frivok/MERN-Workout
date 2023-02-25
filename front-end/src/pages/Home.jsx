import { useEffect, useState } from "react";

// components 
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

    // create a state to store the workouts
    const [workouts, setWorkouts] = useState([]);
    
    // fire off a function once (once is defined by the brackets) when the component loads
    useEffect(() => {
        const fetchWorkouts = async () => {
        const response = await fetch('/api/workouts');

            if(response.ok) {
            const data = await response.json();
            setWorkouts(data);
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
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
    };

export default Home;