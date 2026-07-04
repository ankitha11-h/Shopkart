# 🛒 ShopKart

ShopKart is a modern, responsive, and fully featured single-page e-commerce web application built using **React.js**, **Vite**, **React Router DOM**, and **Vanilla CSS**.

It demonstrates component architecture, global state management using React Context API, local storage data persistence, custom hooks, debouncing, pagination, and clean responsive user interface designs.

---

## ✨ Features

- **🛍️ Product Catalog**: Browse a dataset of 20 realistic items distributed across 6 shopping categories (Men's Clothing, Women's Clothing, Electronics, Home & Kitchen, Footwear, and Accessories).
- **⏱️ Loading Skeletons**: Simulated asynchronous loading states using animated card placeholders (`SkeletonCard`) before the catalog mounts.
- **🔍 Debounced Search & Sorting**: Search for items with a custom 500ms debounce timer (to optimize search performance) along with category filters, sort by price/title, and pagination (displays 6 items per page).
- **🛒 Cart & Wishlist**: Manage items, adjust quantities, calculate totals, and save favorites. Synced directly with `localStorage` so changes persist through page reloads.
- **✨ Recently Viewed Products**: Tracking section on the product details page showing the latest 4 visited items in order, filtering out duplicates and the currently active product.
- **🌓 Light / Dark Theme**: Smooth theme-switching system using React Context API that persists preference to local storage and updates variables globally.
- **📱 Responsive Layout & Navigation**: Adaptable header layout containing an animated mobile sliding navigation drawer, custom button configurations, and flexbox boundaries.
- **💳 Checkout Flow**: Frontend checkout screen containing address forms, fields validator, order item summaries, and a redirect countdown on successful placement.
- **🧱 Wildcard 404 Page**: Custom modern 404 wildcard component handling invalid routes.

---

## 🛠️ Technology Stack

- **Framework & Tooling**: React.js (v18+), Vite, npm
- **Routing**: React Router DOM (v6+)
- **Notifications**: React Toastify
- **Styling**: Vanilla CSS with custom properties (CSS variables) for theme integration.

---

## 📂 Project Structure

```text
ShopKart/
├── public/
├── src/
│   ├── assets/              # Standard image resources
│   ├── components/          # Reusable component elements
│   │   ├── Navbar.jsx       # Header navigation bar & mobile slide-out drawer
│   │   ├── Navbar.css       # Mobile drawer transitions & theme toggles styling
│   │   ├── ProductCard.jsx  # Reusable product detail grid display card
│   │   ├── ProductCard.css  # Hover micro-animations & dark/light colors
│   │   ├── SkeletonCard.jsx # Loading skeletons component
│   │   └── SkeletonCard.css # Skeletons keyframe shimmers styling
│   │
│   ├── context/             # React Context Providers for State management
│   │   ├── CartContext.jsx      # Global state for cart items & local storage syncing
│   │   ├── WishlistContext.jsx  # Global state for wishlist items & local storage syncing
│   │   └── ThemeContext.jsx     # Light/Dark stylesheet toggles and selectors
│   │
│   ├── data/                # Dataset declarations
│   │   └── ProductsData.js  # Realistic e-commerce products (20 items)
│   │
│   ├── pages/               # Routing page components
│   │   ├── Home.jsx         # Redirect root or landing catalog page
│   │   ├── Products.jsx     # Debounced searches, filters, pagination, and grids
│   │   ├── Products.css     # Pagination, search input, and select fields design
│   │   ├── ProductDetails.jsx # Detailed details with recently viewed panel
│   │   ├── ProductDetails.css # Tabular summary details stylesheet
│   │   ├── Wishlist.jsx     # Wishlist grid list
│   │   ├── Wishlist.css     # Wishlist pages styles
│   │   ├── Cart.jsx         # Cart items management table
│   │   ├── Cart.css         # Quantity buttons & summary card formatting
│   │   ├── Checkout.jsx     # Checkout shipping address entry form
│   │   ├── Checkout.css     # Flexbox column widths & Order Summary layouts
│   │   ├── NotFound.jsx     # Modern wildcard redirect layout
│   │   └── NotFound.css     # 404 details styling
│   │
│   ├── App.jsx              # Routing structures and wrapped context providers
│   ├── App.css              # Global utility layout styles
│   ├── index.css            # CSS variables for themes & CSS resets
│   └── main.jsx             # Entry point mount
│
├── package.json             # Package configuration & dependencies
├── vite.config.js           # Build settings
└── README.md                # Documentation
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ankitha11-h/Shopkart.git
   ```

2. **Navigate to project directory**:
   ```bash
   cd ShopKart
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser to the URL displayed in the terminal (typically `http://localhost:5173`).

5. **Build for production**:
   ```bash
   npm run build
   ```