import React, { useState, useEffect, createContext, useContext } from 'react';

// Context for Application State
const AppContext = createContext();
const DashboardContext = createContext();

// Context Providers
const AppProvider = ({ children }) => {
  const [isSystemOnline, setIsSystemOnline] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: 'Dr. Sarah Johnson',
    role: 'Environmental Scientist',
    department: 'ERRS'
  });
  
  return (
    <AppContext.Provider value={{
      isSystemOnline,
      setIsSystemOnline,
      currentUser,
      setCurrentUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

const DashboardProvider = ({ children }) => {
  const [environmentalData, setEnvironmentalData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stations, setStations] = useState([]);
  
  return (
    <DashboardContext.Provider value={{
      environmentalData,
      setEnvironmentalData,
      alerts,
      setAlerts,
      stations,
      setStations
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom Hooks
const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

// Loading Component
const Loading = ({ message = 'Loading...' }) => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p className="loading-message">{message}</p>
  </div>
);

// Header Component
const Header = ({ currentPage, onPageChange, isSystemOnline }) => {
  const { currentUser } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'monitoring', label: 'Real-time Monitoring', icon: '📊' },
    { id: 'stations', label: 'Stations', icon: '🗺️' },
    { id: 'reports', label: 'Reports', icon: '📋' },
    { id: 'incidents', label: 'Incidents', icon: '⚠️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-left">
          <div className="logo-section">
            <div className="epa-logo">🏛️</div>
            <div className="title-section">
              <h1>EPA LIBERIA - ERRS</h1>
              <p className="subtitle">Environmental Research & Radiation Safety</p>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="system-status">
            <div className={`status-indicator ${isSystemOnline ? 'online' : 'offline'}`}>
              <div className="status-dot"></div>
              <span>{isSystemOnline ? 'System Online' : 'System Offline'}</span>
            </div>
          </div>
          
          <div className="datetime">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'short',
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-role">{currentUser.role}</span>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="main-navigation">
        {navigationItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onPageChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};

// Dashboard Page Component
const DashboardPage = () => {
  const [metricsData, setMetricsData] = useState({
    airQuality: 0,
    waterQuality: 0,
    radiationLevel: 0,
    soilHealth: 0
  });

  useEffect(() => {
    // Animate metrics on load
    const targets = { airQuality: 42, waterQuality: 87, radiationLevel: 2.3, soilHealth: 15 };
    
    Object.keys(targets).forEach((key, index) => {
      setTimeout(() => {
        let current = 0;
        const target = targets[key];
        const increment = target / 50;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            setMetricsData(prev => ({ ...prev, [key]: target }));
            clearInterval(counter);
          } else {
            setMetricsData(prev => ({ ...prev, [key]: parseFloat(current.toFixed(1)) }));
          }
        }, 40);
      }, index * 200);
    });
  }, []);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>Environmental Overview Dashboard</h2>
        <p>Real-time monitoring of environmental parameters across Liberia</p>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card air-quality">
          <div className="metric-icon">🌬️</div>
          <div className="metric-value">{metricsData.airQuality.toFixed(0)}</div>
          <div className="metric-label">Air Quality Index</div>
          <div className="metric-status safe">Good - Within WHO Standards</div>
        </div>
        
        <div className="metric-card water-quality">
          <div className="metric-icon">💧</div>
          <div className="metric-value">{metricsData.waterQuality.toFixed(0)}</div>
          <div className="metric-label">Water Quality Score</div>
          <div className="metric-status safe">Safe - No Contamination</div>
        </div>
        
        <div className="metric-card radiation">
          <div className="metric-icon">☢️</div>
          <div className="metric-value">{metricsData.radiationLevel.toFixed(1)}</div>
          <div className="metric-label">Radiation Level (μSv/h)</div>
          <div className="metric-status warning">Elevated - Monitor Closely</div>
        </div>
        
        <div className="metric-card soil">
          <div className="metric-icon">🌱</div>
          <div className="metric-value">{metricsData.soilHealth.toFixed(0)}</div>
          <div className="metric-label">Soil Contamination Index</div>
          <div className="metric-status safe">Normal - Below Threshold</div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="alerts-section">
          <h3>🚨 Active Alerts</h3>
          <div className="alert-item critical">
            <strong>CRITICAL:</strong> Elevated radiation levels detected in Harper Coastal Station - Response team dispatched
          </div>
          <div className="alert-item warning">
            <strong>WARNING:</strong> Water quality parameters approaching threshold in Buchanan Port
          </div>
        </div>
        
        <div className="quick-stats">
          <h3>📊 System Status</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">24</div>
              <div className="stat-label">Active Stations</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">1,847</div>
              <div className="stat-label">Daily Measurements</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">94.2%</div>
              <div className="stat-label">Compliance Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">99.7%</div>
              <div className="stat-label">System Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder Pages
const MonitoringPage = () => (
  <div className="page">
    <div className="page-header">
      <h2>Real-time Environmental Monitoring</h2>
      <p>Live data streams from monitoring stations across Liberia</p>
    </div>
    <div className="page-content">
      <div className="coming-soon">
        <h3>🔄 Real-time Data Streaming</h3>
        <p>Advanced monitoring interface with live charts and alerts</p>
      </div>
    </div>
  </div>
);

const StationsPage = () => (
  <div className="page">
    <div className="page-header">
      <h2>Monitoring Stations Management</h2>
      <p>Network of 24 environmental monitoring stations</p>
    </div>
    <div className="page-content">
      <div className="coming-soon">
        <h3>🗺️ Station Network</h3>
        <p>Interactive map with station details and management tools</p>
      </div>
    </div>
  </div>
);

const ReportsPage = () => (
  <div className="page">
    <div className="page-header">
      <h2>Environmental Reports</h2>
      <p>Compliance reports and environmental analysis</p>
    </div>
    <div className="page-content">
      <div className="coming-soon">
        <h3>📋 Report Generation</h3>
        <p>Automated and custom environmental reports</p>
      </div>
    </div>
  </div>
);

const IncidentsPage = () => (
  <div className="page">
    <div className="page-header">
      <h2>Incident Management</h2>
      <p>Environmental incident tracking and response</p>
    </div>
    <div className="page-content">
      <div className="coming-soon">
        <h3>⚠️ Incident Tracking</h3>
        <p>Comprehensive incident logging and management system</p>
      </div>
    </div>
  </div>
);

const AnalyticsPage = () => (
  <div className="page">
    <div className="page-header">
      <h2>Environmental Analytics</h2>
      <p>Advanced data analysis and trend predictions</p>
    </div>
    <div className="page-content">
      <div className="coming-soon">
        <h3>📈 Advanced Analytics</h3>
        <p>Machine learning powered environmental insights</p>
      </div>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="page">
    <div className="page-header">
      <h2>System Settings</h2>
      <p>Configuration and administration</p>
    </div>
    <div className="page-content">
      <div className="coming-soon">
        <h3>⚙️ System Configuration</h3>
        <p>User management, alerts, and system preferences</p>
      </div>
    </div>
  </div>
);

// Main App Component
const EPADashboardApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { isSystemOnline } = useApp();

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading message="Initializing EPA ERRS Dashboard..." />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'monitoring':
        return <MonitoringPage />;
      case 'stations':
        return <StationsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'incidents':
        return <IncidentsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="epa-dashboard-app">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .epa-dashboard-app {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          color: #ffffff;
          min-height: 100vh;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
        }

        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(0, 255, 136, 0.3);
          border-top: 4px solid #00ff88;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-message {
          font-size: 1.2rem;
          color: #00ff88;
          font-weight: 600;
        }

        .app-header {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .epa-logo {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .title-section h1 {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.25rem;
        }

        .subtitle {
          font-size: 0.9rem;
          color: #a0a0a0;
          font-weight: 300;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 255, 136, 0.1);
          border-radius: 20px;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00ff88;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .datetime {
          font-size: 0.9rem;
          color: #a0a0a0;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-avatar {
          font-size: 1.5rem;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
        }

        .user-role {
          font-size: 0.8rem;
          color: #a0a0a0;
        }

        .main-navigation {
          display: flex;
          padding: 0 2rem;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          color: #a0a0a0;
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 3px solid transparent;
        }

        .nav-item:hover,
        .nav-item.active {
          color: #00ff88;
          background: rgba(0, 255, 136, 0.1);
          border-bottom-color: #00ff88;
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .nav-label {
          font-weight: 500;
          font-size: 0.9rem;
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
        }

        .dashboard-page,
        .page {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #00ff88;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          font-size: 1.1rem;
          color: #a0a0a0;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          transition: all 0.3s ease;
          text-align: center;
        }

        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .metric-card.air-quality { border-left: 4px solid #4facfe; }
        .metric-card.water-quality { border-left: 4px solid #43e97b; }
        .metric-card.radiation { border-left: 4px solid #fa709a; }
        .metric-card.soil { border-left: 4px solid #a8edea; }

        .metric-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .metric-label {
          font-size: 1.1rem;
          color: #ffffff;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .metric-status {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .metric-status.safe {
          background: rgba(76, 175, 80, 0.2);
          color: #4caf50;
        }

        .metric-status.warning {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
        }

        .metric-status.danger {
          background: rgba(244, 67, 54, 0.2);
          color: #f44336;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .alerts-section,
        .quick-stats {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
        }

        .alerts-section h3,
        .quick-stats h3 {
          color: #00ff88;
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
        }

        .alert-item {
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1rem;
          border-left: 4px solid;
        }

        .alert-item.critical {
          background: rgba(244, 67, 54, 0.1);
          border-left-color: #f44336;
        }

        .alert-item.warning {
          background: rgba(255, 193, 7, 0.1);
          border-left-color: #ffc107;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #00ff88;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #a0a0a0;
          margin-top: 0.5rem;
        }

        .coming-soon {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .coming-soon h3 {
          font-size: 1.5rem;
          color: #00ff88;
          margin-bottom: 1rem;
        }

        .coming-soon p {
          color: #a0a0a0;
          font-size: 1.1rem;
        }

        @media (max-width: 1200px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .header-top {
            flex-direction: column;
            gap: 1rem;
          }
          
          .main-navigation {
            flex-wrap: wrap;
            padding: 0 1rem;
          }
          
          .nav-item {
            padding: 0.75rem 1rem;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-page,
          .page {
            padding: 1rem;
          }
        }
      `}</style>
      
      <Header 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isSystemOnline={isSystemOnline}
      />
      
      <main className="main-content">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

// Main App with Providers
const App = () => {
  return (
    <AppProvider>
      <DashboardProvider>
        <EPADashboardApp />
      </DashboardProvider>
    </AppProvider>
  );
};

export default App;
