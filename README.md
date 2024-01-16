## Project Name: Customer Feedback System

### Description
This project consists of a Live customer feedback portal using Socket.io that allows users to provide feedback on various products.

### Frontend (customer-feedback-frontend)

#### Prerequisites
- Node.js installed
- NPM (Node Package Manager) installed
- React development environment

#### Setup Instructions
1. Clone the repository:
   git clone https://github.com/your-username/customer-feedback-system.git

2. Navigate to the frontend directory:
   cd customer-feedback-frontend

3. Install dependencies:
   npm install

4. Run the frontend application:
   npm start
   The application will be accessible at `http://localhost:3000`.

### Backend (customer-feedback-portal)

#### Prerequisites
- Node.js installed
- NPM (Node Package Manager) installed
- MongoDB installed and running
- Nodemon (for development)

#### Setup Instructions
1. Navigate to the backend directory:
   cd customer-feedback-portal

2. Install dependencies:
   npm install

3. Run the backend application:
   - For production:
     npm start
   - For development (with nodemon):
     npm run dev
     
   The server will be accessible at `http://localhost:3001`.

### Steps to view in browser
1. Open the frontend application in your web browser (`http://localhost:3000`).
2. Explore the list of products, view details, and provide feedback.
3. Admin login: username - admin, password - admin (customize as needed).
4. Admins can delete feedback.

### Additional Very Important Notes
- Make sure MongoDB is running.
- Adjust frontend/backend connection URLs if necessary.

### To add products signup as admin :
- just make the username **admin**
- ![image](https://github.com/RohitSingh555/Customer-feedback-portal/assets/106096232/b9c7b28b-b919-4f5b-8603-2ef3d879b97b)

- then login with the account only then will you see the add product form
- ![image](https://github.com/RohitSingh555/Customer-feedback-portal/assets/106096232/df5fffd0-2974-437e-8db4-6b4818fba532)

- Then just click on view details of the product and you will see product details page
![image](https://github.com/RohitSingh555/Customer-feedback-portal/assets/106096232/47c62fab-353a-4849-9771-aa88734d31a1)
- Here you will find feedback form that you can use to provide feedback on that particular product
![image](https://github.com/RohitSingh555/Customer-feedback-portal/assets/106096232/941a0038-14d1-4374-b333-7277c8a7900e)

- updates are live because we have used socket.io
