# Personal Finance Assistant

A simple personal finance assistant that helps you manage your expenses and income. This application allows you to track your financial transactions, categorize them, and generate reports to visualize your financial health.

## Demo link
https://drive.google.com/file/d/18pzJNyBp-wbqFFh1o_vSTsDctHYR1rSG/view?usp=drive_link 

## Features
- Add, edit, and delete transactions
- Categorize transactions (e.g., food, transport, entertainment)
- View transaction history
- Generate monthly and yearly financial reports
- User authentication (login/logout)
- Responsive design for mobile and desktop
- Receipt scanning using OCR and AI for automatic transaction entry
- Integration with Google for authentication
- Filter transactions by date, category, type (income/expense), and payment method

## Technologies Used
- Frontend: React.js, Material-UI, Vite
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens), OAuth2 with Google
- Email notifications: Nodemailer
- Receipt scanning: Tesseract.js, pdf-parse, pdf-poppler, Gemini API
- Charts and visualizations: Recharts

## Receipt scanning
The application supports receipt scanning using OCR, PDF parsing tools, and AI-powered extraction:
- **Tesseract** for extracting text from image receipts.
- **pdf-parse** and **pdf-poppler** for parsing and extracting data from PDF receipts.
- **Gemini API** for advanced extraction and understanding of receipt content.

This enables automatic entry of transaction details from both image and PDF receipts, leveraging AI for improved accuracy.

## Installation
1. Clone the repository:
   ```bash
    git clone https://github.com/lahariSane/Personal-Finance-Assistant
    cd Personal-Finance-Assistant
    ```
2. Install dependencies for both frontend and backend:
   ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```
3. Set up backend environment variables:
    Create a `.env` file in the `backend` directory and add your environment variables. For example:
    ```plaintext
    PORT=your_backend_port
    DATABASE_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    SESSION_SECRET=your_session_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_REDIRECT_URI=your_google_redirect_uri
    EMAIL_USER=your_email_address
    EMAIL_PASS=your_email_app_password
    GEMINI_API_KEY=your_gemini_api_key
    ```
    Replace the placeholder values with your actual credentials.

4. Set up frontend environment variables:
    Create a `.env` file in the `frontend` directory and add your environment variables. For example:
    ```plaintext
    VITE_PUBLIC_API_URL=backend_api_url
    VITE_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
    ```
    Replace the placeholder values with your actual configuration.

5. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
6. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5173` to access the application.

## API Endpoints
- **POST /api/auth/register**: Register a new user.
- **GET /api/verify:token**: Email verification endpoint.
- **POST /api/auth/login**: Log in an existing user.
- **GET /api/auth/google**: Redirect to Google for OAuth authentication.
- **GET /api/auth/google/callback**: Callback endpoint for Google OAuth authentication.
- **GET /api/auth/me**: Get the current user's profile information.
- **GET /api/auth/logout**: Log out the current user.

- **POST /api/transactions**: Add a new transaction.
- **GET /api/transactions**: Get all transactions for the authenticated user.
- **GET /api/transactions/:id**: Get a specific transaction by ID.
- **PUT /api/transactions/:id**: Update a specific transaction by ID.
- **DELETE /api/transactions/:id**: Delete a specific transaction by ID.

- **POST /api/receipt/upload**: Upload a receipt image or PDF for processing.


## Usage
Once the application is running, you can:
- Register a new account or log in with an existing account.
- Add new transactions by filling out the transaction form.
- View your transaction history and filter by date or category.
- Generate financial reports to visualize your income and expenses.
- Use the receipt scanning feature to automatically extract transaction details from images or PDFs.
