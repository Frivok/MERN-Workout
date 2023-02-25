import React, { useState } from 'react';

const WorkoutForm = () => {

    const [title, setTitle] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [sets, setSets] = useState('');
    const [weight, setWeight] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const workout = {title, repetitions, sets, weight};

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
        }

        if(response.ok) {
            setTitle('');
            setRepetitions('');
            setSets('');
            setWeight('');
            setError(null);
            console.log('new workout added', json);
        }
    }

    return (
        <form className="workout-form" onSubmit={handleSubmit}>
            <h2>Add a new workout</h2>
            <label>Workout title:</label>
            <input type="text" onChange={(event) => setTitle(event.target.value)} value={title}></input>

            <label>Weight (in kilos):</label>
            <input type="number" onChange={(event) => setWeight(event.target.value)} value={weight}></input>

            <label>Number of repetitions:</label>
            <input type="text" onChange={(event) => setRepetitions(event.target.value)} value={repetitions}></input>

            <label>Number of sets:</label>
            <input type="text" onChange={(event) => setSets(event.target.value)} value={sets}></input>

            <button>Add workout</button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}

export default WorkoutForm;