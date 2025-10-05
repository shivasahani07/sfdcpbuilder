export const domains = ['Sales', 'Service', 'Marketing', 'Commerce', 'Analytics', 'Platform', 'Integration'];

export const industries = {
  Sales: ['Technology', 'Healthcare', 'Financial Services', 'Manufacturing', 'Retail', 'Real Estate', 'Automotive', 'Pharmaceuticals'],
  Service: ['Technology', 'Healthcare', 'Financial Services', 'Telecommunications', 'Education', 'Government', 'Non-Profit', 'Utilities', 'Real Estate'],
  Marketing: ['Technology', 'E-commerce', 'Healthcare', 'Media & Entertainment', 'Hospitality', 'Travel & Tourism', 'Fashion', 'Food & Beverage', 'Real Estate'],
  Commerce: ['E-commerce', 'Retail', 'Manufacturing', 'Wholesale', 'Consumer Goods', 'Fashion', 'Electronics', 'Home & Garden', 'Real Estate'],
  Analytics: ['Technology', 'Financial Services', 'Healthcare', 'Manufacturing', 'Retail', 'Media & Entertainment', 'Government', 'Research', 'Real Estate'],
  Platform: ['Technology', 'Financial Services', 'Healthcare', 'Education', 'Government', 'Non-Profit', 'Consulting', 'Professional Services', 'Real Estate'],
  Integration: ['Technology', 'Manufacturing', 'Healthcare', 'Financial Services', 'Government', 'Education', 'Utilities', 'Transportation', 'Real Estate']
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
        automations: ['Lead Assignment Rules', 'Lead Scoring Automation', 'Email Alerts'],
        implementationSteps: [
          { step: 1, name: 'Setup Lead Object', duration: 1, description: 'Configure Lead object fields and page layouts' },
          { step: 2, name: 'Create Lead Assignment Rules', duration: 2, description: 'Set up automatic lead assignment based on criteria' },
          { step: 3, name: 'Configure Lead Scoring', duration: 3, description: 'Implement lead scoring rules and automation' },
          { step: 4, name: 'Setup Email Templates', duration: 1, description: 'Create email templates for lead follow-up' },
          { step: 5, name: 'Configure Reports & Dashboards', duration: 2, description: 'Create lead tracking reports and dashboards' }
        ],
        dependencies: [],
        prerequisites: ['Basic Salesforce Setup']
      },
      {
        name: 'Opportunity Management',
        description: 'Manage sales opportunities and forecast revenue',
        features: ['Pipeline Management', 'Forecasting', 'Stage Tracking', 'Revenue Analytics'],
        complexity: 'High',
        salesforceObjects: ['Opportunity', 'Product2', 'PricebookEntry', 'Quote'],
        automations: ['Opportunity Stage Automation', 'Revenue Forecasting', 'Approval Processes'],
        implementationSteps: [
          { step: 1, name: 'Configure Opportunity Object', duration: 2, description: 'Set up opportunity fields, stages, and record types' },
          { step: 2, name: 'Setup Sales Process', duration: 3, description: 'Define sales stages and stage-based automation' },
          { step: 3, name: 'Configure Products & Pricebooks', duration: 2, description: 'Set up product catalog and pricing' },
          { step: 4, name: 'Create Forecasting Reports', duration: 2, description: 'Build revenue forecasting dashboards' },
          { step: 5, name: 'Setup Approval Processes', duration: 3, description: 'Configure approval workflows for deals' }
        ],
        dependencies: ['Lead Management'],
        prerequisites: ['Lead Management', 'Basic Salesforce Setup']
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
    ],
    'Real Estate': [
      {
        name: 'Property Sales Management',
        description: 'Manage residential and commercial property sales from listing to closing',
        features: ['Property Listings', 'Lead Tracking', 'Showing Management', 'Offer Processing', 'Commission Tracking'],
        complexity: 'High',
        salesforceObjects: ['Lead', 'Contact', 'Account', 'Opportunity', 'Custom_Property__c', 'Custom_Showing__c'],
        automations: ['Lead Assignment Rules', 'Showing Reminders', 'Commission Calculations', 'Closing Notifications'],
        implementationSteps: [
          { step: 1, name: 'Create Property Custom Object', duration: 2, description: 'Set up Property__c object with all required fields' },
          { step: 2, name: 'Setup Showing Management', duration: 3, description: 'Create Showing__c object and related automation' },
          { step: 3, name: 'Configure Commission Tracking', duration: 2, description: 'Set up commission calculation rules and fields' },
          { step: 4, name: 'Create Property Reports', duration: 2, description: 'Build property listing and sales reports' },
          { step: 5, name: 'Setup MLS Integration', duration: 4, description: 'Configure MLS data sync and property updates' }
        ],
        dependencies: ['Lead Management'],
        prerequisites: ['Lead Management', 'Opportunity Management', 'Basic Salesforce Setup']
      },
      {
        name: 'Rental Property Management',
        description: 'Manage rental properties, tenants, and lease agreements',
        features: ['Tenant Management', 'Lease Tracking', 'Rent Collection', 'Maintenance Requests', 'Property Inspections'],
        complexity: 'High',
        salesforceObjects: ['Account', 'Contact', 'Custom_Property__c', 'Custom_Lease__c', 'Custom_Maintenance__c'],
        automations: ['Rent Reminder Alerts', 'Lease Renewal Workflows', 'Maintenance Assignment', 'Inspection Scheduling']
      },
      {
        name: 'Commercial Real Estate',
        description: 'Manage commercial property sales and leasing for businesses',
        features: ['Commercial Listings', 'Tenant Relations', 'Lease Negotiations', 'Property Valuation', 'Investment Analysis'],
        complexity: 'High',
        salesforceObjects: ['Account', 'Contact', 'Opportunity', 'Custom_Commercial_Property__c', 'Custom_Lease__c'],
        automations: ['Investment Analysis Rules', 'Lease Renewal Alerts', 'Property Valuation Updates', 'Tenant Communication']
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
    ],
    'Real Estate': [
      {
        name: 'Property Support Services',
        description: 'Manage tenant support, maintenance requests, and property-related inquiries',
        features: ['Tenant Support', 'Maintenance Coordination', 'Emergency Response', 'Property Inspections', 'Complaint Management'],
        complexity: 'Medium',
        salesforceObjects: ['Case', 'Contact', 'Account', 'Custom_Property__c', 'Custom_Maintenance__c'],
        automations: ['Emergency Escalation', 'Maintenance Assignment', 'Inspection Scheduling', 'Tenant Notifications']
      },
      {
        name: 'Real Estate Consultation',
        description: 'Provide expert consultation and advisory services to clients',
        features: ['Market Analysis', 'Investment Advice', 'Property Valuation', 'Legal Consultation', 'Financial Planning'],
        complexity: 'High',
        salesforceObjects: ['Case', 'Contact', 'Account', 'Custom_Consultation__c', 'Custom_Valuation__c'],
        automations: ['Consultation Scheduling', 'Market Update Alerts', 'Follow-up Reminders', 'Report Generation']
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
    ],
    'Real Estate': [
      {
        name: 'Property Marketing Campaigns',
        description: 'Create and manage marketing campaigns for property listings and real estate services',
        features: ['Listing Promotions', 'Open House Marketing', 'Digital Advertising', 'Social Media Campaigns', 'Email Marketing'],
        complexity: 'Medium',
        salesforceObjects: ['Campaign', 'CampaignMember', 'Lead', 'Contact', 'Custom_Property__c'],
        automations: ['Campaign Automation', 'Lead Scoring', 'Follow-up Sequences', 'ROI Tracking']
      },
      {
        name: 'Real Estate Lead Nurturing',
        description: 'Nurture leads through the real estate buying and selling process',
        features: ['Lead Scoring', 'Behavioral Tracking', 'Personalized Content', 'Market Updates', 'Property Recommendations'],
        complexity: 'High',
        salesforceObjects: ['Lead', 'Contact', 'Campaign', 'Custom_Lead_Score__c', 'Custom_Property_Interest__c'],
        automations: ['Lead Scoring Rules', 'Content Personalization', 'Market Update Alerts', 'Property Match Notifications']
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
    ],
    'Real Estate': [
      {
        name: 'Property Marketplace',
        description: 'Create an online marketplace for property listings and real estate services',
        features: ['Property Listings', 'Virtual Tours', 'Online Booking', 'Payment Processing', 'Agent Marketplace'],
        complexity: 'High',
        salesforceObjects: ['Product2', 'PricebookEntry', 'Order', 'OrderItem', 'Custom_Property__c', 'Custom_Agent__c'],
        automations: ['Listing Management', 'Booking Confirmations', 'Payment Processing', 'Commission Calculations']
      },
      {
        name: 'Real Estate Portal',
        description: 'Provide self-service portal for buyers, sellers, and tenants',
        features: ['User Registration', 'Property Search', 'Document Management', 'Communication Hub', 'Appointment Booking'],
        complexity: 'High',
        salesforceObjects: ['User', 'Account', 'Contact', 'Custom_Portal_User__c', 'Custom_Document__c'],
        automations: ['User Onboarding', 'Document Workflows', 'Communication Automation', 'Booking Management']
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
    ],
    'Real Estate': [
      {
        name: 'Property Market Analytics',
        description: 'Analyze property market trends, pricing, and investment opportunities',
        features: ['Market Trends', 'Price Analysis', 'Investment ROI', 'Demand Forecasting', 'Comparative Market Analysis'],
        complexity: 'High',
        salesforceObjects: ['Custom_Property__c', 'Custom_Market_Data__c', 'Custom_Investment__c', 'Custom_Analytics__c'],
        automations: ['Market Update Alerts', 'Price Change Notifications', 'Investment Opportunity Scoring', 'Report Generation']
      },
      {
        name: 'Real Estate Performance Analytics',
        description: 'Track agent performance, property performance, and business metrics',
        features: ['Agent Performance', 'Property Performance', 'Commission Tracking', 'Lead Conversion', 'Revenue Analytics'],
        complexity: 'Medium',
        salesforceObjects: ['User', 'Opportunity', 'Custom_Agent__c', 'Custom_Property__c', 'Custom_Performance__c'],
        automations: ['Performance Dashboards', 'Commission Calculations', 'Goal Tracking', 'Achievement Alerts']
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
    ],
    'Real Estate': [
      {
        name: 'Real Estate CRM Platform',
        description: 'Build comprehensive CRM platform for real estate agencies and agents',
        features: ['Contact Management', 'Lead Tracking', 'Property Database', 'Transaction Management', 'Commission Tracking'],
        complexity: 'High',
        salesforceObjects: ['Custom_Real_Estate_CRM__c', 'Custom_Agent__c', 'Custom_Property__c', 'Custom_Transaction__c'],
        automations: ['Lead Assignment Rules', 'Commission Calculations', 'Transaction Workflows', 'Reporting Automation']
      },
      {
        name: 'Property Management Platform',
        description: 'Develop platform for managing rental properties, tenants, and maintenance',
        features: ['Tenant Portal', 'Maintenance Management', 'Lease Tracking', 'Rent Collection', 'Property Inspections'],
        complexity: 'High',
        salesforceObjects: ['Custom_Property_Management__c', 'Custom_Tenant__c', 'Custom_Lease__c', 'Custom_Maintenance__c'],
        automations: ['Rent Reminders', 'Maintenance Scheduling', 'Lease Renewals', 'Inspection Automation']
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
    ],
    'Real Estate': [
      {
        name: 'Real Estate System Integration',
        description: 'Integrate Salesforce with MLS, property databases, and real estate tools',
        features: ['MLS Integration', 'Property Database Sync', 'Market Data Integration', 'Document Management', 'Payment Processing'],
        complexity: 'High',
        salesforceObjects: ['Custom_Integration__c', 'Custom_MLS_Data__c', 'Custom_Property__c', 'Custom_Document__c'],
        automations: ['Data Synchronization', 'Price Updates', 'Document Workflows', 'Payment Processing']
      },
      {
        name: 'Real Estate Data Migration',
        description: 'Migrate property data, client records, and transaction history to Salesforce',
        features: ['Property Data Import', 'Client Record Migration', 'Transaction History', 'Document Migration', 'Image Processing'],
        complexity: 'High',
        salesforceObjects: ['Migration_Logs__c', 'Custom_Property__c', 'Custom_Transaction__c', 'Custom_Document__c'],
        automations: ['Data Validation Rules', 'Migration Workflows', 'Error Reporting', 'Progress Tracking']
      }
    ]
  }
};

export const getModulesForSelection = (domain, industry) => {
  return modulesData[domain]?.[industry] || [];
};