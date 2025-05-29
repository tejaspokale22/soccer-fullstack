```markdown
# Soccer Matches Fullstack App

A simple MERN stack application that displays upcoming soccer matches by date using the Football API from RapidAPI.

---

## Project Structure

```

/
├── client/      # React frontend (Vite + Tailwind CSS)
├── server/      # Express backend
├── .gitignore
├── README.md

````

---

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- RapidAPI account with **Football API** subscription

---

## Setup Instructions

### 1. Backend

1. Go to the `server` folder:

   ```bash
   cd server
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file in `server` folder (copy `.env.example`):

   ```
   PORT=10000
   RAPID_API_KEY=your_rapidapi_key_here
   RAPID_API_HOST=api-football-v1.p.rapidapi.com
   ```

4. Start backend server locally:

   ```bash
   npm run dev
   ```

   Server runs at: `http://localhost:10000`

---

### 2. Frontend

1. Go to the `client` folder:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update the API base URL in your frontend code (e.g. in `App.jsx`):

   ```js
   const API_URL = "http://localhost:10000/api/matches";
   ```

   > Replace with deployed backend URL when deployed, e.g. `https://soccer-fullstack.onrender.com/api/matches`

4. Run frontend locally:

   ```bash
   npm run dev
   ```

   Frontend runs at: `http://localhost:5173` (or port Vite chooses)

---

## API Endpoints

### Backend API

#### Fetch Matches by Date

* **Endpoint:**

  ```
  GET /api/matches?date=YYYY-MM-DD
  ```

* **Query Parameters:**

  | Parameter | Type   | Required | Description                            |
  | --------- | ------ | -------- | -------------------------------------- |
  | date      | string | Yes      | Date of matches in `YYYY-MM-DD` format |

* **Example Request:**

  ```
  GET https://soccer-fullstack.onrender.com/api/matches?date=2025-05-30
  ```

* **Response:**

  Returns a JSON array of matches scheduled on the given date with details such as teams, venue, league, and status.

---

### Original API Endpoint (RapidAPI Football API)

#### Fetch Fixtures by Date

* **Endpoint:**

  ```
  GET /v3/fixtures?date=YYYY-MM-DD
  ```

* **Base URL:**

  ```
  https://api-football-v1.p.rapidapi.com
  ```

* **Full Example Request:**

  ```
  GET https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2025-05-30
  ```

* **Headers:**

  | Header          | Value                          |
  | --------------- | ------------------------------ |
  | X-RapidAPI-Key  | your\_rapidapi\_key\_here      |
  | X-RapidAPI-Host | api-football-v1.p.rapidapi.com |

* **Description:**

  This API fetches soccer fixtures (matches) for the specified date, including details like teams, league, venue, and status.

* **Documentation:**

  [https://rapidapi.com/api-sports/api/api-football](https://rapidapi.com/api-sports/api/api-football)

---

## Deployment

* Backend deployed on Render: [https://soccer-fullstack.onrender.com/](https://soccer-fullstack.onrender.com/)
* Frontend can be deployed on Vercel or Netlify

Update frontend API base URL to use the backend deployed URL before deployment.

---

## Contact

For issues or questions, please contact: [your-email@example.com](mailto:your-email@example.com)

---

## License

MIT License

```
```
