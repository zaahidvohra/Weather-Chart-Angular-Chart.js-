# Weather Chart Application

A modern Angular application for visualizing weather data with interactive charts and multiple city comparisons.

## Features

- **Interactive Weather Charts**: Visualize weather data using Chart.js
- **Multiple City Comparison**: Compare weather data across multiple cities simultaneously
- **Live Weather Data**: Real-time weather information display
- **Dynamic Multi-Series Charts**: Advanced charting capabilities for complex data visualization
- **Responsive Design**: Built with Angular Material and Bootstrap for mobile-friendly interface
- **Server-Side Rendering**: Enhanced performance with Angular Universal SSR

## Technology Stack

- **Frontend**: Angular 17.2.0
- **UI Framework**: Angular Material + Bootstrap 5.3.2
- **Charts**: Chart.js 4.4.1
- **Styling**: Angular Material (Indigo-Pink theme)
- **Backend**: Express.js for server-side rendering
- **Build Tools**: Angular CLI

## Project Structure

```
src/
├── app/
│   ├── chart/                 # Basic chart component
│   ├── live-chart/           # Real-time weather charts
│   ├── multi-series/         # Multi-series chart visualization
│   ├── multiple/             # Multiple city comparison
│   ├── multiple02/           # Enhanced multiple city view
│   ├── dynamic-multiple/     # Dynamic multiple city charts
│   ├── home/                 # Home page component
│   ├── navbar/               # Navigation component
│   └── api-service.service.ts # Weather API service
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zaahidvohra/Weather-Chart-Angular-Chart.js-.git
   cd Weather-Chart-Angular-Chart.js
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to the source files.

### Building

Build the project for production:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Server-Side Rendering

To run the application with SSR:
```bash
npm run serve:ssr:weather-chart
```

## Available Scripts

- `ng serve` - Start development server
- `ng build` - Build the project
- `ng test` - Run unit tests
- `ng build --watch` - Build with file watching
- `serve:ssr:weather-chart` - Run SSR server

## Components Overview

### Chart Component
Basic weather chart visualization with customizable data display.

### Live Chart Component
Real-time weather data visualization with automatic updates.

### Multiple City Components
- **Multiple**: Compare weather data across multiple cities
- **Multiple02**: Enhanced version with improved UI
- **Dynamic Multiple**: Dynamic addition/removal of cities for comparison

### Multi-Series Component
Advanced charting for displaying multiple weather parameters simultaneously.

## API Integration

The application uses weather APIs to fetch real-time data. API services are modularized for different components:
- `api-service.service.ts` - Main weather API service
- `multi-api.service.ts` - Multi-city API handling
- `multi02.service.ts` - Enhanced multi-city service

## Material Design Integration

The application uses Angular Material components:
- Date pickers for date range selection
- Form fields and inputs for city selection
- Buttons and icons for user interactions
- Progress indicators for loading states
- Checkboxes for feature toggles

## Deployment

This project is configured for deployment on Replit with:
- Automatic dependency installation
- Development and production build configurations
- Server-side rendering support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Acknowledgments

- Angular team for the excellent framework
- Chart.js for powerful charting capabilities
- Angular Material for beautiful UI components
- Weather API providers for data access
