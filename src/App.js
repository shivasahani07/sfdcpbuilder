import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import ModuleDisplay from './components/ModuleDisplay';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [selectionData, setSelectionData] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleModulesSelected = (data) => {
    setSelectionData(data);
    // In a real application, you would send this data to your backend
    console.log('Selected Modules Data:', data);
  };

  const handleReset = () => {
    setSelectionData(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Salesforce Implementation Advisor</h1>
            <p>Get customized module recommendations based on your business needs</p>
          </div>
          <button 
            className="admin-button"
            onClick={() => setShowAdminPanel(true)}
          >
            Admin Panel
          </button>
        </div>
      </header>

      <main className="app-main">
        {!selectionData ? (
          <Questionnaire onModulesSelected={handleModulesSelected} />
        ) : (
          <div>
            <button className="reset-button" onClick={handleReset}>
              Start New Questionnaire
            </button>
            <ModuleDisplay selectionData={selectionData} />
          </div>
        )}
      </main>

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
}

export default App;