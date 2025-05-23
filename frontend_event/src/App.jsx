import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import EventForm from './pages/EventForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event/new" element={<EventForm />} />
          <Route path="/event/:id/edit" element={<EventForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
