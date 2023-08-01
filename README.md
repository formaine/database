# [FOR/Maine Database - Project Archive](https://formaine.netlify.app/)

## Overview

The FOR/Maine Database is a specialized tool constructed to foster investor attraction in the state of Maine. Created as part of the Forest Opportunity Roadmap (FOR/Maine) initiative, this database was initially developed in early 2020 and contains various data related to the state's forest industry, including population statistics, wages, trade, and energy prices.

## Deployment & Data Sources

- **Deployment**: The project is hosted and deployed on [Netlify](https://www.netlify.com/).
- **Data Sources**: Data is sourced both from GitHub and various external sources, serving as a repository for information pertinent to the forest industry in Maine.

## Important Notice (2022)
[CitySDK](https://github.com/uscensusbureau/citysdk#breaking-change-november-2022)
### Breaking Changes & Data Access

1. **Heroku Deprecation**: Affects client-side functionality in versions prior to 2.3.
2. **Migration to AWS**: Leads to potential breaks in server-side code.

As a result, the site no longer provides access to several data points. The original code has been preserved and commented out (e.g., `plotExportsPaper.jsx`).

### Version Update
To ensure continued functionality and alignment with current dependencies, it is essential to update to the latest versions of all packages. Be aware that there are multiple breaking changes that will require careful reworking to restore the app's functionality. This update process is vital for future development, particularly in light of security concerns. However, please note that the existing app remains stable and can continue to operate in its legacy state if no further modifications are planned.

## Technology Stack

### Key Packages

- Data Handling: `axios`, `react-query`
- Mapping: `mapbox-gl`, `react-mapbox-gl`
- Presentation & UI: `bootstrap`, `styled-components`, `plotly.js`,
- Routing: `react-router-dom`

### Project Structure & Routing

The application has two main routes, defined as follows:

```javascript
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, MillSites, DataHighlights } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/DataHighlights" exact component={() => <DataHighlights />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
```

the structure is as follows: 

```
├── App.js                        # Main application file
├── components                    # All reusable components
│   ├── Data                      # Data-related components
│   │   ├── Contact.jsx           
│   │   ├── Inventory.json        # JSON file with inventory data
│   │   ├── Investment Case.svg   # SVG file for investment case visualization
│   │   ├── Table                 # Table-related components
│   │   │   ├── Investment.jsx    # Investment table component
│   │   │   ├── PopTable.jsx      # Population table component
│   │   │   ├── TableContainer.jsx
│   │   │   ├── Wages.json        # JSON file with wages data
│   │   │   ├── WagesTable.jsx    # Wages table component
│   │   │   ├── filters.jsx       # Filters for tables
│   │   │   └── tableStyles.css   
│   │   ├── csvjson.json          # JSON data for CSV
│   │   ├── hsExports.jsx         # HS exports component
│   │   ├── investment.jsx        # Investment component
│   │   ├── investmentHover.css   # CSS for investment hover effect
│   │   ├── plotEIA.jsx           # Plot for EIA data
│   │   ├── plotExportsPaper.jsx  # Plot for paper exports
│   │   ├── plotExportsWood.jsx   # Plot for wood exports
│   │   ├── plotHarvest.jsx       # Plot for harvest data
│   │   ├── plotInventory.jsx     # Plot for inventory data
│   │   ├── scrollContact.jsx     # Scrollable contact component
│   │   ├── scrollStyles.css      
│   │   ├── selectGroups.jsx      
│   │   └── table.css             
│   ├── Home                      # Home page components
│   │   ├── Home.jsx              # Main home component
│   │   ├── Map                   # Map-related components
│   │   │   ├── Legend.jsx        # Legend for map
│   │   │   ├── Map.css           
│   │   │   ├── MapboxGLMap.jsx   # Mapbox GL map component
│   │   │   ├── layer.jsx         # Layer component for map
│   │   │   ├── layerStyles.css   
│   │   │   ├── legendStyle.css   
│   │   │   ├── optionsfield.jsx  # Options field for map
│   │   │   ├── sidebarStyles.css 
│   │   │   ├── sprite.svg        # SVG sprite for map
│   │   │   └── triangle.png      
│   │   ├── Plot                  # Plot-related components
│   │   │   ├── TableContainer.jsx
│   │   │   ├── filters.jsx       # Filters for plot
│   │   │   ├── plot.jsx          # Main plot component
│   │   │   ├── plotStyles.css    
│   │   │   └── tableStyles.css   
│   │   ├── accordion.jsx         
│   │   ├── accordionStyles.css   
│   │   ├── sliderStyles.css      
│   │   └── toggleStyles.css      
│   ├── Navigation.jsx            # Navigation component
│   ├── index.js                  # Index file for components
│   └── navbar.css                
├── index.css                     # General index styles
├── index.js                      # Main index file (entry point)
├── serviceWorker.js              
└── setupTests.js                 
```


## Legacy Preservation

This repository maintains the legacy code as a historical reference, reflecting the project's initial vision and early-stage development.

## Getting Started

To explore the updated version or delve into the preserved code, follow the instructions provided below.

### Installation Guide

1. Clone the repository
2. Install dependencies with `npm install`


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
When deploying to netlify remember to include a netlify.toml that includes the following (to handle redirects):

```
[build]
  functions = "functions"
  publish = "build"
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
