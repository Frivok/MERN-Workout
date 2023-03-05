import {useEffect} from "react";
import {useWorkoutContext} from "../hooks/useWorkoutContext";
import {useAuthContext} from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import ImageUpload from "../components/ImageUpload";

const Home = () => {

  const {workouts, dispatch} = useWorkoutContext();
  const {user} = useAuthContext();

  useEffect(() => {

    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts/profile', {
        headers: {
          'Authorization': "Bearer " + user.token,
        }
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: data});
      }
    };

    if (user) {
      fetchWorkouts().then(() => {
        console.log("Workouts fetched");
      });
    }
  }, []);

  return (
    <>
      <div className="home">
        <div className="workouts">
          {/*map over the workouts array and for each workout, return a paragraph with the title*/}
          {workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout}/>
          ))}
        </div>
        <ImageUpload/>
      </div>
    </>
  );
};

export default Home;