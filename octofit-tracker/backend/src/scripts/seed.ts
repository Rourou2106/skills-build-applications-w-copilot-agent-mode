import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
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

    await Team.insertMany([
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

    await Activity.insertMany([
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

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id.toString(), points: 980, streak: 12, rank: 1 },
      { userId: users[1]._id.toString(), points: 940, streak: 8, rank: 2 },
      { userId: users[2]._id.toString(), points: 900, streak: 6, rank: 3 }
    ]);

    await Workout.insertMany([
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
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
