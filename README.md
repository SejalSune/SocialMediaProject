Connectopia

Description
🌟 Welcome to Connectopia! 🌟

Delighted to introduce my recent web development project! This is a user-friendly web application built with Node.js and Express.js, designed to empower users to create, edit, and delete posts effortlessly. With a sleek and intuitive interface, individuals can easily navigate through the platform to share their thoughts, experiences, and ideas with the world.

🔒 Ensuring Security: To safeguard user data and ensure a secure experience, all users are required to log in before accessing the platform's features. This adds an extra layer of protection and enhances the overall privacy of our users' information.

Installation

To get started with Connectopia on your local machine, follow these simple steps:
1. Clone the Repository: Begin by cloning this repository to your local machine. You can do this by running the following command in your terminal:
git clone <repository-url>
2. Navigate to the Project Directory: Once the cloning process is complete, navigate into the project directory using the following command:
cd project-directory
3. Install Dependencies: Now, it's time to install the necessary dependencies. You can do this by running the following command:
npm install
3. Set Up Environment Variables: Create a .env file in the root directory of the project and add the following environment variables:
make file named .env
- PORT=8080
- SESSION_SECRET=your_session_secret
- CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
- CLOUDINARY_API_KEY=your_cloudinary_api_key
- CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Make sure to replace your_session_secret, your_cloudinary_cloud_name, your_cloudinary_api_key, and your_cloudinary_api_secret with your actual values.
5. Run the Application: Once you've set up the environment variables, you're ready to run the application. Simply execute the following command:
nodemon index.js
The application will be up and running at http://localhost:8080 by default.

Dependencies

Connectopia relies on the following dependencies:

- cloudinary: ^2.1.0

- connect-flash: ^0.1.1

- dotenv: ^16.4.5

- ejs: ^3.1.9

- express: ^4.19.2

- express-session: ^1.18.0

- method-override: ^3.0.0

- mongoose: ^8.2.4

- multer: ^1.4.5-lts.1

- multer-storage-cloudinary: ^4.0.0

- passport: ^0.7.0

- passport-local: ^1.0.0
passport-local-mongoose: ^8.0.0

