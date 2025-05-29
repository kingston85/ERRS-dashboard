# 🏛️ EPA Liberia - ERRS Dashboard

## Environmental Research & Radiation Safety Monitoring System

[![Build Status](https://github.com/epa-liberia/errs-dashboard/workflows/CI/badge.svg)](https://github.com/epa-liberia/errs-dashboard/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D16.0.0-green.svg)](https://nodejs.org/)

A comprehensive real-time environmental monitoring and radiation safety dashboard for the Environmental Protection Agency of Liberia. This system provides 24/7 monitoring of environmental parameters across Liberia's monitoring network.

## 🌍 Overview

The EPA Liberia ERRS Dashboard is a modern web application designed to monitor and manage environmental data from monitoring stations across Liberia. It provides real-time visualization, alert management, and comprehensive reporting for environmental compliance and safety.

### Key Features

- **🔄 Real-time Monitoring** - Live data streams from 24+ monitoring stations
- **📊 Interactive Dashboards** - Rich visualizations with responsive charts
- **⚠️ Alert Management** - Critical environmental alert system
- **🗺️ Geospatial Mapping** - Interactive map with station locations
- **📋 Report Generation** - Automated compliance and environmental reports
- **📱 Responsive Design** - Works on desktop, tablet, and mobile devices
- **🔐 Security Features** - Role-based access control and data protection

## 🖥️ Screenshots

### Main Dashboard
![Dashboard Overview](./docs/images/dashboard-overview.png)

### Real-time Monitoring
![Real-time Monitoring](./docs/images/realtime-monitoring.png)

### Station Management
![Station Management](./docs/images/station-management.png)

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/epa-liberia/errs-dashboard.git
cd errs-dashboard

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# API Configuration
REACT_APP_API_BASE_URL=https://api.epa-liberia.gov
REACT_APP_WEBSOCKET_URL=wss://ws.epa-liberia.gov
REACT_APP_MAP_API_KEY=your_map_api_key_here

# Environment Settings
REACT_APP_ENVIRONMENT=development
REACT_APP_VERSION=1.0.0
REACT_APP_DEBUG=true

# External Services
REACT_APP_WEATHER_API_KEY=your_weather_api_key
REACT_APP_SATELLITE_API_KEY=your_satellite_api_key
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Navigation header
│   ├── Charts/         # Chart components
│   ├── DataTable/      # Data table components
│   └── common/         # Common UI components
├── pages/              # Main application pages
│   ├── Dashboard/      # Main dashboard
│   ├── Monitoring/     # Real-time monitoring
│   ├── Stations/       # Station management
│   ├── Reports/        # Report generation
│   ├── Incidents/      # Incident management
│   ├── Analytics/      # Data analytics
│   └── Settings/       # System settings
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/              # Utility functions
├── context/            # React context providers
└── styles/             # Global styles
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm start              # Start development server
npm run build         # Build for production
npm test             # Run tests
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Quality Assurance
npm run test:coverage  # Run tests with coverage
npm run lint:fix      # Fix ESLint issues
npm run format:check  # Check code formatting
```

### Code Quality

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for Git hooks
- **Jest** for testing

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-monitoring-feature

# Make changes and commit
git add .
git commit -m "feat: add new monitoring feature"

# Push to GitHub
git push origin feature/new-monitoring-feature

# Create Pull Request on GitHub
```

## 📊 Monitoring Stations

The system monitors **24 environmental stations** across Liberia:

### Primary Stations
- **Monrovia Central** - Urban air quality monitoring
- **Buchanan Port** - Industrial and marine monitoring
- **Gbarnga Station** - Regional environmental monitoring
- **Harper Coastal** - Coastal environmental monitoring
- **Ganta Border** - Cross-border monitoring
- **Robertsport** - Coastal and fishing area monitoring

### Parameters Monitored
- **Air Quality** - PM2.5, PM10, CO, NO2, SO2, O3
- **Water Quality** - pH, Dissolved Oxygen, Turbidity, Temperature
- **Radiation Levels** - Gamma radiation, Environmental dose rates
- **Soil Contamination** - Heavy metals, pH, Organic pollutants
- **Weather Parameters** - Temperature, Humidity, Wind Speed/Direction

## 📈 System Features

### Dashboard Components
- **Environmental Metrics** - Real-time key performance indicators
- **Trend Analysis** - Historical data visualization
- **Alert System** - Critical threshold monitoring
- **Compliance Tracking** - Regulatory compliance monitoring

### Advanced Analytics
- **Predictive Modeling** - Environmental trend predictions
- **Anomaly Detection** - Automated unusual pattern detection
- **Correlation Analysis** - Multi-parameter relationship analysis
- **Report Generation** - Automated compliance reporting

## 🔧 API Integration

### Endpoints
```bash
# Environmental Data
GET /api/v1/environmental-data
GET /api/v1/stations
GET /api/v1/alerts

# Reports
GET /api/v1/reports/compliance
POST /api/v1/reports/generate

# Real-time Data
WebSocket: wss://ws.epa-liberia.gov/realtime
```

### Data Format
```json
{
  "stationId": "MON-001",
  "timestamp": "2025-05-29T14:30:00Z",
  "parameters": {
    "airQuality": 42,
    "waterQuality": 87,
    "radiation": 2.3,
    "soilHealth": 15
  },
  "status": "normal"
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### AWS S3 + CloudFront
```bash
# Build and sync to S3
npm run build
aws s3 sync build/ s3://your-bucket-name
```

## 🔐 Security

- **HTTPS Encryption** - All data transmission encrypted
- **API Authentication** - JWT-based authentication
- **Role-based Access** - User permissions management
- **Data Validation** - Input sanitization and validation
- **Environment Variables** - Sensitive data protection

## 📱 Mobile Support

The dashboard is fully responsive and supports:
- **iOS Safari** (iOS 12+)
- **Android Chrome** (Android 8+)
- **Progressive Web App** capabilities
- **Offline functionality** for critical features

## 🤝 Contributing

We welcome contributions from the environmental monitoring community!

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add documentation for new features
- Ensure all tests pass

## 📋 Roadmap

### Version 1.1 (Q3 2025)
- [ ] Machine learning anomaly detection
- [ ] Mobile app companion
- [ ] Advanced predictive analytics
- [ ] Multi-language support

### Version 1.2 (Q4 2025)
- [ ] Satellite data integration
- [ ] AI-powered insights
- [ ] Advanced GIS capabilities
- [ ] IoT sensor integration

## 📞 Support

### Technical Support
- **Email**: errs-support@epa.gov.lr
- **Phone**: +231-XXX-XXXX
- **GitHub Issues**: [Report Issues](https://github.com/epa-liberia/errs-dashboard/issues)

### Documentation
- **User Manual**: [docs/USER_MANUAL.md](./docs/USER_MANUAL.md)
- **API Documentation**: [docs/API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)
- **Deployment Guide**: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **EPA Liberia Staff** - Environmental monitoring expertise
- **UNEP** - Technical guidance and support
- **World Bank** - Funding and project support
- **React Community** - Open source framework and tools

---

**Developed by EPA Liberia - Environmental Research & Radiation Safety Department**

For more information, visit [epa.gov.lr](https://epa.gov.lr)
