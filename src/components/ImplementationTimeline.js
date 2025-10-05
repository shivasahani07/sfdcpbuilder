import React, { useState, useEffect } from 'react';
import './ImplementationTimeline.css';

const ImplementationTimeline = ({ selectedModules, domain, industry }) => {
  const [timeline, setTimeline] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [dependencyWarnings, setDependencyWarnings] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    if (selectedModules && selectedModules.length > 0) {
      generateTimeline();
      checkDependencies();
    }
  }, [selectedModules, domain, industry]);

  const generateTimeline = () => {
    let allSteps = [];
    let currentWeek = 1;
    
    // Sort modules by dependencies first
    const sortedModules = sortModulesByDependencies(selectedModules);
    
    sortedModules.forEach(module => {
      if (module.implementationSteps) {
        module.implementationSteps.forEach(step => {
          allSteps.push({
            ...step,
            moduleName: module.name,
            week: currentWeek,
            endWeek: currentWeek + step.duration - 1
          });
          currentWeek += step.duration;
        });
      } else {
        // If no implementation steps defined, create default ones
        allSteps.push({
          step: 1,
          name: `${module.name} Setup`,
          duration: module.complexity === 'High' ? 3 : module.complexity === 'Medium' ? 2 : 1,
          description: `Basic setup and configuration for ${module.name}`,
          moduleName: module.name,
          week: currentWeek,
          endWeek: currentWeek + (module.complexity === 'High' ? 3 : module.complexity === 'Medium' ? 2 : 1) - 1
        });
        currentWeek += module.complexity === 'High' ? 3 : module.complexity === 'Medium' ? 2 : 1;
      }
    });

    setTimeline(allSteps);
    setTotalDuration(currentWeek - 1);
  };

  const sortModulesByDependencies = (modules) => {
    const sorted = [];
    const visited = new Set();
    const visiting = new Set();

    const visit = (module) => {
      if (visiting.has(module.name)) {
        return; // Circular dependency detected
      }
      if (visited.has(module.name)) {
        return;
      }

      visiting.add(module.name);

      // Add dependencies first
      if (module.dependencies && module.dependencies.length > 0) {
        module.dependencies.forEach(depName => {
          const depModule = modules.find(m => m.name === depName);
          if (depModule && !visited.has(depName)) {
            visit(depModule);
          }
        });
      }

      visiting.delete(module.name);
      visited.add(module.name);
      sorted.push(module);
    };

    modules.forEach(visit);
    return sorted;
  };

  const checkDependencies = () => {
    const warnings = [];
    const allDependencies = [];

    selectedModules.forEach(module => {
      if (module.dependencies && module.dependencies.length > 0) {
        module.dependencies.forEach(depName => {
          const isSelected = selectedModules.some(m => m.name === depName);
          if (!isSelected) {
            warnings.push({
              module: module.name,
              missingDependency: depName,
              severity: 'warning',
              message: `${module.name} requires ${depName} to be implemented first`
            });
          }
          allDependencies.push({
            module: module.name,
            dependency: depName,
            status: isSelected ? 'satisfied' : 'missing'
          });
        });
      }
    });

    setDependencyWarnings(warnings);
    setDependencies(allDependencies);
  };

  const getWeekColor = (week) => {
    const colors = ['#e3f2fd', '#f3e5f5', '#e8f5e8', '#fff3e0', '#fce4ec'];
    return colors[week % colors.length];
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'High': return '#ff5722';
      case 'Medium': return '#ff9800';
      case 'Low': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  return (
    <div className="implementation-timeline">
      <div className="timeline-header">
        <h3>Implementation Timeline</h3>
        <div className="timeline-summary">
          <div className="summary-item">
            <span className="label">Total Duration:</span>
            <span className="value">{totalDuration} weeks</span>
          </div>
          <div className="summary-item">
            <span className="label">Modules:</span>
            <span className="value">{selectedModules.length}</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Steps:</span>
            <span className="value">{timeline.length}</span>
          </div>
        </div>
      </div>

      {dependencyWarnings.length > 0 && (
        <div className="dependency-warnings">
          <h4>⚠️ Dependency Warnings</h4>
          {dependencyWarnings.map((warning, index) => (
            <div key={index} className="warning-item">
              <span className="warning-icon">⚠️</span>
              <span className="warning-message">{warning.message}</span>
            </div>
          ))}
        </div>
      )}

      <div className="timeline-content">
        <div className="timeline-chart">
          {timeline.map((step, index) => (
            <div 
              key={index} 
              className="timeline-step"
              style={{ 
                gridColumn: `${step.week} / ${step.endWeek + 1}`,
                backgroundColor: getWeekColor(step.week)
              }}
            >
              <div className="step-header">
                <span className="step-number">{step.step}</span>
                <span className="step-module">{step.moduleName}</span>
              </div>
              <div className="step-name">{step.name}</div>
              <div className="step-duration">{step.duration} week{step.duration > 1 ? 's' : ''}</div>
            </div>
          ))}
        </div>

        <div className="timeline-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#e3f2fd' }}></div>
            <span>Week 1-2</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f3e5f5' }}></div>
            <span>Week 3-4</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#e8f5e8' }}></div>
            <span>Week 5-6</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#fff3e0' }}></div>
            <span>Week 7-8</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#fce4ec' }}></div>
            <span>Week 9+</span>
          </div>
        </div>
      </div>

      <div className="detailed-steps">
        <h4>Detailed Implementation Steps</h4>
        {selectedModules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="module-steps">
            <div className="module-header">
              <h5>{module.name}</h5>
              <span 
                className="complexity-badge"
                style={{ backgroundColor: getComplexityColor(module.complexity) }}
              >
                {module.complexity} Complexity
              </span>
            </div>
            
            {module.implementationSteps ? (
              <div className="steps-list">
                {module.implementationSteps.map((step, stepIndex) => (
                  <div key={stepIndex} className="step-detail">
                    <div className="step-info">
                      <span className="step-number">{step.step}</span>
                      <div className="step-content">
                        <h6>{step.name}</h6>
                        <p>{step.description}</p>
                        <span className="step-duration">{step.duration} week{step.duration > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="default-step">
                <div className="step-info">
                  <span className="step-number">1</span>
                  <div className="step-content">
                    <h6>{module.name} Setup</h6>
                    <p>Basic setup and configuration for {module.name}</p>
                    <span className="step-duration">
                      {module.complexity === 'High' ? '3' : module.complexity === 'Medium' ? '2' : '1'} week
                      {module.complexity === 'High' ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {module.dependencies && module.dependencies.length > 0 && (
              <div className="dependencies">
                <h6>Dependencies:</h6>
                <ul>
                  {module.dependencies.map((dep, depIndex) => {
                    const isSatisfied = selectedModules.some(m => m.name === dep);
                    return (
                      <li key={depIndex} className={isSatisfied ? 'satisfied' : 'missing'}>
                        <span className="dependency-icon">
                          {isSatisfied ? '✅' : '❌'}
                        </span>
                        {dep}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {module.prerequisites && module.prerequisites.length > 0 && (
              <div className="prerequisites">
                <h6>Prerequisites:</h6>
                <ul>
                  {module.prerequisites.map((prereq, prereqIndex) => (
                    <li key={prereqIndex}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="timeline-export">
        <button className="export-button" onClick={() => exportTimeline()}>
          Export Timeline
        </button>
        <button className="export-button" onClick={() => exportGantt()}>
          Export Gantt Chart
        </button>
      </div>
    </div>
  );
};

const exportTimeline = () => {
  // Export timeline as CSV or PDF
  console.log('Exporting timeline...');
};

const exportGantt = () => {
  // Export Gantt chart
  console.log('Exporting Gantt chart...');
};

export default ImplementationTimeline;
