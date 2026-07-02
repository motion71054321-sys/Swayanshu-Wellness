import { Router, Request, Response } from "express";
import { db } from "../db";

const router = Router();

const DEFAULT_HABITS = [
  { id: 1, text: "7-8 Hours Quality Sleep", checked: false },
  { id: 2, text: "Hit Daily Protein Intake Target", checked: false },
  { id: 3, text: "30-Min Targeted Workout", checked: false },
  { id: 4, text: "Drink 3L Hydration Target", checked: false },
  { id: 5, text: "10 Mins Mindfulness / Breathing", checked: false },
];

// Helper to get today's date in local YYYY-MM-DD format
function getTodayLocalDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// @route   GET api/habits
// @desc    Get user habits checklist for a specific date
router.get("/", (req: Request, res: Response): void => {
  const userId = "default-user";
  const date = (req.query.date as string) || getTodayLocalDateString();

  try {
    let habitRecord = db.findHabits(userId, date);
    
    if (!habitRecord) {
      // If no habits for this date, return default checklist
      res.json({
        userId: userId,
        date,
        habits: DEFAULT_HABITS
      });
      return;
    }

    res.json(habitRecord);
  } catch (error) {
    console.error("Fetch habits error:", error);
    res.status(500).json({ message: "Server error retrieving habits." });
  }
});

// @route   POST api/habits
// @desc    Update habits checklist for a user and date
router.post("/", (req: Request, res: Response): void => {
  const userId = "default-user";
  const { date, habits } = req.body;

  if (!date || !habits || !Array.isArray(habits)) {
    res.status(400).json({ message: "Missing required habits list or date." });
    return;
  }

  try {
    const updatedRecord = db.updateHabits(userId, date, habits);
    res.json(updatedRecord);
  } catch (error) {
    console.error("Save habits error:", error);
    res.status(500).json({ message: "Server error saving habits." });
  }
});

export default router;
