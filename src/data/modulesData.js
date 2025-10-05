export const domains = ['Sales', 'Service', 'Marketing', 'Commerce', 'Analytics', 'Platform', 'Integration'];

export const industries = {
  Sales: ['Technology', 'Healthcare', 'Financial Services', 'Manufacturing', 'Retail', 'Real Estate', 'Automotive', 'Pharmaceuticals'],
  Service: ['Technology', 'Healthcare', 'Financial Services', 'Telecommunications', 'Education', 'Government', 'Non-Profit', 'Utilities'],
  Marketing: ['Technology', 'E-commerce', 'Healthcare', 'Media & Entertainment', 'Hospitality', 'Travel & Tourism', 'Fashion', 'Food & Beverage'],
  Commerce: ['E-commerce', 'Retail', 'Manufacturing', 'Wholesale', 'Consumer Goods', 'Fashion', 'Electronics', 'Home & Garden'],
  Analytics: ['Technology', 'Financial Services', 'Healthcare', 'Manufacturing', 'Retail', 'Media & Entertainment', 'Government', 'Research'],
  Platform: ['Technology', 'Financial Services', 'Healthcare', 'Education', 'Government', 'Non-Profit', 'Consulting', 'Professional Services'],
  Integration: ['Technology', 'Manufacturing', 'Healthcare', 'Financial Services', 'Government', 'Education', 'Utilities', 'Transportation']
};

