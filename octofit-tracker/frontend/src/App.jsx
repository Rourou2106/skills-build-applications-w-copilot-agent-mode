import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function HomePage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness application for tracking workouts, teams, and progress.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <span className="badge bg-primary rounded-pill">React 19</span>
                <span className="badge bg-success rounded-pill">Vite</span>
                <span className="badge bg-info rounded-pill">Express + TypeScript</span>
                <span className="badge bg-secondary rounded-pill">MongoDB + Mongoose</span>
              </div>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
