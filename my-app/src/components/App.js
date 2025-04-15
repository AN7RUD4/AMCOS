import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import QuotationGenerator from './QuotationGenerator';
import WorkerManagement from './WorkerManagement';
import ProjectManagement from './ProjectManagement';
import ClientManagement from './ClientManagement';
import MaterialsCalculator from './MaterialsCalculator';
import Reports from './Reports';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>AMCOS</h1>
          <p>Arabian Mechanical Construction Company</p>
        </header>
        
        <nav className="sidebar">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''}>
              <Link to="/" onClick={() => setActiveTab('dashboard')}>
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </li>
            <li className={activeTab === 'quotation' ? 'active' : ''}>
              <Link to="/quotation" onClick={() => setActiveTab('quotation')}>
                <i className="fas fa-file-invoice-dollar"></i> Quotation Generator
              </Link>
            </li>
            <li className={activeTab === 'workers' ? 'active' : ''}>
              <Link to="/workers" onClick={() => setActiveTab('workers')}>
                <i className="fas fa-hard-hat"></i> Worker Management
              </Link>
            </li>
            <li className={activeTab === 'projects' ? 'active' : ''}>
              <Link to="/projects" onClick={() => setActiveTab('projects')}>
                <i className="fas fa-building"></i> Project Management
              </Link>
            </li>
            <li className={activeTab === 'clients' ? 'active' : ''}>
              <Link to="/clients" onClick={() => setActiveTab('clients')}>
                <i className="fas fa-users"></i> Client Management
              </Link>
            </li>
            <li className={activeTab === 'materials' ? 'active' : ''}>
              <Link to="/materials" onClick={() => setActiveTab('materials')}>
                <i className="fas fa-calculator"></i> Materials Calculator
              </Link>
            </li>
            <li className={activeTab === 'reports' ? 'active' : ''}>
              <Link to="/reports" onClick={() => setActiveTab('reports')}>
                <i className="fas fa-chart-bar"></i> Reports
              </Link>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quotation" element={<QuotationGenerator />} />
            <Route path="/workers" element={<WorkerManagement />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/clients" element={<ClientManagement />} />
            <Route path="/materials" element={<MaterialsCalculator />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;