export const modulesData = {
  Sales: {
    Technology: [
      {
        name: 'Lead Management',
        description: 'Track and manage potential customers through the sales pipeline',
        features: ['Lead Scoring', 'Lead Assignment', 'Lead Conversion', 'Lead Qualification'],
        complexity: 'Medium',
        salesforceObjects: ['Lead', 'Contact', 'Account', 'Campaign'],
        automations: ['Lead Assignment Rules', 'Lead Scoring Automation', 'Email Alerts']
      },
      {
        name: 'Opportunity Management',
        description: 'Manage sales opportunities and forecast revenue',
        features: ['Pipeline Management', 'Forecasting', 'Stage Tracking', 'Revenue Analytics'],
        complexity: 'High',
        salesforceObjects: ['Opportunity', 'Product2', 'PricebookEntry', 'Quote'],
        automations: ['Opportunity Stage Automation', 'Revenue Forecasting', 'Approval Processes']
      },
      {
        name: 'CPQ (Configure, Price, Quote)',
        description: 'Configure products, generate quotes, and manage pricing',
        features: ['Product Bundling', 'Discount Management', 'Quote Generation', 'Contract Management'],
        complexity: 'High',
        salesforceObjects: ['Product2', 'PricebookEntry', 'Quote', 'QuoteLineItem', 'Contract'],
        automations: ['Price Calculation Rules', 'Approval Workflows', 'Quote Generation']
      }
    ],
    Healthcare: [
      {
        name: 'Referral Tracking',
        description: 'Track patient referrals and physician relationships',
        features: ['Referral Source Tracking', 'Commission Management', 'Compliance Reporting', 'Provider Network'],
        complexity: 'Medium',
        salesforceObjects: ['Account', 'Contact', 'Opportunity', 'Custom_Referral__c'],
        automations: ['Referral Assignment', 'Commission Calculations', 'Compliance Alerts']
      },
      {
        name: 'Medical Device Sales',
        description: 'Manage medical device sales cycles and inventory',
        features: ['Device Tracking', 'Regulatory Compliance', 'Inventory Management', 'Warranty Tracking'],
        complexity: 'High',
        salesforceObjects: ['Product2', 'Asset', 'Opportunity', 'Custom_Device__c'],
        automations: ['Compliance Workflows', 'Inventory Alerts', 'Warranty Expiration']
      }
    ],
    'Financial Services': [
      {
        name: 'Wealth Management',
        description: 'Manage client portfolios and investment opportunities',
        features: ['Portfolio Tracking', 'Client Onboarding', 'Compliance Monitoring', 'Risk Assessment'],
        complexity: 'High',
        salesforceObjects: ['Account', 'Contact', 'Opportunity', 'Custom_Portfolio__c'],
        automations: ['Risk Assessment Rules', 'Compliance Alerts', 'Portfolio Rebalancing']
      }
    ]
  },
  Service: {
    Technology: [
      {
        name: 'Case Management',
        description: 'Track and resolve customer support cases',
        features: ['Case Routing', 'SLAs', 'Knowledge Base Integration', 'Escalation Management'],
        complexity: 'Medium',
        salesforceObjects: ['Case', 'Account', 'Contact', 'Knowledge__kav'],
        automations: ['Case Assignment Rules', 'SLA Tracking', 'Escalation Workflows']
      },
      {
        name: 'Omni-Channel Service',
        description: 'Provide support across multiple channels',
        features: ['Email', 'Chat', 'Phone', 'Social Media', 'Video Support'],
        complexity: 'High',
        salesforceObjects: ['Case', 'LiveChatTranscript', 'EmailMessage', 'Social_Post__c'],
        automations: ['Channel Routing', 'Response Templates', 'Escalation Rules']
      }
    ],
    Healthcare: [
      {
        name: 'Patient Support',
        description: 'Manage patient inquiries and support cases',
        features: ['HIPAA Compliance', 'Appointment Scheduling', 'Medical Record Integration', 'Insurance Verification'],
        complexity: 'High',
        salesforceObjects: ['Case', 'Contact', 'Account', 'Custom_Patient__c'],
        automations: ['HIPAA Compliance Checks', 'Appointment Reminders', 'Insurance Validation']
      }
    ]
  },
  Marketing: {
    Technology: [
      {
        name: 'Lead Generation',
        description: 'Capture and nurture leads from multiple sources',
        features: ['Web-to-Lead', 'Landing Pages', 'Lead Scoring', 'Email Marketing'],
        complexity: 'Medium',
        salesforceObjects: ['Lead', 'Campaign', 'EmailTemplate', 'Landing_Page__c'],
        automations: ['Lead Scoring Rules', 'Email Nurture Campaigns', 'Lead Assignment']
      },
      {
        name: 'Campaign Management',
        description: 'Plan and execute marketing campaigns',
        features: ['Multi-channel Campaigns', 'ROI Tracking', 'Audience Segmentation', 'A/B Testing'],
        complexity: 'High',
        salesforceObjects: ['Campaign', 'CampaignMember', 'Lead', 'Custom_Campaign_Analytics__c'],
        automations: ['Campaign Automation', 'ROI Calculations', 'Segmentation Rules']
      }
    ],
    'E-commerce': [
      {
        name: 'Customer Journey Analytics',
        description: 'Track customer interactions across touchpoints',
        features: ['Journey Mapping', 'Behavioral Analytics', 'Personalization', 'Conversion Tracking'],
        complexity: 'High',
        salesforceObjects: ['Contact', 'Account', 'Custom_Journey__c', 'Custom_Interaction__c'],
        automations: ['Journey Progression', 'Personalization Rules', 'Conversion Alerts']
      }
    ]
  },
  Commerce: {
    'E-commerce': [
      {
        name: 'Digital Commerce',
        description: 'Manage online storefront and digital commerce experiences',
        features: ['Product Catalog', 'Shopping Cart', 'Checkout Process', 'Payment Integration'],
        complexity: 'High',
        salesforceObjects: ['Product2', 'PricebookEntry', 'Order', 'OrderItem'],
        automations: ['Inventory Management', 'Price Updates', 'Order Processing']
      },
      {
        name: 'B2B Commerce',
        description: 'Manage business-to-business commerce and partner portals',
        features: ['Partner Portal', 'Contract Pricing', 'Bulk Ordering', 'Approval Workflows'],
        complexity: 'High',
        salesforceObjects: ['Account', 'User', 'Product2', 'Custom_B2B_Catalog__c'],
        automations: ['Partner Onboarding', 'Contract Management', 'Bulk Order Processing']
      }
    ]
  },
  Analytics: {
    Technology: [
      {
        name: 'Sales Analytics',
        description: 'Analyze sales performance and forecasting',
        features: ['Sales Dashboards', 'Pipeline Analytics', 'Forecasting Models', 'Performance Metrics'],
        complexity: 'Medium',
        salesforceObjects: ['Opportunity', 'Account', 'User', 'Custom_KPI__c'],
        automations: ['Report Automation', 'Alert Rules', 'Data Refresh']
      },
      {
        name: 'Customer Analytics',
        description: 'Analyze customer behavior and engagement',
        features: ['Customer Journey', 'Engagement Scoring', 'Churn Prediction', 'Lifetime Value'],
        complexity: 'High',
        salesforceObjects: ['Account', 'Contact', 'Case', 'Custom_Engagement__c'],
        automations: ['Engagement Scoring', 'Churn Alerts', 'Value Calculations']
      }
    ]
  },
  Platform: {
    Technology: [
      {
        name: 'Custom App Development',
        description: 'Build custom applications using Salesforce Platform',
        features: ['Custom Objects', 'Apex Development', 'Lightning Components', 'API Integration'],
        complexity: 'High',
        salesforceObjects: ['Custom Objects', 'Apex Classes', 'Lightning Components'],
        automations: ['Custom Triggers', 'Scheduled Jobs', 'API Callouts']
      },
      {
        name: 'Mobile App Development',
        description: 'Create mobile applications using Salesforce Mobile SDK',
        features: ['Offline Capability', 'Push Notifications', 'Mobile UI', 'Data Sync'],
        complexity: 'High',
        salesforceObjects: ['Mobile App Objects', 'Custom Components'],
        automations: ['Offline Sync', 'Push Notification Rules']
      }
    ]
  },
  Integration: {
    Technology: [
      {
        name: 'API Integration',
        description: 'Integrate Salesforce with external systems via APIs',
        features: ['REST API', 'SOAP API', 'Bulk API', 'Streaming API'],
        complexity: 'High',
        salesforceObjects: ['External System Objects', 'Integration Logs'],
        automations: ['API Callouts', 'Error Handling', 'Data Transformation']
      },
      {
        name: 'Data Migration',
        description: 'Migrate data from legacy systems to Salesforce',
        features: ['Data Mapping', 'ETL Processes', 'Data Validation', 'Migration Monitoring'],
        complexity: 'High',
        salesforceObjects: ['Migration Logs', 'Data Validation Rules'],
        automations: ['Data Validation', 'Migration Workflows', 'Error Reporting']
      }
    ]
  }
};

export const getModulesForSelection = (domain, industry) => {
  return modulesData[domain]?.[industry] || [];
};