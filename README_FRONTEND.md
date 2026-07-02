# Swayanshu Wellness Coaching Portal - Frontend & API Specification

This document provides a comprehensive guide to the frontend architecture, state management, and the exact API specifications expected from the backend. 

You can feed this file directly to an AI assistant (like Claude) to generate a fully production-ready backend that seamlessly integrates with this frontend.

---

## 1. Project Overview
**Swayanshu Wellness Coaching Portal** is a premium, highly responsive web application designed for personal fitness training, habit tracking, and custom intake assessments. 

It contains:
- **Client Dashboard & Habit Focus**: Checklists for daily wellness goals.
- **Interactive Calculators**: Client-side energy expenditure (BMR/TDEE) and hydration indicators.
- **Coaching Program Funnels**: Interactive Value Ladder stairs allowing clients to explore and enroll in training programs.
- **Guidance intake Blueprint**: A multi-step physical intake wizard calculating precise calories, macros, hydration baselines, and customized workout/cardio/dietary plans.
- **User Authentication**: Email/Password credentials and Social Google login integration.

---

## 2. Frontend Tech Stack
- **Framework**: Next.js (v16.x, App Router)
- **Library**: React 19 (TypeScript)
- **Styling**: Tailwind CSS v4 (using clean custom variables, glassmorphism panel styles, and smooth animation transitions)
- **Social Login**: Client-side Firebase SDK (`signInWithPopup` using Google Auth provider)
- **HTTP Client**: Vanilla Fetch API

---

## 3. Directory Structure
```text
wellness-form/
├── app/
│   ├── components/
│   │   ├── AuthView.tsx          # Login, Registration, and Google Sign-in forms
│   │   ├── GuidanceFormTab.tsx   # Multi-step assessment wizard & final report view
│   │   ├── HomeTab.tsx           # Dashboard, Habit tracker, and simple calculators
│   │   ├── ProgramsTab.tsx       # Coaching catalog and value ladder modal
│   │   ├── ResultsTab.tsx        # Coach transformations slider and credentials
│   │   └── Sidebar.tsx           # Navigation panel and user profile block
│   ├── favicon.ico
│   ├── globals.css               # Core styling tokens & utility rules
│   ├── layout.tsx                # App shell wrapper
│   ├── lib/
│   │   └── firebase.js           # Firebase Client Initialization
│   └── page.tsx                  # Main router and tab coordination state
├── package.json
└── tsconfig.json
```

---

## 4. State & Authentication Workflow
1. **Auth Token Persistence**: On successful login/signup, the frontend stores a JWT token in `localStorage` under `"authToken"` and user details under `"user"`.
2. **Session Verification**: On mount, the frontend reads `"authToken"`. If found, it queries `GET /api/auth/me` with `Authorization: Bearer <token>` to verify validity.
3. **Google Sign-In**:
   - The user signs in via a Firebase Auth Popup on the client side.
   - The client retrieves a Google `idToken` from Firebase.
   - The client POSTs the `idToken` to `POST /api/auth/google`.
   - The backend validates the signature/decode of the token, registers/finds the user, and signs a custom app JWT token returned to the client.

---

## 5. Database Schema & Models
The backend needs to store three core schemas: **Users**, **Assessments**, and **HabitRecords**.

### User
```typescript
interface User {
  id: string;            // Unique identifier
  name: string;          // User's full name
  email: string;         // Unique email address
  passwordHash: string;  // Hashed password (empty for Social/Google logins)
  createdAt: string;     // ISO Timestamp
}
```

