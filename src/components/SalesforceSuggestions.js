import React, { useState } from 'react';
import './SalesforceSuggestions.css';
import SalesforceConnector from './SalesforceConnector';
import DeploymentManager from './DeploymentManager';

const SalesforceSuggestions = ({ selectionData, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('objects');
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [orgInfo, setOrgInfo] = useState(null);
  const [showDeployment, setShowDeployment] = useState(false);

  if (!selectionData) return null;

  const { domain, industry, modules } = selectionData;

  // Simulate AI-powered suggestions
  const generateAISuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const suggestions = {
      recommendedObjects: [
        'Account',
        'Contact',
        'Lead',
        'Opportunity',
        'Case',
        'Product2',
        'PricebookEntry',
        'Quote',
        'Contract',
        'Campaign'
      ],
      customObjects: [
        {
          name: `${industry}_Project__c`,
          description: `Track ${industry.toLowerCase()} projects and deliverables`,
          fields: ['Project_Name__c', 'Start_Date__c', 'End_Date__c', 'Status__c', 'Budget__c']
        },
        {
          name: `${industry}_Compliance__c`,
          description: `Manage ${industry.toLowerCase()} compliance requirements`,
          fields: ['Compliance_Type__c', 'Due_Date__c', 'Status__c', 'Approved_By__c', 'Notes__c']
        }
      ],
      automationRecommendations: [
        {
          type: 'Process Builder',
          name: `${industry} Lead Assignment`,
          description: 'Automatically assign leads based on industry and geography',
          trigger: 'Lead creation or update',
          actions: ['Update Lead Owner', 'Send Email Notification', 'Create Task']
        },
        {
          type: 'Flow',
          name: `${industry} Opportunity Management`,
          description: 'Streamline opportunity management for industry-specific requirements',
          trigger: 'Opportunity stage change',
          actions: ['Update Account Fields', 'Create Follow-up Tasks', 'Send Approval Request']
        },
        {
          type: 'Workflow Rules',
          name: `${industry} Case Escalation`,
          description: 'Automatically escalate cases based on priority and industry',
          trigger: 'Case creation or update',
          actions: ['Send Email Alert', 'Update Case Owner', 'Create Escalation Task']
        }
      ],
      integrationRecommendations: [
        {
          name: `${industry} ERP Integration`,
          description: 'Integrate with existing ERP system for data synchronization',
          type: 'REST API',
          objects: ['Account', 'Product2', 'Order'],
          frequency: 'Real-time'
        },
        {
          name: `${industry} Marketing Automation`,
          description: 'Connect with marketing automation platform',
          type: 'Webhook',
          objects: ['Lead', 'Campaign', 'CampaignMember'],
          frequency: 'Real-time'
        }
      ],
      bestPractices: [
        `Implement data governance policies specific to ${industry} compliance requirements`,
        `Set up field-level security for sensitive ${industry} data`,
        `Create validation rules for ${industry}-specific business processes`,
        `Establish naming conventions for ${industry} custom objects and fields`,
        `Implement audit trail for ${industry} regulatory compliance`
      ]
    };
    
    setAiSuggestions(suggestions);
    setIsGenerating(false);
  };

  const allSalesforceObjects = modules.reduce((acc, module) => {
    if (module.salesforceObjects) {
      acc.push(...module.salesforceObjects);
    }
    return acc;
  }, []);

  const uniqueObjects = [...new Set(allSalesforceObjects)];

  const allAutomations = modules.reduce((acc, module) => {
    if (module.automations) {
      acc.push(...module.automations);
    }
    return acc;
  }, []);

  const uniqueAutomations = [...new Set(allAutomations)];

  return (
    <div className="salesforce-suggestions-overlay">
      <div className="salesforce-suggestions-modal">
        <div className="modal-header">
          <h2>Salesforce Implementation Suggestions</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab ${selectedTab === 'objects' ? 'active' : ''}`}
            onClick={() => setSelectedTab('objects')}
          >
            Data Objects
          </button>
          <button 
            className={`tab ${selectedTab === 'automations' ? 'active' : ''}`}
            onClick={() => setSelectedTab('automations')}
          >
            Automations
          </button>
          <button 
            className={`tab ${selectedTab === 'ai' ? 'active' : ''}`}
            onClick={() => setSelectedTab('ai')}
          >
            AI Suggestions
          </button>
          <button 
            className={`tab ${selectedTab === 'deploy' ? 'active' : ''}`}
            onClick={() => setSelectedTab('deploy')}
          >
            Deploy
          </button>
        </div>

        <div className="modal-content">
          {selectedTab === 'objects' && (
            <div className="objects-section">
              <h3>Salesforce Objects for {industry} {domain}</h3>
              <div className="objects-grid">
                {uniqueObjects.map((object, index) => (
                  <div key={index} className="object-card">
                    <h4>{object}</h4>
                    <p>Standard/Custom Salesforce object</p>
                    <div className="object-usage">
                      Used in: {modules.filter(m => m.salesforceObjects?.includes(object)).map(m => m.name).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="custom-objects-section">
                <h4>Recommended Custom Objects</h4>
                <div className="custom-objects-list">
                  <div className="custom-object-card">
                    <h5>{industry}_Project__c</h5>
                    <p>Track {industry.toLowerCase()} specific projects and deliverables</p>
                    <ul>
                      <li>Project_Name__c (Text)</li>
                      <li>Start_Date__c (Date)</li>
                      <li>End_Date__c (Date)</li>
                      <li>Status__c (Picklist)</li>
                      <li>Budget__c (Currency)</li>
                    </ul>
                  </div>
                  
                  <div className="custom-object-card">
                    <h5>{industry}_Compliance__c</h5>
                    <p>Manage {industry.toLowerCase()} compliance and regulatory requirements</p>
                    <ul>
                      <li>Compliance_Type__c (Picklist)</li>
                      <li>Due_Date__c (Date)</li>
                      <li>Status__c (Picklist)</li>
                      <li>Approved_By__c (Lookup to User)</li>
                      <li>Notes__c (Long Text)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'automations' && (
            <div className="automations-section">
              <h3>Automation Recommendations</h3>
              <div className="automations-grid">
                {uniqueAutomations.map((automation, index) => (
                  <div key={index} className="automation-card">
                    <h4>{automation}</h4>
                    <div className="automation-usage">
                      Used in: {modules.filter(m => m.automations?.includes(automation)).map(m => m.name).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="automation-examples">
                <h4>Implementation Examples</h4>
                <div className="automation-example">
                  <h5>Lead Assignment Rules</h5>
                  <p>Automatically assign leads based on industry and geography</p>
                  <div className="automation-steps">
                    <div className="step">1. Create Lead Assignment Rules</div>
                    <div className="step">2. Define criteria (Industry, Geography, Company Size)</div>
                    <div className="step">3. Set assignment logic (Round Robin, Territory-based)</div>
                    <div className="step">4. Test and activate rules</div>
                  </div>
                </div>
                
                <div className="automation-example">
                  <h5>Case Escalation Workflow</h5>
                  <p>Automatically escalate cases based on priority and SLA</p>
                  <div className="automation-steps">
                    <div className="step">1. Create Escalation Rules</div>
                    <div className="step">2. Define escalation criteria (Priority, Age, Customer Type)</div>
                    <div className="step">3. Set escalation actions (Email, Task, Field Updates)</div>
                    <div className="step">4. Configure time-based triggers</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'ai' && (
            <div className="ai-suggestions-section">
              <div className="ai-header">
                <h3>AI-Powered Implementation Recommendations</h3>
                <button 
                  className="generate-button"
                  onClick={generateAISuggestions}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate AI Suggestions'}
                </button>
              </div>

              {aiSuggestions && (
                <div className="ai-content">
                  <div className="ai-section">
                    <h4>Recommended Custom Objects</h4>
                    <div className="ai-objects">
                      {aiSuggestions.customObjects.map((obj, index) => (
                        <div key={index} className="ai-object-card">
                          <h5>{obj.name}</h5>
                          <p>{obj.description}</p>
                          <div className="object-fields">
                            <strong>Fields:</strong>
                            <ul>
                              {obj.fields.map((field, fieldIndex) => (
                                <li key={fieldIndex}>{field}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ai-section">
                    <h4>Automation Workflows</h4>
                    <div className="ai-automations">
                      {aiSuggestions.automationRecommendations.map((auto, index) => (
                        <div key={index} className="ai-automation-card">
                          <div className="automation-header">
                            <h5>{auto.name}</h5>
                            <span className="automation-type">{auto.type}</span>
                          </div>
                          <p>{auto.description}</p>
                          <div className="automation-details">
                            <div><strong>Trigger:</strong> {auto.trigger}</div>
                            <div><strong>Actions:</strong> {auto.actions.join(', ')}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ai-section">
                    <h4>Integration Recommendations</h4>
                    <div className="ai-integrations">
                      {aiSuggestions.integrationRecommendations.map((integration, index) => (
                        <div key={index} className="ai-integration-card">
                          <h5>{integration.name}</h5>
                          <p>{integration.description}</p>
                          <div className="integration-details">
                            <div><strong>Type:</strong> {integration.type}</div>
                            <div><strong>Objects:</strong> {integration.objects.join(', ')}</div>
                            <div><strong>Frequency:</strong> {integration.frequency}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ai-section">
                    <h4>Best Practices</h4>
                    <ul className="best-practices-list">
                      {aiSuggestions.bestPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'deploy' && (
            <div className="deploy-section">
              <h3>Deploy to Salesforce</h3>
              <p>Connect to your Salesforce org and deploy the suggested objects, fields, flows, and other metadata.</p>
              
              <SalesforceConnector 
                onConnectionEstablished={setOrgInfo}
                onDeploy={() => setShowDeployment(true)}
              />
              
              {orgInfo && (
                <div className="deployment-ready-info">
                  <h4>🚀 Ready for Deployment</h4>
                  <p>Your Salesforce org is connected. You can now deploy custom objects, fields, flows, validation rules, and permission sets.</p>
                  <button 
                    className="start-deployment-button"
                    onClick={() => setShowDeployment(true)}
                  >
                    Start Deployment
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="export-button" onClick={() => console.log('Export suggestions')}>
            Export to PDF
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      
      {showDeployment && orgInfo && (
        <DeploymentManager
          selectionData={selectionData}
          orgInfo={orgInfo}
          onClose={() => setShowDeployment(false)}
        />
      )}
    </div>
  );
};

export default SalesforceSuggestions;
