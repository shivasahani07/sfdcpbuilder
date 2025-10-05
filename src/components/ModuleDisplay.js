import React, { useState } from 'react';
import './ModuleDisplay.css';
import SalesforceSuggestions from './SalesforceSuggestions';

const ModuleDisplay = ({ selectionData }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  if (!selectionData) {
    return <div className="module-display">Please complete the questionnaire to see recommendations.</div>;
  }

  const { domain, industry, modules } = selectionData;

  return (
    <div className="module-display">
      <h2>Implementation Plan for {industry} {domain}</h2>
      
      <div className="summary-card">
        <h3>Project Summary</h3>
        <p><strong>Domain:</strong> {domain}</p>
        <p><strong>Industry:</strong> {industry}</p>
        <p><strong>Recommended Modules:</strong> {modules.length}</p>
      </div>

      <div className="modules-list">
        <h3>Selected Modules</h3>
        {modules.map((module, index) => (
          <div key={module.name} className="module-detail-card">
            <div className="module-header">
              <h4>{module.name}</h4>
              <span className={`complexity complexity-${module.complexity.toLowerCase()}`}>
                {module.complexity}
              </span>
            </div>
            <p className="module-description">{module.description}</p>
             <div className="features-section">
               <h5>Key Features:</h5>
               <div className="features-grid">
                 {module.features.map((feature, featureIndex) => (
                   <span key={featureIndex} className="feature-tag">
                     {feature}
                   </span>
                 ))}
               </div>
             </div>
             
             {module.salesforceObjects && (
               <div className="salesforce-objects-section">
                 <h5>Salesforce Objects:</h5>
                 <div className="objects-grid">
                   {module.salesforceObjects.map((object, objIndex) => (
                     <span key={objIndex} className="object-tag">
                       {object}
                     </span>
                   ))}
                 </div>
               </div>
             )}
             
             {module.automations && (
               <div className="automations-section">
                 <h5>Automations:</h5>
                 <div className="automations-grid">
                   {module.automations.map((automation, autoIndex) => (
                     <span key={autoIndex} className="automation-tag">
                       {automation}
                     </span>
                   ))}
                 </div>
               </div>
             )}
            <div className="implementation-tips">
              <h5>Implementation Tips:</h5>
              <ul>
                <li>Estimated timeline: {module.complexity === 'High' ? '4-6 weeks' : module.complexity === 'Medium' ? '2-4 weeks' : '1-2 weeks'}</li>
                <li>Recommended team size: {module.complexity === 'High' ? '3-4 people' : '1-2 people'}</li>
                <li>Consider integration with existing systems</li>
              </ul>
            </div>
          </div>
        ))}
      </div>

       <div className="export-section">
         <button className="export-button" onClick={() => setShowSuggestions(true)}>
           View Salesforce Suggestions
         </button>
         <button className="export-button" onClick={() => console.log('Exporting:', selectionData)}>
           Export to JSON
         </button>
         <button className="export-button" onClick={() => window.print()}>
           Print Recommendations
         </button>
       </div>
       
       {showSuggestions && (
         <SalesforceSuggestions
           selectionData={selectionData}
           onClose={() => setShowSuggestions(false)}
         />
       )}
     </div>
   );
 };

export default ModuleDisplay;