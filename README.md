# BlueCart Marketplace

BlueCart Marketplace is a full-stack web application for searching, comparing, and analyzing products across multiple e-commerce platforms. It features a Python Flask backend and a modern React frontend, providing users with advanced filtering, sorting, and comparison tools for smarter online shopping.

## Features

- **Product Search:** Search for products across multiple platforms (e.g., eBay, Shopify, Amazon, etc.).
- **Advanced Filtering:** Filter products by price range, platform, and rating (with min/max controls).
- **Sorting:** Sort results by best value, price, rating, MB score, or CB score.
- **Pagination:** View products 10 per page with easy navigation.
- **Product Comparison:** Select up to 2 products to compare side-by-side, including all details and user reviews.
- **User Authentication:** Register, log in, and manage your profile. See your registration date and update your account info.
- **Responsive UI:** Clean, modern, and mobile-friendly design.

## Tech Stack

- **Backend:** Python, Flask, Flask-JWT-Extended, SQLAlchemy
- **Frontend:** React, React Router, Context API, Bootstrap
- **Database:** SQLite (default, can be swapped for other SQL databases)

## Project Structure

```
Phase-5-Bluecart/
├── main.py            # Entry point for Flask server
├── app.py             # Flask app factory
├── models.py          # SQLAlchemy models (User, Product, etc.)
├── auth.py            # Authentication routes and logic
├── api.py             # API endpoints for products, search, etc.
├── routes.py          # Additional Flask routes
├── extensions.py      # Flask extensions (db, JWT, etc.)
├── config.py          # App configuration
├── requirements.txt   # Python dependencies
├── frontend/          # React frontend app
│   ├── src/
│   │   ├── components/    # React components (ProductCard, FilterPanel, etc.)
│   │   ├── pages/         # Page components (Product, Profile, ComparePage, etc.)
│   │   ├── context/       # React Context for Auth and Search
│   │   ├── services/      # API service helpers
│   │   └── styles/        # CSS files
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── static/            # Static files (products.json, scripts, etc.)
├── instance/          # SQLite database
└── ...
```

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js & npm (for frontend)
- pipenv or pip for Python dependencies

### Backend Setup
1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
2. **Set up the database:**
   ```bash
   flask db upgrade  # or use provided seed.py if available
   ```
3. **Run the server:**
   ```bash
   python main.py
   # or for production
   gunicorn -w 4 -b 0.0.0.0:5000 main:app
   ```

### Frontend Setup
1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

### Environment Variables
- Configure backend settings in `config.py` (e.g., secret keys, DB URI).
- For frontend API proxy, see `frontend/src/setupProxy.js`.

## Usage
- Register or log in to access all features.
- Use the search bar to find products.
- Filter and sort results as needed.
- Select products to compare and view detailed side-by-side analysis.
- Manage your account and view your registration date in the profile section.

## API Endpoints (Backend)
- `/api/auth/register` — Register a new user
- `/api/auth/login` — Log in and receive JWT tokens
- `/api/auth/me` — Get current user info (including registration date)
- `/api/products` — Get/search products
- `/api/compare` — Compare selected products
- ...and more (see `api.py`, `auth.py`)

## Customization
- Add more product sources by extending the backend API.
- Adjust scoring logic (MB/CB) in backend and frontend as needed.
- Update styles in `frontend/src/styles/` for branding.

## License
MIT License

## Authors
- Elias Ayunga
- Erick Kipkoech
- Jeremiah Orodi
- Ahmed

---

For questions or contributions, please open an issue or submit a pull request.