### Assessment
```typescript
interface Assessment {
  id: string;
  userId: string;        // Foreign key linking to User.id
  formData: {
    name: string;
    email: string;
    age: string;
    gender: "male" | "female";
    weight: string;      // in kg
    height: string;      // in cm
    targetWeight: string;// in kg
    activity: "1.2" | "1.375" | "1.55" | "1.725"; // Sedentary, Light, Moderate, Heavy
    goal: "lose" | "build" | "maintain";
    diet: "none" | "vegetarian" | "vegan" | "keto" | "lowcarb";
    sleep: "poor" | "average" | "good";
  };
  report: {
    bmr: number;             // Basal Metabolic Rate (kcal)
    tdee: number;            // Total Daily Energy Expenditure (kcal)
    calories: number;        // Target Daily Calories (kcal)
    water: number;           // Target Daily Hydration (Litres)
    protein: number;         // Target Daily Protein (grams)
    carbs: number;           // Target Daily Carbohydrates (grams)
    fats: number;            // Target Daily Fats (grams)
    goalTag: string;         // e.g. "Lean Fat Loss (Calorie Deficit)"
    workoutStrategy: string; // Tailored lifting strategy text
    cardioStrategy: string;  // Tailored cardio advice text
    dietStrategy: string;    // Diet-specific nutrition suggestions
  };
  status?: "draft" | "finalized";
  createdAt: string;        // ISO Timestamp
}
```

### HabitRecord
```typescript
interface HabitItem {
  id: number;
  text: string;
  checked: boolean;
}

interface HabitRecord {
  id: string;
  userId: string;        // Foreign key linking to User.id
  date: string;          // Format: YYYY-MM-DD
  habits: HabitItem[];   // Daily check status for each habit
  updatedAt: string;     // ISO Timestamp
}
```

---

## 6. API Endpoint Specifications

All endpoints communicate using **JSON payloads** and expect responses in JSON format. Authenticated routes require a Bearer token:
`Authorization: Bearer <token>`

### 6.1 Authentication Endpoints

#### `POST /api/auth/signup`
Creates a new user profile.
- **Request Body**:
  ```json
  {
    "name": "Sarah Jenkins",
    "email": "sarah@example.com",
    "password": "securepassword123"
  }
  ```
- **Responses**:
  - **201 Created**:
    ```json
    {
      "token": "eyJhbGciOi...",
      "user": {
        "id": "u92js7a",
        "name": "Sarah Jenkins",
        "email": "sarah@example.com"
      }
    }
    ```
  - **400 Bad Request** (e.g. Email already registered, invalid inputs)

#### `POST /api/auth/login`
Authenticates user using email and password.
- **Request Body**:
  ```json
  {
    "email": "sarah@example.com",
    "password": "securepassword123"
  }
  ```
- **Responses**:
  - **200 OK**:
    ```json
    {
      "token": "eyJhbGciOi...",
      "user": {
        "id": "u92js7a",
        "name": "Sarah Jenkins",
        "email": "sarah@example.com"
      }
    }
    ```
  - **401 Unauthorized** (Invalid email or password)

#### `POST /api/auth/google`
Authenticates a user via Google client-side Firebase idToken.
- **Request Body**:
  ```json
  {
    "idToken": "google-firebase-id-token-string"
  }
  ```
- **Logic**:
  - Verify signature of Firebase ID token (or fall back to decoding in development).
  - Extract `email` and `name` from the token.
  - If user doesn't exist, create a new User record with an empty password.
  - Issue app-specific JWT.
- **Responses**:
  - **200 OK**: Return payload matching `POST /api/auth/login`.
  - **400 Bad Request** (Failed to authenticate token).

#### `GET /api/auth/me`
Verifies user session token and returns latest profile metadata.
- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - **200 OK**:
    ```json
    {
      "user": {
        "id": "u92js7a",
        "name": "Sarah Jenkins",
        "email": "sarah@example.com"
      }
    }
    ```
  - **401 Unauthorized** (No token / expired token)

---

### 6.2 Assessment Endpoints

