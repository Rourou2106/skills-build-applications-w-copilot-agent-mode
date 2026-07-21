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

  if (payload && Array.isArray(payload.teams)) {
    return payload.teams;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        setTeams(normalizeItems(payload));
      } catch (err) {
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team, index) => (
            <div className="col-md-6" key={team._id || team.id || `${team.name}-${index}`}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h6 mb-1">{team.name || 'Unnamed team'}</h3>
                  <p className="mb-1"><strong>Sport:</strong> {team.sport || '—'}</p>
                  <p className="mb-1"><strong>Goal:</strong> {team.goal || '—'}</p>
                  <p className="mb-0"><strong>Members:</strong> {team.members?.length || team.memberCount || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
