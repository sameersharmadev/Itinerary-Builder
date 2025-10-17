# Vigovia Web Application

Vigovia is a React-based web application designed for generating travel itineraries. It allows users to input travel details, view a detailed itinerary, and download it as a PDF. The project is built using modern web development tools like Vite, TailwindCSS, and React.

## Features

- **Dynamic Itinerary Generation**: Users can input travel details and generate a detailed itinerary.
- **PDF Export**: Download the itinerary as a professionally formatted PDF.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Custom Styling**: TailwindCSS for consistent and modern UI design.
- **Component-Based Architecture**: Modular React components for scalability and maintainability.

## Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and optimized builds.
- **TailwindCSS**: For styling and custom utility classes.
- **React-to-Print**: For generating and exporting PDFs.
- **JavaScript**: Core programming language for the application.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vigovia.git
   ```

2. Navigate to the project directory:
   ```bash
   cd vigovia
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

## Project Structure

```
vigovia/
├── src/
│   ├── components/
│   │   ├── PDFPreview.jsx
│   │   ├── PrintableDayCard.jsx
│   │   ├── PrintableActivityTable.jsx
│   │   ├── PrintableHotelBookings.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── ItineraryForm.jsx
│   │   └── ...
│   ├── assets/
│   │   └── logo.png
│   ├── index.css
│   └── main.jsx
├── public/
│   └── index.html
├── README.md
└── package.json
```

## Components Overview

### `PDFPreview.jsx`
Handles the generation and preview of the PDF itinerary. Includes functionality for printing and exporting.

### `PrintableDayCard.jsx`
Displays details for each day in the itinerary, including activities and timeline.

### `PrintableActivityTable.jsx`
Generates a table of activities for the itinerary, including city, activity type, and time required.

### `PrintableHotelBookings.jsx`
Displays hotel booking details, including city, check-in/check-out dates, and hotel names.

### `ItineraryForm.jsx`
The main form for inputting travel details and generating the itinerary.

## Styling

The project uses TailwindCSS for styling. Custom utility classes are defined in `index.css` for gradients, colors, and scrollbar customization.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
