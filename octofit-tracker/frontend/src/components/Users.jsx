import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.users ?? payload.results ?? [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {users.map((user, index) => (
            <div className="col-md-6" key={user._id || user.id || `${user.name}-${index}`}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h6 mb-1">{user.name || 'Unnamed user'}</h3>
                  <p className="mb-1"><strong>Email:</strong> {user.email || '—'}</p>
                  <p className="mb-1"><strong>Role:</strong> {user.role || '—'}</p>
                  <p className="mb-0"><strong>Goal:</strong> {user.fitnessGoal || user.goal || '—'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