#### `POST /api/assessment`
Submits a client's physical metrics, runs calculations, saves report, and returns the computed blueprint.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "Sarah Jenkins",
    "email": "sarah@example.com",
    "age": "28",
    "gender": "female",
    "weight": "68",
    "height": "165",
    "targetWeight": "60",
    "activity": "1.375",
    "goal": "lose",
    "diet": "vegetarian",
    "sleep": "average"
  }
  ```
- **Assessment Engine Calculations (To Be Run on Backend)**:
  - **BMR (Harris-Benedict Formula)**:
    - *Male*: `88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)`
    - *Female*: `447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age)`
  - **TDEE**: `BMR * activityMultiplier`
  - **Target Calories**:
    - *Goal `lose` (Fat Loss)*: `TDEE - 500`
    - *Goal `build` (Hypertrophy)*: `TDEE + 300`
    - *Goal `maintain` (Maintenance)*: `TDEE`
  - **Hydration (Water baseline)**: `(weight * 35) / 1000` (in Litres, rounded to 1 decimal place)
  - **Protein (grams)**:
    - *Goal `maintain`*: `weight * 1.6`
    - *Goal `lose` / `build`*: `weight * 2.0`
  - **Fats (grams)**: `(Target Calories * 0.25) / 9` (25% of calories split, 9 kcal/g)
  - **Carbs (grams)**: `(Target Calories - (Protein * 4) - (Fats * 9)) / 4` (Remainder, 4 kcal/g)
  - **Workout Strategy Text**:
    - *Goal `lose`*: `"Perform 3 resistance sessions/week. Emphasize multi-joint compounds (Squats, DB presses, Rows) to retain lean tissue while in a deficit."`
    - *Goal `build`*: `"Perform 4 progressive-overload strength splits/week (e.g. Upper/Lower split). Focus on volume progression and slow eccentric contractions."`
    - *Goal `maintain`*: `"Perform 3 balanced full-body sessions/week, focusing on functional movement, stabilizer strength, and postural correction."`
  - **Cardio Strategy Text**:
    - *Goal `lose`*: `"Target 10,000 steps daily. Keep cardio low-impact (Zone-2 walking or incline treadmills) to protect muscle mass and manage recovery fatigue."`
    - *Goal `build`*: `"Limit intense cardio to 1-2 sessions/week. Focus on active restoration to maximize recovery and caloric utilization for muscle synthesis."`
    - *Goal `maintain`*: `"Engage in 2 Zone-2 cardio sessions (35-45 mins) to optimize mitochondrial efficiency and heart-rate recovery."`
  - **Diet Strategy Text**:
    - *Diet `vegan` or `vegetarian`*: `"Ensure protein target is met using organic tofu, tempeh, lentils, and clean supplementation. Take {protein}g daily. Consider adding clean vegan pea protein to your smoothies."`
    - *Diet `keto` or `lowcarb`*: `"Focus on healthy fat sources (avocados, extra virgin olive oil, nuts, wild salmon) while maintaining high protein to safeguard lean muscle."`
    - *Diet other*: `"Prioritize whole-food protein sources (lean beef, chicken breast, wild cod, eggs) combined with complex carbohydrates (sweet potatoes, oats, quinoa)."`
- **Responses**:
  - **210 Created / 200 OK**:
    ```json
    {
      "id": "report789",
      "userId": "u92js7a",
      "formData": { ... },
      "report": {
        "bmr": 1445,
        "tdee": 1987,
        "calories": 1487,
        "water": 2.4,
        "protein": 136,
        "carbs": 134,
        "fats": 41,
        "goalTag": "Lean Fat Loss (Calorie Deficit)",
        "workoutStrategy": "...",
        "cardioStrategy": "...",
        "dietStrategy": "..."
      },
      "status": "draft",
      "createdAt": "2026-06-21T17:30:00Z"
    }
    ```

#### `GET /api/assessment/latest`
Gets the latest assessment report details for the logged-in user.
- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - **200 OK**: Returns the full assessment object (same structure as `POST /api/assessment` response).
  - **404 Not Found**:
    ```json
    { "message": "No assessment report found for this user." }
    ```

#### `POST /api/assessment/finalize`
Finalizes the draft status of the latest assessment.
- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - **200 OK**:
    ```json
    {
      "id": "report789",
      "userId": "u92js7a",
      "status": "finalized",
      "createdAt": "...",
      "formData": { ... },
      "report": { ... }
    }
    ```
  - **404 Not Found** (No assessment report exists to finalize).

---

### 6.3 Habit Tracker Endpoints

#### `GET /api/habits`
Gets the client's checked habits checklist for a target date.
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `date`: Date string formatted as `YYYY-MM-DD`. Defaults to the user's current local date if omitted.
- **Responses**:
  - **200 OK (Existing checklist record found)**:
    ```json
    {
      "id": "habit456",
      "userId": "u92js7a",
      "date": "2026-06-21",
      "habits": [
        { "id": 1, "text": "7-8 Hours Quality Sleep", "checked": true },
        { "id": 2, "text": "Hit Daily Protein Intake Target", "checked": false },
        { "id": 3, "text": "30-Min Targeted Workout", "checked": true },
        { "id": 4, "text": "Drink 3L Hydration Target", "checked": false },
        { "id": 5, "text": "10 Mins Mindfulness / Breathing", "checked": false }
      ],
      "updatedAt": "2026-06-21T14:22:00Z"
    }
    ```
  - **200 OK (No checklist found for date, returns default checklist setup)**:
    ```json
    {
      "userId": "u92js7a",
      "date": "2026-06-22",
      "habits": [
        { "id": 1, "text": "7-8 Hours Quality Sleep", "checked": false },
        { "id": 2, "text": "Hit Daily Protein Intake Target", "checked": false },
        { "id": 3, "text": "30-Min Targeted Workout", "checked": false },
        { "id": 4, "text": "Drink 3L Hydration Target", "checked": false },
        { "id": 5, "text": "10 Mins Mindfulness / Breathing", "checked": false }
      ]
    }
    ```

#### `POST /api/habits`
Saves or updates checked habits for a target date.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "date": "2026-06-21",
    "habits": [
      { "id": 1, "text": "7-8 Hours Quality Sleep", "checked": true },
      { "id": 2, "text": "Hit Daily Protein Intake Target", "checked": true },
      { "id": 3, "text": "30-Min Targeted Workout", "checked": true },
      { "id": 4, "text": "Drink 3L Hydration Target", "checked": false },
      { "id": 5, "text": "10 Mins Mindfulness / Breathing", "checked": false }
    ]
  }
  ```
