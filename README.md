# Paw-Tales

Paw-Tales is a full-stack pet care platform built with Next.js, React, MongoDB, and Tailwind CSS. It combines a modern e-commerce experience with a content-rich blog experience for pet owners, making it easy to discover pet care tips, browse products, save favorites, and complete purchases securely.

The project is designed as a single Next.js application with server-side API routes, dynamic pages, user-facing interactions, and payment integration for a polished end-to-end experience.

## Overview

Paw-Tales brings together three main experiences:

- Pet care content through blogs, categories, tags, and media-rich posts
- A pet products shop with product listings, cart, wishlist, and checkout
- User engagement features such as comments, likes, bookmarks, ratings, and profile-based activity

This project was built to feel like a complete marketplace and community platform rather than a simple demo app.

## Key Features

### 1. Modern Home Experience

- Hero section and landing page layout
- Category-based browsing
- Featured sections for blogs, reels, and products
- Responsive UI for mobile and desktop

### 2. Product Store

- Product listing and detail flow
- Product cards with images and quick interaction elements
- Inventory-aware product data
- Flexible product attributes such as size, weight, color, and measurement-based options (aligned with the project’s planned enhancements)
- Cart and wishlist support
- Checkout flow with payment integration

### 3. Blog Platform

- Customizable blog pages with title, subtitle, content sections, categories, and tags
- Image-supported blog posts
- Blog cards and content browsing experience
- User interaction support including views, likes, and comments

### 4. User Experience

- Login and signup flows
- User profile and account-related screens
- Saved blogs and personal content views
- Order and transaction tracking

### 5. Payments and Transactions

- Razorpay payment flow for checkout
- Order verification endpoints
- Transaction-oriented backend structure

## Tech Stack

| Layer            | Technologies                                                   |
| ---------------- | -------------------------------------------------------------- |
| Frontend         | Next.js 14, React 18, Tailwind CSS                             |
| UI Enhancements  | Framer Motion, Heroicons, Lucide React, React Icons            |
| State Management | Redux Toolkit, React Redux                                     |
| Backend          | Next.js API Routes, Node.js                                    |
| Database         | MongoDB with Mongoose                                          |
| Authentication   | Auth flows and user session handling via Next.js app structure |
| Payments         | Razorpay                                                       |
| Forms            | Formik, Yup                                                    |
| Utilities        | Axios, JWT, bcrypt, dotenv, js-cookie                          |

## Project Structure

```bash
src/
  app/
    api/              # API routes for auth, blogs, products, users, transactions, and Razorpay
    lib/              # MongoDB connection and Mongoose models
    _components/      # Reusable UI components like cards, buttons, comments, checkout, etc.
    _common/          # Shared header/footer/layout structure
    homepage/         # Main landing page sections
    blogs/            # Blog listing and blog detail pages
    store/            # Product store pages
    cart/             # Cart experience
    checkout/         # Checkout UI
    profile/          # User profile pages
    wishlist/         # Saved products/blogs experience
    add-product/      # Product creation UI
    blogs/add-blog/   # Blog creation experience
    paymentNode/      # Additional payment-related implementation assets
```

## Main Backend Models

The app uses Mongoose models for:

- Products
- Blogs
- Users
- Transactions
- Comments and ratings

These models support content creation, product management, user-generated interaction, and transaction tracking.

## Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd paw-tales
```

2. Install dependencies

```bash
npm install
```

3. Create an environment file

Create a file named `.env.local` in the project root and add the required values:

```env
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_TEST_KEY_ID=your_razorpay_key_id
RAZORPAY_TEST_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_public_razorpay_key
```

4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 to view the application.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Run the production build
npm run lint     # Run the Next.js linter
```

## API Highlights

The application includes API endpoints for:

- Product creation and listing: `/api/products`
- Blog creation and listing: `/api/blogs`
- User-related operations: `/api/users`
- Transaction handling: `/api/transactions`
- Razorpay order creation: `/api/razorpay/order`
- Razorpay signature verification: `/api/razorpay/verify`

## Development Notes

This project is structured to be expanded into a full production-ready pet commerce platform. Some of the most important enhancement areas already reflected in the codebase include:

- richer product variants and dynamic product listing options
- more advanced blog customization and content management
- improved admin-style workflows
- stronger order and inventory management
- deployment and production hardening

## Future Improvements

Potential next steps for the project include:

- Admin dashboard for product and blog management
- Advanced search and category filters
- Order status tracking and invoice generation
- Better image upload and media handling
- Deployment to Vercel or a cloud platform with a managed MongoDB instance

## License

This project does not currently declare a license file.
