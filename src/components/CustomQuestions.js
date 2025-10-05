import React, { useState, useEffect } from 'react';
import './CustomQuestions.css';

const CustomQuestions = ({ domain, industry, onAnswersComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  // Dynamic questions based on domain and industry
  const questions = getQuestionsForDomain(domain, industry);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      onAnswersComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const isCurrentQuestionAnswered = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return true;
    
    const answer = answers[currentQuestion.id];
    return answer !== undefined && answer !== '';
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  if (questions.length === 0) {
    return (
      <div className="custom-questions">
        <div className="no-questions">
          <h3>No Additional Questions</h3>
          <p>No custom questions available for {industry} {domain}.</p>
          <button className="complete-button" onClick={() => onAnswersComplete({})}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="custom-questions">
      <div className="questions-header">
        <h3>Additional Questions</h3>
        <p>Help us refine your recommendations with a few more questions</p>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <div className="progress-text">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      <div className="question-container">
        <div className="question-header">
          <h4>{currentQuestion.question}</h4>
          {currentQuestion.description && (
            <p className="question-description">{currentQuestion.description}</p>
          )}
        </div>

        <div className="question-content">
          {currentQuestion.type === 'single-choice' && (
            <div className="single-choice">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option.value}
                    checked={answers[currentQuestion.id] === option.value}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  />
                  <span className="option-text">
                    <strong>{option.label}</strong>
                    {option.description && <span className="option-description">{option.description}</span>}
                  </span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiple-choice' && (
            <div className="multiple-choice">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type="checkbox"
                    checked={(answers[currentQuestion.id] || []).includes(option.value)}
                    onChange={(e) => {
                      const currentAnswers = answers[currentQuestion.id] || [];
                      if (e.target.checked) {
                        handleAnswerChange(currentQuestion.id, [...currentAnswers, option.value]);
                      } else {
                        handleAnswerChange(currentQuestion.id, currentAnswers.filter(v => v !== option.value));
                      }
                    }}
                  />
                  <span className="option-text">
                    <strong>{option.label}</strong>
                    {option.description && <span className="option-description">{option.description}</span>}
                  </span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.type === 'text' && (
            <div className="text-input">
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                placeholder={currentQuestion.placeholder}
                rows={4}
              />
            </div>
          )}

          {currentQuestion.type === 'number' && (
            <div className="number-input">
              <input
                type="number"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                placeholder={currentQuestion.placeholder}
                min={currentQuestion.min}
                max={currentQuestion.max}
              />
              {currentQuestion.unit && <span className="input-unit">{currentQuestion.unit}</span>}
            </div>
          )}

          {currentQuestion.type === 'scale' && (
            <div className="scale-input">
              <div className="scale-labels">
                <span>{currentQuestion.scaleLabels?.min || '1'}</span>
                <span>{currentQuestion.scaleLabels?.max || '10'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={answers[currentQuestion.id] || 5}
                onChange={(e) => handleAnswerChange(currentQuestion.id, parseInt(e.target.value))}
                className="scale-slider"
              />
              <div className="scale-value">
                Selected: {answers[currentQuestion.id] || 5}
              </div>
            </div>
          )}
        </div>

        <div className="question-actions">
          <button 
            className="previous-button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          
          <button 
            className="skip-button"
            onClick={handleSkip}
          >
            Skip
          </button>
          
          <button 
            className="next-button"
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered()}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>

      <div className="questions-navigation">
        <div className="question-dots">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentQuestionIndex ? 'active' : ''} ${answers[questions[index].id] ? 'answered' : ''}`}
              onClick={() => setCurrentQuestionIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Function to generate questions based on domain and industry
const getQuestionsForDomain = (domain, industry) => {
  const baseQuestions = [];

  // Common questions for all domains
  baseQuestions.push({
    id: 'team_size',
    type: 'single-choice',
    question: 'What is your current team size?',
    description: 'This helps us recommend appropriate module complexity and resource requirements.',
    options: [
      { value: '1-5', label: '1-5 people', description: 'Small team' },
      { value: '6-20', label: '6-20 people', description: 'Medium team' },
      { value: '21-50', label: '21-50 people', description: 'Large team' },
      { value: '50+', label: '50+ people', description: 'Enterprise team' }
    ]
  });

  baseQuestions.push({
    id: 'budget_range',
    type: 'single-choice',
    question: 'What is your estimated budget for this implementation?',
    description: 'Budget considerations help us prioritize modules and suggest cost-effective solutions.',
    options: [
      { value: 'low', label: 'Under $10,000', description: 'Basic implementation' },
      { value: 'medium', label: '$10,000 - $50,000', description: 'Standard implementation' },
      { value: 'high', label: '$50,000 - $100,000', description: 'Advanced implementation' },
      { value: 'enterprise', label: 'Over $100,000', description: 'Enterprise implementation' }
    ]
  });

  baseQuestions.push({
    id: 'timeline',
    type: 'single-choice',
    question: 'What is your preferred implementation timeline?',
    description: 'Timeline preferences help us sequence modules and suggest phased approaches.',
    options: [
      { value: 'urgent', label: '1-3 months', description: 'Urgent implementation' },
      { value: 'standard', label: '3-6 months', description: 'Standard timeline' },
      { value: 'flexible', label: '6-12 months', description: 'Flexible timeline' },
      { value: 'long-term', label: '12+ months', description: 'Long-term implementation' }
    ]
  });

  // Domain-specific questions
  if (domain === 'Sales') {
    baseQuestions.push({
      id: 'sales_process',
      type: 'single-choice',
      question: 'How would you describe your current sales process?',
      options: [
        { value: 'informal', label: 'Informal', description: 'No formal process' },
        { value: 'basic', label: 'Basic', description: 'Some structure' },
        { value: 'structured', label: 'Structured', description: 'Well-defined process' },
        { value: 'advanced', label: 'Advanced', description: 'Highly optimized process' }
      ]
    });

    baseQuestions.push({
      id: 'sales_tools',
      type: 'multiple-choice',
      question: 'What sales tools do you currently use?',
      options: [
        { value: 'spreadsheet', label: 'Spreadsheets (Excel, Google Sheets)' },
        { value: 'crm_basic', label: 'Basic CRM' },
        { value: 'crm_advanced', label: 'Advanced CRM' },
        { value: 'email_tools', label: 'Email marketing tools' },
        { value: 'phone_systems', label: 'Phone systems' },
        { value: 'none', label: 'None' }
      ]
    });
  }

  if (domain === 'Marketing') {
    baseQuestions.push({
      id: 'marketing_channels',
      type: 'multiple-choice',
      question: 'Which marketing channels do you currently use?',
      options: [
        { value: 'email', label: 'Email Marketing' },
        { value: 'social', label: 'Social Media' },
        { value: 'content', label: 'Content Marketing' },
        { value: 'paid_ads', label: 'Paid Advertising' },
        { value: 'events', label: 'Events & Trade Shows' },
        { value: 'seo', label: 'SEO' },
        { value: 'referral', label: 'Referral Programs' }
      ]
    });
  }

  if (domain === 'Service') {
    baseQuestions.push({
      id: 'support_channels',
      type: 'multiple-choice',
      question: 'What customer support channels do you provide?',
      options: [
        { value: 'email', label: 'Email Support' },
        { value: 'phone', label: 'Phone Support' },
        { value: 'chat', label: 'Live Chat' },
        { value: 'portal', label: 'Self-Service Portal' },
        { value: 'social', label: 'Social Media' },
        { value: 'ticket', label: 'Ticket System' }
      ]
    });
  }

  // Industry-specific questions
  if (industry === 'Real Estate') {
    baseQuestions.push({
      id: 'property_types',
      type: 'multiple-choice',
      question: 'What types of properties do you work with?',
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'land', label: 'Land' },
        { value: 'rental', label: 'Rental Properties' }
      ]
    });

    baseQuestions.push({
      id: 'mls_integration',
      type: 'single-choice',
      question: 'Do you need MLS integration?',
      description: 'MLS (Multiple Listing Service) integration for property data.',
      options: [
        { value: 'yes', label: 'Yes, we need MLS integration' },
        { value: 'maybe', label: 'Maybe in the future' },
        { value: 'no', label: 'No, not needed' }
      ]
    });
  }

  if (industry === 'Healthcare') {
    baseQuestions.push({
      id: 'hipaa_compliance',
      type: 'single-choice',
      question: 'Do you need HIPAA compliance features?',
      description: 'Healthcare organizations may need HIPAA-compliant solutions.',
      options: [
        { value: 'required', label: 'Required' },
        { value: 'preferred', label: 'Preferred' },
        { value: 'not_needed', label: 'Not needed' }
      ]
    });
  }

  if (industry === 'Financial Services') {
    baseQuestions.push({
      id: 'compliance_requirements',
      type: 'multiple-choice',
      question: 'What compliance requirements do you have?',
      options: [
        { value: 'sox', label: 'SOX Compliance' },
        { value: 'gdpr', label: 'GDPR Compliance' },
        { value: 'pci', label: 'PCI DSS' },
        { value: 'finra', label: 'FINRA' },
        { value: 'other', label: 'Other' }
      ]
    });
  }

  // Additional custom questions
  baseQuestions.push({
    id: 'integration_needs',
    type: 'text',
    question: 'Are there any specific systems you need to integrate with?',
    description: 'Please list any existing systems, databases, or third-party applications you need to connect.',
    placeholder: 'e.g., QuickBooks, Mailchimp, HubSpot, custom databases...'
  });

  baseQuestions.push({
    id: 'success_metrics',
    type: 'text',
    question: 'How will you measure success for this implementation?',
    description: 'What KPIs or metrics are most important to your organization?',
    placeholder: 'e.g., Increase lead conversion by 25%, Reduce support response time to under 2 hours...'
  });

  baseQuestions.push({
    id: 'priority_level',
    type: 'scale',
    question: 'How would you rate the priority of this implementation?',
    description: 'Rate from 1 (low priority) to 10 (critical priority).',
    scaleLabels: {
      min: 'Low Priority',
      max: 'Critical Priority'
    }
  });

  return baseQuestions;
};

export default CustomQuestions;
