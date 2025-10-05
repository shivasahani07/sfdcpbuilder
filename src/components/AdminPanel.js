import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('domains');
  const [domains, setDomains] = useState(['Sales', 'Service', 'Marketing', 'Commerce', 'Analytics', 'Platform', 'Integration']);
  const [industries, setIndustries] = useState({
    Sales: ['Technology', 'Healthcare', 'Financial Services', 'Manufacturing', 'Retail', 'Real Estate', 'Automotive', 'Pharmaceuticals'],
    Service: ['Technology', 'Healthcare', 'Financial Services', 'Telecommunications', 'Education', 'Government', 'Non-Profit', 'Utilities', 'Real Estate'],
    Marketing: ['Technology', 'E-commerce', 'Healthcare', 'Media & Entertainment', 'Hospitality', 'Travel & Tourism', 'Fashion', 'Food & Beverage', 'Real Estate'],
    Commerce: ['E-commerce', 'Retail', 'Manufacturing', 'Wholesale', 'Consumer Goods', 'Fashion', 'Electronics', 'Home & Garden', 'Real Estate'],
    Analytics: ['Technology', 'Financial Services', 'Healthcare', 'Manufacturing', 'Retail', 'Media & Entertainment', 'Government', 'Research', 'Real Estate'],
    Platform: ['Technology', 'Financial Services', 'Healthcare', 'Education', 'Government', 'Non-Profit', 'Consulting', 'Professional Services', 'Real Estate'],
    Integration: ['Technology', 'Manufacturing', 'Healthcare', 'Financial Services', 'Government', 'Education', 'Utilities', 'Transportation', 'Real Estate']
  });
  const [modules, setModules] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState('');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDomains = localStorage.getItem('admin_domains');
    const savedIndustries = localStorage.getItem('admin_industries');
    const savedModules = localStorage.getItem('admin_modules');

    if (savedDomains) setDomains(JSON.parse(savedDomains));
    if (savedIndustries) setIndustries(JSON.parse(savedIndustries));
    if (savedModules) setModules(JSON.parse(savedModules));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('admin_domains', JSON.stringify(domains));
  }, [domains]);

  useEffect(() => {
    localStorage.setItem('admin_industries', JSON.stringify(industries));
  }, [industries]);

  useEffect(() => {
    localStorage.setItem('admin_modules', JSON.stringify(modules));
  }, [modules]);

  const handleAddDomain = () => {
    if (newItem.trim() && !domains.includes(newItem.trim())) {
      setDomains([...domains, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleDeleteDomain = (domain) => {
    if (window.confirm(`Are you sure you want to delete the domain "${domain}"? This will also remove all associated industries and modules.`)) {
      setDomains(domains.filter(d => d !== domain));
      const newIndustries = { ...industries };
      delete newIndustries[domain];
      setIndustries(newIndustries);
      const newModules = { ...modules };
      delete newModules[domain];
      setModules(newModules);
    }
  };

  const handleAddIndustry = (domain) => {
    if (newItem.trim() && !industries[domain]?.includes(newItem.trim())) {
      setIndustries({
        ...industries,
        [domain]: [...(industries[domain] || []), newItem.trim()]
      });
      setNewItem('');
    }
  };

  const handleDeleteIndustry = (domain, industry) => {
    if (window.confirm(`Are you sure you want to delete the industry "${industry}" from domain "${domain}"?`)) {
      setIndustries({
        ...industries,
        [domain]: industries[domain].filter(i => i !== industry)
      });
      // Remove modules for this industry
      if (modules[domain] && modules[domain][industry]) {
        const newModules = { ...modules };
        delete newModules[domain][industry];
        setModules(newModules);
      }
    }
  };

  const handleAddModule = (domain, industry) => {
    if (newItem.trim()) {
      const moduleData = {
        name: newItem.trim(),
        description: 'Module description',
        features: ['Feature 1', 'Feature 2'],
        complexity: 'Medium',
        salesforceObjects: ['Custom_Object__c'],
        automations: ['Automation 1']
      };

      setModules({
        ...modules,
        [domain]: {
          ...modules[domain],
          [industry]: [...(modules[domain]?.[industry] || []), moduleData]
        }
      });
      setNewItem('');
    }
  };

  const handleDeleteModule = (domain, industry, moduleIndex) => {
    if (window.confirm(`Are you sure you want to delete this module?`)) {
      const newModules = { ...modules };
      newModules[domain][industry].splice(moduleIndex, 1);
      setModules(newModules);
    }
  };

  const handleEditModule = (domain, industry, moduleIndex, field, value) => {
    const newModules = { ...modules };
    if (field === 'features' || field === 'salesforceObjects' || field === 'automations') {
      newModules[domain][industry][moduleIndex][field] = value.split(',').map(item => item.trim());
    } else {
      newModules[domain][industry][moduleIndex][field] = value;
    }
    setModules(newModules);
  };

  const exportData = () => {
    const data = {
      domains,
      industries,
      modules,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'salesforce-implementation-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.domains) setDomains(data.domains);
          if (data.industries) setIndustries(data.industries);
          if (data.modules) setModules(data.modules);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="admin-panel-overlay">
      <div className="admin-panel-modal">
        <div className="admin-header">
          <h2>Admin Panel - Content Management</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab ${activeTab === 'domains' ? 'active' : ''}`}
            onClick={() => setActiveTab('domains')}
          >
            Domains
          </button>
          <button 
            className={`tab ${activeTab === 'industries' ? 'active' : ''}`}
            onClick={() => setActiveTab('industries')}
          >
            Industries
          </button>
          <button 
            className={`tab ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
          >
            Modules
          </button>
          <button 
            className={`tab ${activeTab === 'import' ? 'active' : ''}`}
            onClick={() => setActiveTab('import')}
          >
            Import/Export
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'domains' && (
            <div className="domains-section">
              <h3>Manage Domains</h3>
              <div className="add-item">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add new domain"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddDomain()}
                />
                <button onClick={handleAddDomain}>Add Domain</button>
              </div>
              <div className="items-list">
                {domains.map((domain, index) => (
                  <div key={index} className="item-card">
                    <span className="item-name">{domain}</span>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteDomain(domain)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'industries' && (
            <div className="industries-section">
              <h3>Manage Industries</h3>
              {domains.map(domain => (
                <div key={domain} className="domain-section">
                  <h4>{domain}</h4>
                  <div className="add-item">
                    <input
                      type="text"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Add new industry"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddIndustry(domain)}
                    />
                    <button onClick={() => handleAddIndustry(domain)}>Add Industry</button>
                  </div>
                  <div className="items-list">
                    {(industries[domain] || []).map((industry, index) => (
                      <div key={index} className="item-card">
                        <span className="item-name">{industry}</span>
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteIndustry(domain, industry)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="modules-section">
              <h3>Manage Modules</h3>
              {domains.map(domain => (
                <div key={domain} className="domain-section">
                  <h4>{domain}</h4>
                  {(industries[domain] || []).map(industry => (
                    <div key={industry} className="industry-section">
                      <h5>{industry}</h5>
                      <div className="add-item">
                        <input
                          type="text"
                          value={newItem}
                          onChange={(e) => setNewItem(e.target.value)}
                          placeholder="Add new module"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddModule(domain, industry)}
                        />
                        <button onClick={() => handleAddModule(domain, industry)}>Add Module</button>
                      </div>
                      <div className="modules-list">
                        {(modules[domain]?.[industry] || []).map((module, moduleIndex) => (
                          <div key={moduleIndex} className="module-card">
                            <div className="module-fields">
                              <div className="field-group">
                                <label>Name:</label>
                                <input
                                  type="text"
                                  value={module.name}
                                  onChange={(e) => handleEditModule(domain, industry, moduleIndex, 'name', e.target.value)}
                                />
                              </div>
                              <div className="field-group">
                                <label>Description:</label>
                                <textarea
                                  value={module.description}
                                  onChange={(e) => handleEditModule(domain, industry, moduleIndex, 'description', e.target.value)}
                                />
                              </div>
                              <div className="field-group">
                                <label>Features (comma-separated):</label>
                                <input
                                  type="text"
                                  value={module.features.join(', ')}
                                  onChange={(e) => handleEditModule(domain, industry, moduleIndex, 'features', e.target.value)}
                                />
                              </div>
                              <div className="field-group">
                                <label>Complexity:</label>
                                <select
                                  value={module.complexity}
                                  onChange={(e) => handleEditModule(domain, industry, moduleIndex, 'complexity', e.target.value)}
                                >
                                  <option value="Low">Low</option>
                                  <option value="Medium">Medium</option>
                                  <option value="High">High</option>
                                </select>
                              </div>
                            </div>
                            <button 
                              className="delete-button"
                              onClick={() => handleDeleteModule(domain, industry, moduleIndex)}
                            >
                              Delete Module
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'import' && (
            <div className="import-export-section">
              <h3>Import/Export Data</h3>
              <div className="export-section">
                <h4>Export Data</h4>
                <p>Export all domains, industries, and modules to a JSON file.</p>
                <button className="export-button" onClick={exportData}>
                  Export to JSON
                </button>
              </div>
              <div className="import-section">
                <h4>Import Data</h4>
                <p>Import domains, industries, and modules from a JSON file.</p>
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="import-input"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
