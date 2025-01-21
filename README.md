
# Pharmacy Orders API

The **Pharmacy Orders API** is a backend service for managing pharmacy orders. It supports functionalities like adding new orders, retrieving all orders, and deleting orders by ID. This project is built using **Node.js**, **Express**, and **MongoDB**.

---

## Features

- **Create Orders**: Add new pharmacy orders with customer and medicine details.
- **View Orders**: Retrieve all existing pharmacy orders.
- **Delete Orders**: Remove an order by its unique ID.

---

## Prerequisites

- **MongoDB** (Local or Atlas cloud instance)
- **npm** (comes with Node.js)

---

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd pharmacy-orders-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure MongoDB
- **Local MongoDB**:
  - Ensure MongoDB is running on your system.

- **MongoDB Atlas**:
  1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  2. Obtain your connection string and replace placeholders (`<username>`, `<password>`, `<database-name>`).
  3. Example:
     ```plaintext
     mongodb+srv://Username:Password@cluster0.mongodb.net/pharmacyDB?retryWrites=true&w=majority
     ```

### 4. Update the Connection String
In the code, replace the `mongoURI` variable in `index.js` with your connection string.

---

## Running the API

### Start the Server
```bash
node index.js
```

### API Endpoints

#### **1. Add an Order**
- **Endpoint**: `POST /api/orders`
- **Request Body**:
  ```json
  {
    "customerName": "John Doe",
    "medicineName": "Paracetamol",
    "quantity": 2
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order added successfully.",
    "order": {
      "_id": "63c13d2e93c8a0009d7b2abc",
      "customerName": "John Doe",
      "medicineName": "Paracetamol",
      "quantity": 2,
      "status": "Pending",
      "createdAt": "2025-01-20T12:34:56.789Z",
      "updatedAt": "2025-01-20T12:34:56.789Z",
      "__v": 0
    }
  }
  ```

#### **2. View All Orders**
- **Endpoint**: `GET /api/orders`
- **Response**:
  ```json
  [
    {
      "_id": "63c13d2e93c8a0009d7b2abc",
      "customerName": "John Doe",
      "medicineName": "Paracetamol",
      "quantity": 2,
      "status": "Pending",
      "createdAt": "2025-01-20T12:34:56.789Z",
      "updatedAt": "2025-01-20T12:34:56.789Z",
      "__v": 0
    }
  ]
  ```

#### **3. Delete an Order**
- **Endpoint**: `DELETE /api/orders/:id`
- **Response**:
  ```json
  {
    "message": "Order deleted successfully."
  }
  ```

---

## Project Structure
```plaintext
pharmacy-orders-api/
├── index.js        # Main API logic
├── package.json    # Project metadata and dependencies
├── package-lock.json
```

---

## Extra Information

### Environment Variables
For security, you can store sensitive information like the MongoDB URI in a `.env` file.

1. Install **dotenv**:
   ```bash
   npm install dotenv
   ```

2. Create a `.env` file in the project root:
   ```plaintext
   MONGO_URI=mongodb+srv://myUser:myPassword@cluster0.mongodb.net/pharmacyDB?retryWrites=true&w=majority
   ```

3. Update the connection logic in `index.js`:
   ```javascript
   require('dotenv').config();
   const mongoURI = process.env.MONGO_URI;
   ```

### Testing
You can use tools like **Postman** or **curl** to test the API endpoints.
