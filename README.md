# Delivery - Ionic & Angular Mobile Application

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Submission Instructions](#submission-instructions)
- [Video Demonstration](#video-demonstration)

## Project Overview
This project is a mobile application built using **Ionic with Angular and TypeScript**. The application, **354 Delivery**, is designed for online food delivery, allowing customers to browse restaurants, place orders, and manage their accounts. The application is structured with four main pages:
1. **Home Page** – Displays a list of restaurants and their details.
2. **Search Page** – Allows searching for restaurants.
3. **Cart Page** – Displays selected orders with a checkout option.
4. **Account Page** – Allows users to manage their profiles and reorder previous purchases.

The app does not require a backend; all data is managed via **local storage**.

## Features
- **Restaurant Listings:** Displays four restaurants with their details.
- **Search Functionality:** Users can search for restaurants.
- **Cart Management:** Users can view, modify, and checkout orders.
- **Order Processing:** Automatically adds an item to the cart when a restaurant is selected.
- **User Account:** Users can edit their details and reorder previous orders.
- **Modals:** Payment success and help messages appear in modal pop-ups.

## Installation
Ensure you have **Node.js** and **Ionic CLI** installed. Follow these steps:

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd 354-Delivery
2. Install dependencies:
    npm install
3. Start the Ionic development server:
   ionic serve
