import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import Customers from './pages/Customers';

function App() {
  return (
    <div className="flex">
      <Router>
        <Sidebar />
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
