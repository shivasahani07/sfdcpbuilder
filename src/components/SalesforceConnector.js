import React, { useState, useEffect } from 'react';
import './SalesforceConnector.css';

const SalesforceConnector = ({ onConnectionEstablished, onDeploy }) => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [orgInfo, setOrgInfo] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  // Initialize Salesforce JS SDK
  useEffect(() => {
    const initializeSalesforceSDK = () => {
      // Check if Salesforce SDK is available
      if (typeof window !== 'undefined' && window.sfdc) {
        console.log('Salesforce SDK loaded');
      } else {
        console.log('Salesforce SDK not available - using mock connection');
      }
    };

    initializeSalesforceSDK();
  }, []);

  const handleConnectToOrg = async () => {
    setIsConnecting(true);
    setConnectionError(null);

    try {
      // For demo purposes, we'll simulate a connection
      // In production, you would use Salesforce SDK or OAuth flow
      await simulateConnection();
    } catch (error) {
      setConnectionError(error.message);
      setConnectionStatus('error');
    } finally {
      setIsConnecting(false);
    }
  };

  const simulateConnection = async () => {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockOrgInfo = {
      orgId: '00D000000000000EAA',
      orgName: 'Demo Organization',
      orgType: 'Production',
      apiVersion: '58.0',
      instanceUrl: 'https://demo-instance.my.salesforce.com',
      userId: '005000000000000AAA',
      userName: 'admin@demo.com',
      permissions: {
        canCreateObjects: true,
        canCreateFields: true,
        canCreateFlows: true,
        canCreateValidationRules: true,
        canDeployMetadata: true
      }
    };

    setOrgInfo(mockOrgInfo);
    setConnectionStatus('connected');
    
    if (onConnectionEstablished) {
      onConnectionEstablished(mockOrgInfo);
    }
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
    setOrgInfo(null);
    setConnectionError(null);
  };

  const handleTestConnection = async () => {
    if (!orgInfo) return;

    try {
      // Simulate API call to test connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Connection test successful');
    } catch (error) {
      setConnectionError('Connection test failed: ' + error.message);
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return '✅';
      case 'connecting':
        return '🔄';
      case 'error':
        return '❌';
      default:
        return '🔌';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Connection Error';
      default:
        return 'Not Connected';
    }
  };

  return (
    <div className="salesforce-connector">
      <div className="connector-header">
        <h3>Salesforce Org Connection</h3>
        <div className={`connection-status ${connectionStatus}`}>
          <span className="status-icon">{getConnectionStatusIcon()}</span>
          <span className="status-text">{getConnectionStatusText()}</span>
        </div>
      </div>

      {connectionStatus === 'disconnected' && (
        <div className="connection-setup">
          <div className="connection-info">
            <p>Connect to your Salesforce org to deploy custom objects, fields, flows, and other metadata directly.</p>
            <div className="connection-methods">
              <div className="connection-method">
                <h4>OAuth Connection (Recommended)</h4>
                <p>Secure OAuth 2.0 flow for production orgs</p>
                <button 
                  className="connect-button oauth-button"
                  onClick={handleConnectToOrg}
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : 'Connect via OAuth'}
                </button>
              </div>
              
              <div className="connection-method">
                <h4>Username/Password (Sandbox)</h4>
                <p>For development and sandbox orgs</p>
                <button 
                  className="connect-button username-button"
                  onClick={handleConnectToOrg}
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : 'Connect via Username'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {connectionStatus === 'connecting' && (
        <div className="connection-loading">
          <div className="loading-spinner"></div>
          <p>Establishing connection to Salesforce org...</p>
        </div>
      )}

      {connectionStatus === 'error' && (
        <div className="connection-error">
          <div className="error-icon">⚠️</div>
          <h4>Connection Failed</h4>
          <p>{connectionError}</p>
          <button className="retry-button" onClick={handleConnectToOrg}>
            Retry Connection
          </button>
        </div>
      )}

      {connectionStatus === 'connected' && orgInfo && (
        <div className="connection-details">
          <div className="org-info">
            <h4>Connected Org Details</h4>
            <div className="org-details-grid">
              <div className="org-detail">
                <label>Organization Name:</label>
                <span>{orgInfo.orgName}</span>
              </div>
              <div className="org-detail">
                <label>Org Type:</label>
                <span>{orgInfo.orgType}</span>
              </div>
              <div className="org-detail">
                <label>API Version:</label>
                <span>{orgInfo.apiVersion}</span>
              </div>
              <div className="org-detail">
                <label>Instance URL:</label>
                <span>{orgInfo.instanceUrl}</span>
              </div>
              <div className="org-detail">
                <label>Connected User:</label>
                <span>{orgInfo.userName}</span>
              </div>
            </div>
          </div>

          <div className="permissions-info">
            <h4>Available Permissions</h4>
            <div className="permissions-grid">
              <div className={`permission ${orgInfo.permissions.canCreateObjects ? 'allowed' : 'denied'}`}>
                <span className="permission-icon">
                  {orgInfo.permissions.canCreateObjects ? '✅' : '❌'}
                </span>
                <span>Create Custom Objects</span>
              </div>
              <div className={`permission ${orgInfo.permissions.canCreateFields ? 'allowed' : 'denied'}`}>
                <span className="permission-icon">
                  {orgInfo.permissions.canCreateFields ? '✅' : '❌'}
                </span>
                <span>Create Custom Fields</span>
              </div>
              <div className={`permission ${orgInfo.permissions.canCreateFlows ? 'allowed' : 'denied'}`}>
                <span className="permission-icon">
                  {orgInfo.permissions.canCreateFlows ? '✅' : '❌'}
                </span>
                <span>Create Flows</span>
              </div>
              <div className={`permission ${orgInfo.permissions.canCreateValidationRules ? 'allowed' : 'denied'}`}>
                <span className="permission-icon">
                  {orgInfo.permissions.canCreateValidationRules ? '✅' : '❌'}
                </span>
                <span>Create Validation Rules</span>
              </div>
              <div className={`permission ${orgInfo.permissions.canDeployMetadata ? 'allowed' : 'denied'}`}>
                <span className="permission-icon">
                  {orgInfo.permissions.canDeployMetadata ? '✅' : '❌'}
                </span>
                <span>Deploy Metadata</span>
              </div>
            </div>
          </div>

          <div className="connection-actions">
            <button className="test-button" onClick={handleTestConnection}>
              Test Connection
            </button>
            <button className="disconnect-button" onClick={handleDisconnect}>
              Disconnect
            </button>
          </div>
        </div>
      )}

      {connectionStatus === 'connected' && (
        <div className="deployment-ready">
          <div className="deployment-info">
            <h4>🚀 Ready for Deployment</h4>
            <p>Your Salesforce org is connected and ready to receive custom objects, fields, flows, and other metadata.</p>
            <button 
              className="deploy-button"
              onClick={() => onDeploy && onDeploy(orgInfo)}
            >
              Start Deployment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesforceConnector;