- **Responses**:
  - **200 OK**:
    ```json
    {
      "id": "habit456",
      "userId": "u92js7a",
      "date": "2026-06-21",
      "habits": [ ... ],
      "updatedAt": "2026-06-21T17:34:00Z"
    }
    ```

---

## 7. Direct Prompt for Claude to Create the Backend

You can copy and paste the section below into a prompt window for Claude to implement the backend:

```text
Please build a complete, production-ready REST API Backend for my wellness coaching portal. 

Key Requirements:
1. Tech Stack: Node.js, Express, TypeScript, and a relational database (PostgreSQL using Prisma ORM) or MongoDB (using Mongoose). Please implement with clean architectural layers: controller, service, middleware, routes, and DB layers.
2. Authentication:
   - Handle JWT signing and verification. Use a secret token from process.env.JWT_SECRET.
   - Implement client session validation middleware.
   - Support normal signup and login with hashed passwords (using bcryptjs).
   - Support social login: verify Google ID Token (using firebase-admin SDK). If a user logs in via Google and doesn't exist in the database, automatically register them.
3. Health Assessment Calculations:
   - The POST /api/assessment endpoint must run physical metrics calculations:
     - BMR (Harris-Benedict formula) split by gender.
     - TDEE based on activity levels.
     - Target Calories (Surplus, deficit, or maintenance based on goals).
     - Hydration intake fluid baseline calculation.
     - Macronutrient breakdown (Protein targets, Fats at 25% of calories, carbs taking up the remainder).
     - Dynamic strategy advice text generation based on dietary preferences and primary goals.
4. Habits Checklist:
   - Save daily check status of habits per user.
   - If a GET query is run for a date with no existing records, respond with the default habit checklist structure (5 baseline wellness habits with "checked" set to false).
5. Development Settings:
   - Configure CORS headers to allow cross-origin requests.
   - Include sample environment configurations (.env.example).
```
