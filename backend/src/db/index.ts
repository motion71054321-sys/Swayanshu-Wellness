import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve(process.env.DATA_DIR || "./data");

// Interface definitions
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface Assessment {
  id: string;
  userId: string;
  formData: {
    name: string;
    email: string;
    age: string;
    gender: string;
    weight: string;
    height: string;
    targetWeight: string;
    activity: string;
    goal: string;
    diet: string;
    sleep: string;
  };
  report: {
    bmr: number;
    tdee: number;
    calories: number;
    water: number;
    protein: number;
    carbs: number;
    fats: number;
    goalTag: string;
    workoutStrategy: string;
    cardioStrategy: string;
    dietStrategy: string;
  };
  status?: "draft" | "finalized";
  createdAt: string;
}

export interface HabitItem {
  id: number;
  text: string;
  checked: boolean;
}

export interface HabitRecord {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  habits: HabitItem[];
  updatedAt: string;
}

// Ensure database directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read JSON file
function readJsonFile<T>(fileName: string): T[] {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]") as T[];
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
}

// Helper to write JSON file
function writeJsonFile<T>(fileName: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
  }
}

export const db = {
  // Users Table
  getUsers: (): User[] => readJsonFile<User>("users.json"),
  saveUsers: (users: User[]): void => writeJsonFile<User>("users.json", users),

  findUserByEmail: (email: string): User | undefined => {
    const users = db.getUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  findUserById: (id: string): User | undefined => {
    const users = db.getUsers();
    return users.find((u) => u.id === id);
  },

  createUser: (user: Omit<User, "id" | "createdAt">): User => {
    const users = db.getUsers();
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    db.saveUsers(users);
    return newUser;
  },

  // Assessments Table
  getAssessments: (): Assessment[] => readJsonFile<Assessment>("assessments.json"),
  saveAssessments: (assessments: Assessment[]): void => writeJsonFile<Assessment>("assessments.json", assessments),

  findAssessmentsByUserId: (userId: string): Assessment[] => {
    const assessments = db.getAssessments();
    return assessments.filter((a) => a.userId === userId);
  },

  findLatestAssessmentByUserId: (userId: string): Assessment | undefined => {
    const assessments = db.findAssessmentsByUserId(userId);
    if (assessments.length === 0) return undefined;
    // Sort descending by createdAt
    return assessments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  },

  createAssessment: (userId: string, formData: Assessment["formData"], report: Assessment["report"]): Assessment => {
    const assessments = db.getAssessments();
    const newAssessment: Assessment = {
      id: Math.random().toString(36).substring(2, 11),
      userId,
      formData,
      report,
      status: "draft",
      createdAt: new Date().toISOString()
    };
    assessments.push(newAssessment);
    db.saveAssessments(assessments);
    return newAssessment;
  },

  finalizeLatestAssessment: (userId: string): Assessment | undefined => {
    const assessments = db.getAssessments();
    const sorted = assessments
      .filter((a) => a.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (sorted.length === 0) return undefined;

    const latest = sorted[0];
    const index = assessments.findIndex((a) => a.id === latest.id);
    if (index !== -1) {
      assessments[index].status = "finalized";
      db.saveAssessments(assessments);
      return assessments[index];
    }
    return undefined;
  },

  // Habits Table
  getHabits: (): HabitRecord[] => readJsonFile<HabitRecord>("habits.json"),
  saveHabits: (records: HabitRecord[]): void => writeJsonFile<HabitRecord>("habits.json", records),

  findHabits: (userId: string, date: string): HabitRecord | undefined => {
    const records = db.getHabits();
    return records.find((r) => r.userId === userId && r.date === date);
  },

  updateHabits: (userId: string, date: string, habits: HabitItem[]): HabitRecord => {
    const records = db.getHabits();
    const index = records.findIndex((r) => r.userId === userId && r.date === date);

    const updatedRecord: HabitRecord = {
      id: index !== -1 ? records[index].id : Math.random().toString(36).substring(2, 11),
      userId,
      date,
      habits,
      updatedAt: new Date().toISOString()
    };

    if (index !== -1) {
      records[index] = updatedRecord;
    } else {
      records.push(updatedRecord);
    }

    db.saveHabits(records);
    return updatedRecord;
  }
};
