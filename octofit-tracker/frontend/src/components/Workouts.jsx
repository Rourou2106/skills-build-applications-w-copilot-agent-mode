import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.workouts)) {
    return payload.workouts;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const payload = await response.json();
        setWorkouts(normalizeItems(payload));
      } catch (err) {
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout, index) => (
            <div className="col-md-6" key={workout._id || workout.id || `${workout.name}-${index}`}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h6 mb-1">{workout.name || 'Workout'}</h3>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty || '—'}</p>
                  <p className="mb-1"><strong>Focus:</strong> {workout.focus || '—'}</p>
                  <p className="mb-0"><strong>Duration:</strong> {workout.durationMinutes || workout.duration || '—'} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
