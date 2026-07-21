"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            user_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            workout_1.default.deleteMany({})
        ]);
        const users = await user_1.default.insertMany([
            {
                name: 'Ada Lovelace',
                email: 'ada@example.com',
                role: 'Admin',
                fitnessGoal: 'Improve endurance'
            },
            {
                name: 'Linus Torvalds',
                email: 'linus@example.com',
                role: 'Member',
                fitnessGoal: 'Build strength'
            },
            {
                name: 'Grace Hopper',
                email: 'grace@example.com',
                role: 'Coach',
                fitnessGoal: 'Increase mobility'
            }
        ]);
        await team_1.default.insertMany([
            {
                name: 'Alpha Squad',
                sport: 'Running',
                members: users.slice(0, 2).map((user) => user._id.toString()),
                goal: 'Complete a 10K challenge'
            },
            {
                name: 'Beta Crew',
                sport: 'CrossFit',
                members: [users[2]._id.toString()],
                goal: 'Win the monthly fitness challenge'
            }
        ]);
        await activity_1.default.insertMany([
            {
                userId: users[0]._id.toString(),
                type: 'Run',
                durationMinutes: 30,
                calories: 320,
                date: new Date('2026-07-20')
            },
            {
                userId: users[1]._id.toString(),
                type: 'Strength',
                durationMinutes: 45,
                calories: 410,
                date: new Date('2026-07-21')
            },
            {
                userId: users[2]._id.toString(),
                type: 'Yoga',
                durationMinutes: 25,
                calories: 180,
                date: new Date('2026-07-21')
            }
        ]);
        await leaderboard_1.default.insertMany([
            { userId: users[0]._id.toString(), points: 980, streak: 12, rank: 1 },
            { userId: users[1]._id.toString(), points: 940, streak: 8, rank: 2 },
            { userId: users[2]._id.toString(), points: 900, streak: 6, rank: 3 }
        ]);
        await workout_1.default.insertMany([
            {
                name: 'HIIT Interval Run',
                difficulty: 'Intermediate',
                durationMinutes: 25,
                focus: 'Cardio'
            },
            {
                name: 'Mobility Flow',
                difficulty: 'Beginner',
                durationMinutes: 20,
                focus: 'Flexibility'
            },
            {
                name: 'Strength Builder',
                difficulty: 'Advanced',
                durationMinutes: 40,
                focus: 'Muscle Growth'
            }
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
