// ========================================
// EPA LIBERIA ERRS DASHBOARD - TESTING
// ========================================

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock environment variables for testing
process.env.REACT_APP_ENVIRONMENT = 'test';
process.env.REACT_APP_DEBUG = 'true';
process.env.REACT_APP_PERFORMANCE_MONITORING = 'false';

/**
 * EPA Dashboard - Basic Rendering Tests
 */
describe('EPA ERRS Dashboard - Basic Functionality', () => {
  test('renders EPA dashboard without crashing', () => {
    render(<App />);
    expect(screen.getByText(/EPA LIBERIA - ERRS/i)).toBeInTheDocument();
  });

  test('displays EPA branding correctly', () => {
    render(<App />);
    expect(screen.getByText(/Environmental Research & Radiation Safety/i)).toBeInTheDocument();
  });

  test('shows system online status', () => {
    render(<App />);
    expect(screen.getByText(/System Online/i)).toBeInTheDocument();
  });

  test('displays main navigation items', () => {
    render(<App />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Real-time Monitoring/i)).toBeInTheDocument();
    expect(screen.getByText(/Stations/i)).toBeInTheDocument();
    expect(screen.getByText(/Reports/i)).toBeInTheDocument();
    expect(screen.getByText(/Incidents/i)).toBeInTheDocument();
    expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });
});

/**
 * EPA Dashboard - Environmental Metrics Tests
 */
describe('EPA ERRS Dashboard - Environmental Metrics', () => {
  test('displays environmental metrics labels', () => {
    render(<App />);
    expect(screen.getByText(/Air Quality Index/i)).toBeInTheDocument();
    expect(screen.getByText(/Water Quality Score/i)).toBeInTheDocument();
    expect(screen.getByText(/Radiation Level/i)).toBeInTheDocument();
    expect(screen.getByText(/Soil Contamination Index/i)).toBeInTheDocument();
  });

  test('shows environmental status indicators', () => {
    render(<App />);
    expect(screen.getByText(/Good - Within WHO Standards/i)).toBeInTheDocument();
    expect(screen.getByText(/Safe - No Contamination/i)).toBeInTheDocument();
    expect(screen.getByText(/Elevated - Monitor Closely/i)).toBeInTheDocument();
    expect(screen.getByText(/Normal - Below Threshold/i)).toBeInTheDocument();
  });

  test('displays system statistics', () => {
    render(<App />);
    expect(screen.getByText(/24/i)).toBeInTheDocument(); // Active Stations
    expect(screen.getByText(/1,847/i)).toBeInTheDocument(); // Daily Measurements
    expect(screen.getByText(/94.2%/i)).toBeInTheDocument(); // Compliance Rate
    expect(screen.getByText(/99.7%/i)).toBeInTheDocument(); // System Uptime
  });
});

/**
 * EPA Dashboard - Navigation Tests
 */
describe('EPA ERRS Dashboard - Navigation', () => {
  test('can navigate between pages', async () => {
    render(<App />);
    
    // Click on Monitoring page
    const monitoringButton = screen.getByRole('button', { name: /Real-time Monitoring/i });
    fireEvent.click(monitoringButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Real-time Environmental Monitoring/i)).toBeInTheDocument();
    });
  });

  test('highlights active navigation item', () => {
    render(<App />);
    
    // Dashboard should be active by default
    const dashboardButton = screen.getByRole('button', { name: /Dashboard/i });
    expect(dashboardButton).toHaveClass('active');
  });

  test('can navigate to stations page', async () => {
    render(<App />);
    
    const stationsButton = screen.getByRole('button', { name: /Stations/i });
    fireEvent.click(stationsButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Monitoring Stations Management/i)).toBeInTheDocument();
    });
  });

  test('can navigate to reports page', async () => {
    render(<App />);
    
    const reportsButton = screen.getByRole('button', { name: /Reports/i });
    fireEvent.click(reportsButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Environmental Reports/i)).toBeInTheDocument();
    });
  });

  test('can navigate to incidents page', async () => {
    render(<App />);
    
    const incidentsButton = screen.getByRole('button', { name: /Incidents/i });
    fireEvent.click(incidentsButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Incident Management/i)).toBeInTheDocument();
    });
  });
});

/**
 * EPA Dashboard - Alert System Tests
 */
describe('EPA ERRS Dashboard - Alert System', () => {
  test('displays critical alerts', () => {
    render(<App />);
    expect(screen.getByText(/CRITICAL:/i)).toBeInTheDocument();
    expect(screen.getByText(/Elevated radiation levels detected/i)).toBeInTheDocument();
  });

  test('displays warning alerts', () => {
    render(<App />);
    expect(screen.getByText(/WARNING:/i)).toBeInTheDocument();
    expect(screen.getByText(/Water quality parameters approaching threshold/i)).toBeInTheDocument();
  });

  test('displays info alerts', () => {
    render(<App />);
    expect(screen.getByText(/INFO:/i)).toBeInTheDocument();
    expect(screen.getByText(/Scheduled maintenance completed/i)).toBeInTheDocument();
  });
});

/**
 * EPA Dashboard - Monitoring Stations Tests
 */
