# AI Trip Planner
###### This project is an AI-powered trip planning tool that helps users create and visualize travel itineraries. Built using React, Vite, and TailwindCSS, it integrates with AI services to enhance the user experience.

## Features
* <b>AI-powered itinerary creation:</b> Get personalized trip plans based on your preferences.
* <b>Interactive UI:</b> Navigate through your trips with ease using a sleek and responsive interface.
* <b>3D visualization:</b> Visualize your trips using Three.js for interactive and immersive experiences.
* <b>Fast build and deploy:</b> Built using Vite for fast development and production builds.

## Table of Contents

1. Installation
2. Usage
3. Project Structure
4. Available Scripts
5. Contributing
6. License

## Clone the repository:

`git clone: https://github.com/ganesh2925/AI-Trip-Planner`
`cd ai-trip-planner`

## Install dependencies:

`npm install`

## Set up environment variables:
Rename .env.local.example to .env.local and fill in the necessary environment variables, including API keys for services (Google Maps, AI API, etc.).

## Run the development server:

`npm run dev`
The application will be running at `http://localhost:5173/`.

## Usage

* <b>Create a Trip:</b> Go to the "Create Trip" page and enter your travel details.
* <b>AI Suggestions:</b> Let the AI suggest optimized itineraries based on your preferences.
* <b>Trip Visualization:</b> Use the built-in 3D visualization tool to view your travel routes and destinations.

## Project Structure

`├── public/                # Static assets`
`├── src/`
`│   ├── assets/            # Images, icons, and static files`
`│   ├── components/        # Reusable UI components`
`│   ├── create-trip/       # Components related to creating a trip`
`│   ├── service/           # API services and utilities`
`│   ├── view-trip/         # Components for viewing trips`
`│   ├── App.jsx            # Main app component`
`│   ├── main.jsx           # Application entry point`
`├── .env.local             # Environment variables (example file)`
`├── package.json           # Project metadata and dependencies`
`├── vite.config.js         # Vite configuration`
`└── tailwind.config.js     # Tailwind CSS configuration`

## Available Scripts

`npm run dev` : Run the development server.
`npm run build` : Create a production build of the app.
`npm run serve` : Serve the production build locally.
`npm run lint` : Run the linter to check for code issues.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new feature branch `git checkout -b feature/my-feature`
3. Commit your changes `git commit -m 'Add some feature`
4. Push to the branch `git push origin feature/my-feature`
5. Open a pull request.