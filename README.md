# Admin-CMS & Store

Admin-CMS & Store is a comprehensive content management system integrated with an online store functionality. This project aims to provide a robust platform for managing website content and e-commerce operations efficiently.

## Table of Contents

- [Frontend-Estore](#frontendestore)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Security](#features)
- [Env.Example](#env.example)

## Frontend-Estore (Pages)
1) Product listing as home
2) Cart
3) Order (Success/Failure)

## Features

- User-friendly admin panel for managing website content
- Integrated e-commerce store with product management
- Customizable themes and templates
- Secure user authentication and authorization
- Order management and tracking
- Analytics and reporting tools
- Modal for store creation upon user registration
- CRUD operations for products
- Customer and order management
- Multiple store support with product listing
- Shopping cart functionality
- State management using RTK Query & Redux Toolkit
- Data tables with React Table (TanStack)
- Graphs and charts with Recharts
- Dashboard with total sales per month, sales quantity, and more calculations

## Usage

1. **User Registration:** When a user registers with a new account, a modal will appear prompting them to create a store by providing a store name. This process applies only to new accounts.
2. **Store Management:** After creating a store, users can perform CRUD operations on products and manage customers and orders.
3. **Storefront:** Once a store and products are created, they will be displayed on the storefront. Multiple stores with their product listings will be available for customers to browse and purchase items.
4. **Shopping Cart:** Customers can add products to their cart and proceed to checkout.
5. **Dashboard:** The admin dashboard provides an overview with total sales per month, sales quantity, and additional calculations rendered using Recharts.

## Security Features

Disable right-click context menu to prevent copying content
Prevent opening the browser's inspect tools
Implement CSRF protection to prevent Cross-Site Request Forgery attacks
Sanitize input data to prevent XSS (Cross-Site Scripting) attacks
Enforce secure HTTP headers to mitigate various security risks
Utilize content security policy (CSP) to restrict resources from unauthorized origins
cookies used for authentication and authorization, full backend authentication and authorize system.

## Installation

To get started with Store, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sandeep7567/Estore.git
   cd Estore OR estore

2. **Install dependency:**
    npm install

2. **Run in development:**
    npm run dev

3. **Build project:**
    npm build

4. **Build project:**
    npm 

**For Script use package.json for reference!**

## Example.env - frontend (Estore)
VITE_BACKEND_URL=http://localhost:4000/api/v1/