describe('EPA ERRS Dashboard - Monitoring Stations', () => {
  test('displays monitoring station names', () => {
    render(<App />);
    expect(screen.getByText(/Monrovia Central/i)).toBeInTheDocument();
    expect(screen.getByText(/Buchanan Port/i)).toBeInTheDocument();
    expect(screen.getByText(/Harper Coastal/i)).toBeInTheDocument();
    expect(screen.getByText(/Gbarnga Station/i)).toBeInTheDocument();
    expect(screen.getByText(/Ganta Border/i)).toBeInTheDocument();
    expect(screen.getByText(/Robertsport/i)).toBeInTheDocument();
  });

  test('displays station data', () => {
    render(<App />);
    expect(screen.getByText(/AQI: 38/i)).toBeInTheDocument();
    expect(screen.getByText(/Water pH: 7.4/i)).toBeInTheDocument();
    expect(screen.getByText(/Radiation: 3.2μSv\/h/i)).toBeInTheDocument();
  });
});

/**
 * EPA Dashboard - User Interface Tests
 */
describe('EPA ERRS Dashboard - User Interface', () => {
  test('displays user information', () => {
    render(<App />);
    expect(screen.getByText(/Dr. Sarah Johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/Environmental Scientist/i)).toBeInTheDocument();
  });

  test('displays EPA footer information', () => {
    render(<App />);
    expect(screen.getByText(/Environmental Protection Agency - Liberia/i)).toBeInTheDocument();
    expect(screen.getByText(/v1.0.0/i)).toBeInTheDocument();
    expect(screen.getByText(/System Operational/i)).toBeInTheDocument();
  });

  test('shows current date and time area', () => {
    render(<App />);
    // Check if datetime element exists (content will be current time)
    expect(document.querySelector('.datetime')).toBeInTheDocument();
  });
});

/**
 * EPA Dashboard - Accessibility Tests
 */
describe('EPA ERRS Dashboard - Accessibility', () => {
  test('has proper heading structure', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  test('navigation buttons are accessible', () => {
    render(<App />);
    const navButtons = screen.getAllByRole('button');
    expect(navButtons.length).toBeGreaterThan(0);
    
    navButtons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });

  test('has main content landmark', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

/**
 * EPA Dashboard - Performance Tests
 */
describe('EPA ERRS Dashboard - Performance', () => {
  test('renders within acceptable time', async () => {
    const startTime = performance.now();
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/EPA LIBERIA - ERRS/i)).toBeInTheDocument();
    });
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render within 2 seconds (EPA performance standard)
    expect(renderTime).toBeLessThan(2000);
  });

  test('handles loading states properly', () => {
    render(<App />);
    
    // Initially should show loading, then dashboard content
    // Note: With current implementation, loading is very brief
    expect(screen.getByText(/EPA LIBERIA - ERRS/i)).toBeInTheDocument();
  });
});

/**
 * EPA Dashboard - Error Handling Tests
 */
describe('EPA ERRS Dashboard - Error Handling', () => {
  test('handles missing environment variables gracefully', () => {
    const originalEnv = process.env.REACT_APP_ENVIRONMENT;
    delete process.env.REACT_APP_ENVIRONMENT;
    
    expect(() => {
      render(<App />);
    }).not.toThrow();
    
    // Restore environment
    process.env.REACT_APP_ENVIRONMENT = originalEnv;
  });

  test('renders without required props', () => {
    // Test that the app renders even without external data
    expect(() => {
      render(<App />);
    }).not.toThrow();
  });
});

/**
 * EPA Dashboard - Data Integration Tests
 */
describe('EPA ERRS Dashboard - Data Integration', () => {
  test('displays placeholder data correctly', () => {
    render(<App />);
    
    // Check that metric values are displayed
    expect(screen.getByText(/42/)).toBeInTheDocument(); // Air Quality
    expect(screen.getByText(/87/)).toBeInTheDocument(); // Water Quality
    expect(screen.getByText(/15/)).toBeInTheDocument(); // Soil Health
  });

  test('formats radiation data correctly', () => {
    render(<App />);
    
    // Should display radiation with proper unit
    expect(screen.getByText(/μSv\/h/i)).toBeInTheDocument();
  });
});

// ========================================
// EPA Test Utilities
// ========================================

/**
 * Helper function to test EPA compliance
 */
export const testEPACompliance = (component) => {
  return {
    hasEPABranding: () => screen.getByText(/EPA LIBERIA/i),
    hasSystemStatus: () => screen.getByText(/System Online/i),
    hasEnvironmentalMetrics: () => screen.getByText(/Air Quality Index/i),
    hasNavigationSystem: () => screen.getAllByRole('button').length >= 7,
    hasAccessibility: () => screen.getByRole('main')
  };
};

/**
 * Mock EPA API responses for testing
 */
export const mockEPAData = {
  environmentalMetrics: {
    airQuality: 42,
    waterQuality: 87,
    radiationLevel: 2.3,
    soilHealth: 15
  },
  systemStatus: {
    isOnline: true,
    activeStations: 24,
    dailyMeasurements: 1847,
    complianceRate: 94.2,
    systemUptime: 99.7
  },
  alerts: [
    {
      type: 'critical',
      message: 'Elevated radiation levels detected in Harper Coastal Station'
    },
    {
      type: 'warning', 
      message: 'Water quality parameters approaching threshold in Buchanan Port'
    }
  ]
};

// ========================================
// END EPA LIBERIA ERRS DASHBOARD TESTING
// ========================================
