import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.activities ?? payload.results ?? [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {activities.map((activity, index) => (
            <div className="col-md-6" key={activity._id || activity.id || `${activity.type}-${index}`}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h6 mb-1">{activity.type || 'Activity'}</h3>
                  <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes || activity.duration || '—'} min</p>
                  <p className="mb-1"><strong>Calories:</strong> {activity.calories || '—'}</p>
                  <p className="mb-0"><strong>Date:</strong> {activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
