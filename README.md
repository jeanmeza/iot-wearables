# IoT Wearables Project

## Overview

This project is a Node-RED application designed to simulate, process, and visualize data from IoT wearable sensors for cyclists. It provides a real-time monitoring dashboard for individual cyclists and aggregated team data, leveraging MQTT for communication.

## Key Features

*   **Multi-Cyclist Simulation**: Simulates realistic sensor data (GPS, speed, cadence, heart rate, breathing rate, stress level) for up to three cyclists.
*   **Node-RED Flows**: Core logic for data generation, transformation, MQTT publishing, and dashboard integration is managed through Node-RED flows.
*   **Real-time Dashboard**: Visualizes sensor data using a custom Node-RED dashboard, including a `MulticolorGauge.js` for enhanced data representation.
*   **MQTT Integration**: Utilizes MQTT for seamless data streaming and communication between simulated sensors and the Node-RED application.

## Project Structure

*   `flows.json`: Main Node-RED flow definitions.
*   `package.json`: Project metadata and Node-RED dependencies.
*   `public/`: Contains custom static assets for the dashboard, including `MulticolorGauge.js`.

## Dependencies

This project relies on Node-RED and the following Node-RED modules:

*   `node-red-dashboard`
*   `node-red-contrib-web-worldmap`
*   `node-red-contrib-ui-artless-gauge2`

## Setup and Usage

1.  **Install Node-RED**: If not already installed, follow the official Node-RED installation guide.
2.  **Unzip Project**: Extract the project archive to your desired location.
3.  **Install Dependencies**: Navigate to the project directory and run `npm install`.
4.  **Configure Node-RED `settings.js`**: Update your Node-RED `settings.js` file to include the `public` directory as a static HTTP path and enable projects. Example configuration:

    ```javascript
    module.exports = {
      httpStatic: '/home/<your username>/.node-red/projects/iot-wearables/public',
      editorTheme: {
        projects: {
          enabled: true,
        },
      },
    };
    ```
    *   **Note**: Adjust the `httpStatic` path to your actual project location.

5.  **Start Node-RED**: Run `node-red` from your terminal.
6.  **Load Project**: Import `flows.json` into your Node-RED editor if not automatically loaded.
7.  **Access Dashboard**: Open `http://localhost:1880/ui` in your browser to view the real-time dashboard.

## Wokwi and External Tools

The project can integrate with Wokwi simulations for various sensors and utilizes tools like MQTT Explorer for testing and the Howdy Sensor Simulator for additional data sources.
- Wokwi GPS generator (https://wokwi.com/projects/438187136719744001)
- Speed (https://wokwi.com/projects/438185450258136065)
- Cadence (https://wokwi.com/projects/438185826037399553)
- Gear-ratio (https://wokwi.com/projects/438186215363214337)
- Breath-rate (https://wokwi.com/projects/438184336445964289)
- Heart-rate (https://wokwi.com/projects/438183875548528641)

## Author

- Sahar Ramezani Jolfaei
- Jean Carlo Meza

