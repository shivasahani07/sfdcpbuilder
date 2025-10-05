import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import ModuleDisplay from './components/ModuleDisplay';
import './App.css';

function App() {
  const [selectionData, setSelectionData] = useState(null);

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
        <h1>Salesforce Implementation Advisor</h1>
        <p>Get customized module recommendations based on your business needs</p>
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
    </div>
  );
}

export default App;