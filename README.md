# DumbBot

## Description

DumbBot is a simple chatbot application built for a take-home coding challenge. While not the most intelligent bot, DumbBot is always ready to respond to your messages in a lazy style.

## Features

- **Homepage:** Allows users to start a chat session by entering their name.
- **Chat Page:** Enables users to engage in conversations with the bot.
- **Admin Page:** Provides a view of the history of all chat interactions.

## Technologies Used

- **Frontend:**
  - Next.js
  - React
  - Tailwind CSS
  - Shadcn
- **Backend:**
  - TypeScript
  - tRPC
- **Database:**
  - Prisma ORM
  - SQLite

## Getting Started

1. **Prerequisites:**
   - Node.js and npm (or yarn) installed on your system.
2. **Installation:**
   - Clone this repository
   - Navigate to the project directory: `cd DumbBot`
   - Install dependencies: `npm install`
3. **Create a `.env` file:**

   - Create a file named `.env` in the root of your project.
   - Add the following line to the `.env` file:
     ```
     DATABASE_URL="file:./db.sqlite"
     ```

4. **Initialize the Database:**

   - Run the following command to create the database:
     ```bash
     npm run db:push
     ```

**Note:** For simplicity, this project uses SQLite for the database. You don't need to set up a separate database server. The database file will be created automatically in the `./prisma/` directory when you run the development server.

5. **Running the App:**

   - Start the development server: `npm run dev`
   - Open your browser and visit `http://localhost:3000`

6. **Running E2E tests**
   - Run cypress: `npx cypress open`

## Author

Guilherme Siebert
