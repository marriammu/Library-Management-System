# Library-Management-System

## Setting Up and Running the Application:

1. **Install Dependencies:**

   - Ensure you have Node.js and npm installed on your machine.
   - Run `npm install` to install the required packages.

2. **Database Setup:**

   - Make sure you have MySQL installed and running.
   - change dbConfig in bookModel, borrowerModel, borrowingModel to your host , user and password for MySQL

3. **Run the Application:**
   - Execute `node server.js` to start the server.
   - The application will be running on `http://localhost:3000` by default.

## API Endpoints Documentation:

## Borrowers

### 1. Register a Borrower

- **Endpoint:** `POST /borrowers`
- **Input:**
  ```json
  {
    "name": "Borrower Name",
    "address": "Cairo",
    "email": "borrower.email@example.com"
  }
  ```
- **Output:**
  ```json
  {
    "message": "Borrower registered successfully"
  }
  ```

### 2. Update a Borrower

- **Endpoint:** `PUT /borrowers/:id`
- **Input:**
  ```json
  {
    "name": "Updated Name",
    "address": "Cairo",
    "email": "borrowerupdated.email@example.com"
  }
  ```
- **Output:**
  ```json
  {
    "message": "Borrower updated successfully"
  }
  ```

### 3. Delete a Borrower

- **Endpoint:** `DELETE /borrowers/:id`
- **Output:**
  ```json
  {
    "message": "Borrower deleted successfully"
  }
  ```

### 4. Get All Borrowers

- **Endpoint:** `GET /borrowers`
- **Output:**
  ```json
  [
    {
      "id": 1,
      "name": "Borrower Name",
      "address": "Cairo",
      "email": "borrower.email@example.com",
      "registeredDate": "2023-12-24 10:00:00 PM"
    }
    # ... other borrowers
  ]
  ```

## Books

### 1. Add a Book

- **Endpoint:** `POST /books`
- **Input:**
  ```json
  {
    "title": "Book Title",
    "author": "Author name",
    "ISBN": "1234567890",
    "availableQuantity": 10,
    "shelfLocation": "A-1"
  }
  ```
- **Output:**

  ```json
  {
    "message": "Book added successfully",
    "bookId": 1
  }
  ```

### 2. Update a Book

- **Endpoint:** `PUT /books/:id`
- **Input:**

  ```json
  {
    "title": "Updated Book Title",
    "author": "Author Name",
    "ISBN": "0987654321",
    "availableQuantity": 5,
    "shelfLocation": "B-2"
  }
  ```

- **Output:**

  ```json
  {
    "message": "Book updated successfully"
  }
  ```

### 3. Delete a Book

- **Endpoint:** `DELETE /books/:id`
- **Output:**

  ```json
  {
    "message": "Book deleted successfully"
  }
  ```

### 4. Get All Books

- **Endpoint:** `GET /books`
- **Output:**

  ```json
  [
    {
      "id": 1,
      "title": "Book Title",
      "author": "Authon Name",
      "ISBN": "1234567890",
      "availableQuantity": 10,
      "shelfLocation": "A-1"
    }
    # ... other books
  ]
  ```

### 5. Search for Books

- **Endpoint:** `GET /books/search?title=&author=&ISBN=`
- **Output:**

  ```json
  [
    {
      "id": 1,
      "title": "Book Title",
      "author": "Authon Name",
      "ISBN": "1234567890",
      "availableQuantity": 10,
      "shelfLocation": "A-1"
    }
    # ... other matching books
  ]
  ```

## Borrowing

### 1. Book Checkout

- **Endpoint:** `POST /borrowing/checkout`
- **Input:**

  ```json
  {
    "borrowerId": 1,
    "bookId": 2
  }
  ```

- **Output:**

  ```json
  {
    "message": "Book checked out successfully"
  }
  ```

### 2. Book return

- **Endpoint:** `POST /borrowing/return`
- **Input:**

  ```json
  {
    "borrowerId": 1,
    "bookId": 2
  }
  ```

- **Output:**

  ```json
  {
    "message": "Book returned successfully"
  }
  ```

### 3. Borrowed Books

- **Endpoint:** `GET /borrowing/borrowers/:id/books`

- **Output:**

  ```json
  [
    {
      "title": "Book Title",
      "author": "Author Name",
      "ISBN": "1234567890",
      "dueDate": "2023-12-30 10:00:00.00"
    }
    # ... other checked-out books
  ]
  ```

### 4. Book Overdue

- **Endpoint:** `POST /borrowing/overdue`

- **Output:**

  ```json
  [
    {
      "title": "Overdue Book Title",
      "author": "Author Name",
      "ISBN": "0987654321",
      "dueDate": "2023-12-23 10:00:00"
    }
    # ... other overdue books
  ]
  ```

## Reports

### 1. Borrowing Process Report

- **Endpoint:** `GET /reports/borrowing-process?startDate=2023-01-01&endDate=2023-12-31"`

- **Output:**

- Excel file containing borrowing process data with columns:

  - Borrower Name
  - Book Title
  - Borrowing Date

### 2. Borrowing Process Last Month

- **Endpoint:** `GET /reports/borrowing-process-last-month/`
- **Output:**

- Excel file containing borrowing process data for the last month with columns:

  - Borrower Name
  - Book Title
  - Borrowing Date

### 3. Overdue Last Month

- **Endpoint:** `GET /reports/overdue-last-month/`
- **Output:**

  - Excel file containing overdue books data for the last month with columns:
    - Borrower Name
    - Book Title
    - Borrowing Date

  **Note:**

- Ensure that the MySQL database is running and accessible.
- Adjust the database connection details in the `borrowerModel.js` ,`borrowingModel.js`, `bookModel.js` file.
- Customize the error messages and responses based on your application requirements.
- Update the API documentation as needed for future changes.
