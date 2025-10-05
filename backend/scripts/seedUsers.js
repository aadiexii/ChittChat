import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chittchat';

const usersToCreate = [
  { fullName: 'Alice Example', username: 'alice01', password: 'password123', gender: 'female' },
  { fullName: 'Bob Example', username: 'bob02', password: 'password123', gender: 'male' },
  { fullName: 'Charlie Example', username: 'charlie03', password: 'password123', gender: 'male' },
];

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    for (const u of usersToCreate) {
      const existing = await User.findOne({ username: u.username });
      if (existing) {
        console.log('Skipping existing user', u.username);
        continue;
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(u.password, salt);

      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${u.username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${u.username}`;

      const newUser = new User({
        fullName: u.fullName,
        username: u.username,
        password: hashed,
        gender: u.gender,
        profilePic: u.gender === 'male' ? boyProfilePic : girlProfilePic,
      });

      await newUser.save();
      console.log('Created user', u.username);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
}

main();
