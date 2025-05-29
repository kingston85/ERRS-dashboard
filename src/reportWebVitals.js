// ========================================
// EPA LIBERIA ERRS DASHBOARD - PERFORMANCE MONITORING
// ========================================

/**
 * EPA Liberia Environmental Dashboard - Web Vitals Performance Reporting
 * 
 * This module handles performance monitoring for the environmental monitoring
 * dashboard, tracking key metrics important for government systems:
 * - Page load times (critical for emergency response)
 * - Interaction delays (important for real-time monitoring)
 * - Visual stability (essential for data accuracy)
 * - Network performance (crucial for remote stations)
 */

// Performance thresholds for EPA environmental monitoring system
const EPA_PERFORMANCE_THRESHOLDS = {
  // Critical for emergency response systems
  LCP: 2500,  // Largest Contentful Paint - dashboard should load quickly
  FID: 100,   // First Input Delay - alerts must be clickable immediately
  CLS: 0.1,   // Cumulative Layout Shift - data displays must be stable
  FCP: 1800,  // First Contentful Paint - initial data visibility
  TTFB: 800   // Time to First Byte - server response for real-time data
};

// Performance data storage for EPA monitoring
let performanceData = {
  sessionId: generateSessionId(),
  userAgent: navigator.userAgent,
  timestamp: new Date().toISOString(),
  location: window.location.href,
  metrics: {}
};

/**
 * Generate unique session ID for tracking EPA dashboard sessions
 */
function generateSessionId() {
  return 'epa-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * EPA-specific performance analysis
 * Determines if metrics meet government system standards
 */
function analyzePerformanceForEPA(metric) {
  const { name, value } = metric;
  let status = 'good';
  let impact = 'low';
  let recommendations = [];

  switch (name) {
    case 'LCP':
      if (value > EPA_PERFORMANCE_THRESHOLDS.LCP) {
        status = 'poor';
        impact = 'high';
        recommendations.push('Optimize environmental data loading');
        recommendations.push('Consider CDN for static assets');
      } else if (value > EPA_PERFORMANCE_THRESHOLDS.LCP * 0.75) {
        status = 'needs-improvement';
        impact = 'medium';
        recommendations.push('Review dashboard component loading');
      }
      break;

    case 'FID':
      if (value > EPA_PERFORMANCE_THRESHOLDS.FID) {
        status = 'poor';
        impact = 'critical';
        recommendations.push('CRITICAL: Alert buttons must respond faster');
        recommendations.push('Optimize JavaScript for emergency response');
      }
      break;

    case 'CLS':
      if (value > EPA_PERFORMANCE_THRESHOLDS.CLS) {
        status = 'poor';
        impact = 'high';
        recommendations.push('Fix layout shifts in data displays');
        recommendations.push('Pre-allocate space for dynamic content');
      }
      break;

    case 'FCP':
      if (value > EPA_PERFORMANCE_THRESHOLDS.FCP) {
        status = 'poor';
        impact = 'medium';
        recommendations.push('Optimize initial dashboard rendering');
      }
      break;

    case 'TTFB':
      if (value > EPA_PERFORMANCE_THRESHOLDS.TTFB) {
        status = 'poor';
        impact = 'high';
        recommendations.push('Optimize server response time');
        recommendations.push('Check environmental data API performance');
      }
      break;
  }

  return {
    status,
    impact,
    recommendations,
    meetsEPAStandards: status === 'good'
  };
}

/**
 * Send performance data to EPA monitoring systems
 */
function sendToEPAMonitoring(metric, analysis) {
  // Only send if monitoring is enabled and in production
  if (process.env.REACT_APP_PERFORMANCE_MONITORING !== 'true') {
    return;
  }

  const performanceReport = {
    ...performanceData,
    metric: {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType
    },
    analysis,
    timestamp: new Date().toISOString(),
    environment: process.env.REACT_APP_ENVIRONMENT || 'development'
  };

  // Send to EPA analytics endpoint
  if (process.env.REACT_APP_EPA_ANALYTICS_ENDPOINT) {
    fetch(process.env.REACT_APP_EPA_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-EPA-Session': performanceData.sessionId
      },
      body: JSON.stringify(performanceReport)
    }).catch(error => {
      console.warn('EPA Performance Monitoring: Failed to send data', error);
    });
  }

  // Send to Google Analytics if configured
  if (typeof gtag !== 'undefined' && process.env.REACT_APP_GA_MEASUREMENT_ID) {
    gtag('event', metric.name, {
      event_category: 'EPA Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_parameter_1: 'epa_environmental_dashboard',
      custom_parameter_2: analysis.status
    });
  }
}

/**
 * Console logging for EPA development team
 */
function logEPAPerformance(metric, analysis) {
  const isProduction = process.env.REACT_APP_ENVIRONMENT === 'production';
  const isDevelopment = process.env.REACT_APP_DEBUG === 'true';

  if (!isProduction || isDevelopment) {
    const statusEmoji = {
      'good': '✅',
      'needs-improvement': '⚠️',
      'poor': '❌'
    };

    const impactEmoji = {
      'low': '🟢',
      'medium': '🟡',
      'high': '🔴',
      'critical': '🚨'
    };

    console.group(
      `${statusEmoji[analysis.status]} EPA Dashboard Performance: ${metric.name}`
    );
    
    console.log(`📊 Value: ${metric.value.toFixed(2)}ms`);
    console.log(`📈 Rating: ${metric.rating}`);
    console.log(`🎯 Status: ${analysis.status}`);
    console.log(`${impactEmoji[analysis.impact]} Impact: ${analysis.impact}`);
    console.log(`✅ Meets EPA Standards: ${analysis.meetsEPAStandards}`);
    
    if (analysis.recommendations.length > 0) {
      console.log('💡 Recommendations:');
      analysis.recommendations.forEach(rec => console.log(`   • ${rec}`));
    }
    
    console.log(`🔍 Session: ${performanceData.sessionId}`);
    console.groupEnd();
  }
}

