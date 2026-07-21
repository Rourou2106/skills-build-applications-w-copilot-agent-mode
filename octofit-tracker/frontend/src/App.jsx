import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function HomePage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness application for tracking workouts, teams, and progress.
              </p>
              <p className="text-muted small mb-4">
                Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the Codespaces API URL. If it is unset, the app falls back to <code>http://localhost:8000</code>.
              </p>
              <p className="text-muted small mb-4">
                Current API base: <code>{apiBaseUrl}</code>
              </p>
              <div className="d-flex gap-3 flex-wrap mb-4">
                <span className="badge bg-primary rounded-pill">React 19</span>
                <span className="badge bg-success rounded-pill">Vite</span>
                <span className="badge bg-info rounded-pill">Express + TypeScript</span>
                <span className="badge bg-secondary rounded-pill">MongoDB + Mongoose</span>
              </div>
              <nav className="nav flex-wrap gap-2">
                <NavLink className="btn btn-outline-primary" to="/users">Users</NavLink>
                <NavLink className="btn btn-outline-primary" to="/teams">Teams</NavLink>
                <NavLink className="btn btn-outline-primary" to="/activities">Activities</NavLink>
                <NavLink className="btn btn-outline-primary" to="/leaderboard">Leaderboard</NavLink>
                <NavLink className="btn btn-outline-primary" to="/workouts">Workouts</NavLink>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
