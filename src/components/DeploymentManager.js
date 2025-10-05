import React, { useState } from 'react';
import SalesforceDeploymentService from '../services/SalesforceDeploymentService';
import './DeploymentManager.css';

const DeploymentManager = ({ selectionData, orgInfo, onClose }) => {
  const [deploymentStep, setDeploymentStep] = useState('preview');
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [deploymentStatus, setDeploymentStatus] = useState('idle');
  const [deploymentResults, setDeploymentResults] = useState(null);
  const [deploymentError, setDeploymentError] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState({
    customObjects: true,
    flows: true,
    validationRules: true,
    permissionSets: true
  });

  if (!selectionData || !orgInfo) {
    return null;
  }

  const { domain, industry, modules } = selectionData;
  const deploymentService = new SalesforceDeploymentService(orgInfo);

  const handleComponentToggle = (component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component]: !prev[component]
    }));
  };

  const handleDeploy = async () => {
    setDeploymentStep('deploying');
    setDeploymentStatus('in-progress');
    setDeploymentProgress(0);
    setDeploymentError(null);

    try {
      // Generate deployment package
      const deploymentPackage = deploymentService.generateDeploymentPackage(modules, industry);
      
      // Filter selected components
      const filteredPackage = filterSelectedComponents(deploymentPackage);
      
      // Simulate deployment progress
      await simulateDeploymentProgress();
      
      // Deploy metadata
      const result = await deploymentService.deployMetadata(filteredPackage.metadata);
      
      if (result.success) {
        setDeploymentResults(result);
        setDeploymentStatus('success');
        setDeploymentStep('results');
      } else {
        setDeploymentError(result.error);
        setDeploymentStatus('error');
        setDeploymentStep('error');
      }
    } catch (error) {
      setDeploymentError(error.message);
      setDeploymentStatus('error');
      setDeploymentStep('error');
    }
  };

  const simulateDeploymentProgress = async () => {
    const steps = [
      'Validating metadata...',
      'Creating custom objects...',
      'Creating custom fields...',
      'Creating flows...',
      'Creating validation rules...',
      'Creating permission sets...',
      'Deploying to org...',
      'Verifying deployment...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setDeploymentProgress((i + 1) / steps.length * 100);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const filterSelectedComponents = (deploymentPackage) => {
    const filtered = {
      packageManifest: deploymentPackage.packageManifest,
      metadata: []
    };

    if (selectedComponents.customObjects) {
      filtered.metadata.push(...deploymentPackage.metadata.filter(m => m.fullName.includes('__c')));
    }
    if (selectedComponents.flows) {
      filtered.metadata.push(...deploymentPackage.metadata.filter(m => m.processType));
    }
    if (selectedComponents.validationRules) {
      filtered.metadata.push(...deploymentPackage.metadata.filter(m => m.errorConditionFormula));
    }
    if (selectedComponents.permissionSets) {
      filtered.metadata.push(...deploymentPackage.metadata.filter(m => m.objectPermissions));
    }

    return filtered;
  };

  const handleExportXML = () => {
    const deploymentPackage = deploymentService.generateDeploymentPackage(modules, industry);
    const xmlData = deploymentService.exportMetadataAsXML(deploymentPackage);
    
    // Create downloadable files
    Object.keys(xmlData).forEach(key => {
      if (xmlData[key]) {
        const blob = new Blob([xmlData[key]], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${industry}_${domain}_${key}.xml`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
  };

  const renderPreviewStep = () => (
    <div className="deployment-preview">
      <h3>Deployment Preview</h3>
      <div className="deployment-summary">
        <div className="summary-card">
          <h4>Deployment Summary</h4>
          <div className="summary-details">
            <div className="summary-item">
              <span className="label">Organization:</span>
              <span className="value">{orgInfo.orgName}</span>
            </div>
            <div className="summary-item">
              <span className="label">Industry:</span>
              <span className="value">{industry}</span>
            </div>
            <div className="summary-item">
              <span className="label">Domain:</span>
              <span className="value">{domain}</span>
            </div>
            <div className="summary-item">
              <span className="label">Modules:</span>
              <span className="value">{modules.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="components-selection">
        <h4>Select Components to Deploy</h4>
        <div className="components-grid">
          <div className="component-option">
            <label className="component-checkbox">
              <input
                type="checkbox"
                checked={selectedComponents.customObjects}
                onChange={() => handleComponentToggle('customObjects')}
              />
              <span className="checkmark"></span>
              <div className="component-info">
                <h5>Custom Objects</h5>
                <p>Create custom objects for {modules.length} modules</p>
                <span className="component-count">{modules.length} objects</span>
              </div>
            </label>
          </div>

          <div className="component-option">
            <label className="component-checkbox">
              <input
                type="checkbox"
                checked={selectedComponents.flows}
                onChange={() => handleComponentToggle('flows')}
              />
              <span className="checkmark"></span>
              <div className="component-info">
                <h5>Flows</h5>
                <p>Create automated workflows for each module</p>
                <span className="component-count">{modules.length} flows</span>
              </div>
            </label>
          </div>

          <div className="component-option">
            <label className="component-checkbox">
              <input
                type="checkbox"
                checked={selectedComponents.validationRules}
                onChange={() => handleComponentToggle('validationRules')}
              />
              <span className="checkmark"></span>
              <div className="component-info">
                <h5>Validation Rules</h5>
                <p>Add data validation rules for business logic</p>
                <span className="component-count">{modules.length * 2} rules</span>
              </div>
            </label>
          </div>

          <div className="component-option">
            <label className="component-checkbox">
              <input
                type="checkbox"
                checked={selectedComponents.permissionSets}
                onChange={() => handleComponentToggle('permissionSets')}
              />
              <span className="checkmark"></span>
              <div className="component-info">
                <h5>Permission Sets</h5>
                <p>Create permission sets for access control</p>
                <span className="component-count">{modules.length} permission sets</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="deployment-actions">
        <button className="export-xml-button" onClick={handleExportXML}>
          Export as XML
        </button>
        <button className="deploy-button" onClick={handleDeploy}>
          Deploy to Salesforce
        </button>
      </div>
    </div>
  );

  const renderDeployingStep = () => (
    <div className="deployment-progress">
      <h3>Deploying to Salesforce</h3>
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${deploymentProgress}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {Math.round(deploymentProgress)}% Complete
        </div>
      </div>
      <div className="deployment-steps">
        <div className={`step ${deploymentProgress > 0 ? 'completed' : ''}`}>
          <span className="step-icon">✓</span>
          <span>Validating metadata</span>
        </div>
        <div className={`step ${deploymentProgress > 12.5 ? 'completed' : ''}`}>
          <span className="step-icon">✓</span>
          <span>Creating custom objects</span>
        </div>
        <div className={`step ${deploymentProgress > 25 ? 'completed' : ''}`}>
          <span className="step-icon">✓</span>
          <span>Creating custom fields</span>
        </div>
        <div className={`step ${deploymentProgress > 37.5 ? 'completed' : ''}`}>
          <span className="step-icon">✓</span>
          <span>Creating flows</span>
        </div>
        <div className={`step ${deploymentProgress > 50 ? 'completed' : ''}`}>
          <span className="step-icon">✓</span>
          <span>Creating validation rules</span>
        </div>
        <div className={`step ${deploymentProgress > 62.5 ? 'completed' : ''}`}>
          <span className="step-icon">✓</span>
          <span>Creating permission sets</span>
        </div>
        <div className={`step ${deploymentProgress > 75 ? 'completed' : ''}`}>
          <span className="step-icon">✓</span>
          <span>Deploying to org</span>
        </div>
        <div className={`step ${deploymentProgress > 87.5 ? 'completed' : ''}`}>
          <span className="step-icon">✓</span>
          <span>Verifying deployment</span>
        </div>
      </div>
    </div>
  );

  const renderResultsStep = () => (
    <div className="deployment-results">
      <div className="success-header">
        <div className="success-icon">🎉</div>
        <h3>Deployment Successful!</h3>
        <p>All metadata has been successfully deployed to your Salesforce org.</p>
      </div>

      <div className="results-details">
        <div className="result-card">
          <h4>Deployment Details</h4>
          <div className="result-item">
            <span className="label">Deployment ID:</span>
            <span className="value">{deploymentResults?.deploymentId}</span>
          </div>
          <div className="result-item">
            <span className="label">Status:</span>
            <span className="value success">{deploymentResults?.message}</span>
          </div>
          <div className="result-item">
            <span className="label">Components Deployed:</span>
            <span className="value">{deploymentResults?.results?.length || 0}</span>
          </div>
        </div>

        <div className="result-card">
          <h4>Deployed Components</h4>
          <div className="components-list">
            {deploymentResults?.results?.map((result, index) => (
              <div key={index} className="deployed-component">
                <span className="component-name">{result.fullName}</span>
                <span className="component-status success">✓ Deployed</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="post-deployment-actions">
        <button className="view-org-button" onClick={() => window.open(orgInfo.instanceUrl, '_blank')}>
          View in Salesforce
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );

  const renderErrorStep = () => (
    <div className="deployment-error">
      <div className="error-header">
        <div className="error-icon">❌</div>
        <h3>Deployment Failed</h3>
        <p>There was an error deploying the metadata to your Salesforce org.</p>
      </div>

      <div className="error-details">
        <div className="error-message">
          <h4>Error Details:</h4>
          <p>{deploymentError}</p>
        </div>

        <div className="error-actions">
          <button className="retry-button" onClick={handleDeploy}>
            Retry Deployment
          </button>
          <button className="export-xml-button" onClick={handleExportXML}>
            Export as XML
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="deployment-manager-overlay">
      <div className="deployment-manager-modal">
        <div className="modal-header">
          <h2>Deploy to Salesforce</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          {deploymentStep === 'preview' && renderPreviewStep()}
          {deploymentStep === 'deploying' && renderDeployingStep()}
          {deploymentStep === 'results' && renderResultsStep()}
          {deploymentStep === 'error' && renderErrorStep()}
        </div>
      </div>
    </div>
  );
};

export default DeploymentManager;