/**
 * Store performance data for EPA reporting
 */
function storePerformanceData(metric, analysis) {
  performanceData.metrics[metric.name] = {
    value: metric.value,
    rating: metric.rating,
    status: analysis.status,
    impact: analysis.impact,
    meetsStandards: analysis.meetsEPAStandards,
    timestamp: new Date().toISOString()
  };

  // Store in sessionStorage for EPA dashboard use
  if (typeof Storage !== 'undefined') {
    try {
      sessionStorage.setItem('epa-performance-data', JSON.stringify(performanceData));
    } catch (error) {
      console.warn('EPA Performance: Unable to store data in sessionStorage', error);
    }
  }
}

/**
 * Main performance reporting function for EPA Dashboard
 */
const reportWebVitals = (onPerfEntry) => {
  // Check if performance monitoring is enabled
  const monitoringEnabled = process.env.REACT_APP_PERFORMANCE_MONITORING !== 'false';
  
  if (onPerfEntry && onPerfEntry instanceof Function && monitoringEnabled) {
    // Dynamically import web-vitals library
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Largest Contentful Paint - Critical for dashboard loading
      getLCP((metric) => {
        const analysis = analyzePerformanceForEPA(metric);
        logEPAPerformance(metric, analysis);
        storePerformanceData(metric, analysis);
        sendToEPAMonitoring(metric, analysis);
        onPerfEntry(metric);
      });

      // First Input Delay - Critical for emergency response
      getFID((metric) => {
        const analysis = analyzePerformanceForEPA(metric);
        logEPAPerformance(metric, analysis);
        storePerformanceData(metric, analysis);
        sendToEPAMonitoring(metric, analysis);
        onPerfEntry(metric);
      });

      // Cumulative Layout Shift - Important for data accuracy
      getCLS((metric) => {
        const analysis = analyzePerformanceForEPA(metric);
        logEPAPerformance(metric, analysis);
        storePerformanceData(metric, analysis);
        sendToEPAMonitoring(metric, analysis);
        onPerfEntry(metric);
      });

      // First Contentful Paint - Initial data visibility
      getFCP((metric) => {
        const analysis = analyzePerformanceForEPA(metric);
        logEPAPerformance(metric, analysis);
        storePerformanceData(metric, analysis);
        sendToEPAMonitoring(metric, analysis);
        onPerfEntry(metric);
      });

      // Time to First Byte - Server response performance
      getTTFB((metric) => {
        const analysis = analyzePerformanceForEPA(metric);
        logEPAPerformance(metric, analysis);
        storePerformanceData(metric, analysis);
        sendToEPAMonitoring(metric, analysis);
        onPerfEntry(metric);
      });
    }).catch(error => {
      console.warn('EPA Performance Monitoring: Failed to load web-vitals library', error);
    });
  }

  // Log EPA performance monitoring status
  if (process.env.REACT_APP_DEBUG === 'true') {
    console.log('🏛️ EPA ERRS Dashboard Performance Monitoring:', {
      enabled: monitoringEnabled,
      environment: process.env.REACT_APP_ENVIRONMENT,
      sessionId: performanceData.sessionId
    });
  }
};

/**
 * Get current EPA performance summary
 * Useful for debugging and admin panels
 */
export const getEPAPerformanceSummary = () => {
  const summary = {
    sessionId: performanceData.sessionId,
    metricsCount: Object.keys(performanceData.metrics).length,
    overallStatus: 'good',
    criticalIssues: [],
    recommendations: []
  };

  // Analyze overall performance
  Object.entries(performanceData.metrics).forEach(([name, data]) => {
    if (data.impact === 'critical' || data.impact === 'high') {
      summary.criticalIssues.push({
        metric: name,
        status: data.status,
        impact: data.impact
      });
    }

    if (data.status === 'poor') {
      summary.overallStatus = 'poor';
    } else if (data.status === 'needs-improvement' && summary.overallStatus !== 'poor') {
      summary.overallStatus = 'needs-improvement';
    }
  });

  return summary;
};

/**
 * Export performance data for EPA reports
 */
export const exportEPAPerformanceData = () => {
  return {
    ...performanceData,
    summary: getEPAPerformanceSummary(),
    exportTimestamp: new Date().toISOString()
  };
};

// Log EPA initialization
if (process.env.REACT_APP_DEBUG === 'true') {
  console.log('🏛️ EPA Liberia ERRS Dashboard - Performance Monitoring Initialized');
  console.log('📊 Session ID:', performanceData.sessionId);
  console.log('🔍 Monitoring Enabled:', process.env.REACT_APP_PERFORMANCE_MONITORING !== 'false');
}

export default reportWebVitals;

// ========================================
// END EPA LIBERIA ERRS DASHBOARD PERFORMANCE MONITORING
// ========================================
