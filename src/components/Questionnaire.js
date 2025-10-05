import React, { useState } from 'react';
import { domains, industries, getModulesForSelection } from '../data/modulesData';
import './Questionnaire.css';

const Questionnaire = ({ onModulesSelected }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedModules, setSelectedModules] = useState([]);

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setSelectedIndustry('');
    setSelectedModules([]);
    setCurrentStep(2);
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    setCurrentStep(3);
  };

  const handleModuleToggle = (module) => {
    setSelectedModules(prev => {
      const isSelected = prev.find(m => m.name === module.name);
      if (isSelected) {
        return prev.filter(m => m.name !== module.name);
      } else {
        return [...prev, module];
      }
    });
  };

  const handleSubmit = () => {
    onModulesSelected({
      domain: selectedDomain,
      industry: selectedIndustry,
      modules: selectedModules
    });
  };

  const resetSelections = () => {
    setSelectedDomain('');
    setSelectedIndustry('');
    setSelectedModules([]);
    setCurrentStep(1);
  };

  const availableModules = getModulesForSelection(selectedDomain, selectedIndustry);

  return (
    <div className="questionnaire">
      <div className="progress-bar">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Domain</div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Industry</div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Modules</div>
      </div>

      <div className="questionnaire-content">
        {currentStep === 1 && (
          <div className="step-content">
            <h2>Select Your Business Domain</h2>
            <div className="options-grid">
              {domains.map(domain => (
                <button
                  key={domain}
                  className="option-card"
                  onClick={() => handleDomainSelect(domain)}
                >
                  <h3>{domain}</h3>
                  <p>Click to select {domain} domain</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && selectedDomain && (
          <div className="step-content">
            <h2>Select Your Industry in {selectedDomain}</h2>
            <button className="back-button" onClick={() => setCurrentStep(1)}>
              ← Back to Domains
            </button>
            <div className="options-grid">
              {industries[selectedDomain]?.map(industry => (
                <button
                  key={industry}
                  className="option-card"
                  onClick={() => handleIndustrySelect(industry)}
                >
                  <h3>{industry}</h3>
                  <p>Select {industry} industry</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && selectedDomain && selectedIndustry && (
          <div className="step-content">
            <h2>Select Modules for {selectedIndustry} {selectedDomain}</h2>
            <button className="back-button" onClick={() => setCurrentStep(2)}>
              ← Back to Industries
            </button>
            
            <div className="modules-grid">
              {availableModules.map(module => (
                <div
                  key={module.name}
                  className={`module-card ${
                    selectedModules.find(m => m.name === module.name) ? 'selected' : ''
                  }`}
                  onClick={() => handleModuleToggle(module)}
                >
                  <h3>{module.name}</h3>
                  <p>{module.description}</p>
                  <div className="complexity-badge">{module.complexity} Complexity</div>
                  <div className="features">
                    <strong>Features:</strong>
                    <ul>
                      {module.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {availableModules.length > 0 && (
              <div className="selection-summary">
                <h3>Selected Modules: {selectedModules.length}</h3>
                <button 
                  className="submit-button" 
                  onClick={handleSubmit}
                  disabled={selectedModules.length === 0}
                >
                  Generate Implementation Plan
                </button>
              </div>
            )}

            {availableModules.length === 0 && (
              <div className="no-modules">
                <p>No modules available for {selectedIndustry} in {selectedDomain}.</p>
                <button className="back-button" onClick={resetSelections}>
                  Start Over
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;