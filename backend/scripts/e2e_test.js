// e2e_test.js - quick end-to-end test: signup -> token -> socket connect
// Usage: node backend/scripts/e2e_test.js

import fetch from 'node-fetch';
import { io } from 'socket.io-client';

const API = process.env.API_URL || 'https://chittchat.onrender.com';
const SOCKET = process.env.SOCKET_URL || 'https://chittchat.onrender.com';

async function main() {
  try {
    const ts = Date.now();
    const username = `e2e_test_${ts}`;
    const email = `${username}@example.com`;
    const password = 'Password123!';

    console.log('Signing up user:', username);
    const signupRes = await fetch(`${API}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'E2E Test User',
        email,
        username,
        password,
        confirmPassword: password,
        gender: 'male',
      }),
    });

    const signupJson = await signupRes.json();
    if (!signupRes.ok) {
      console.error('Signup failed:', signupRes.status, signupJson);
      process.exit(1);
    }

    console.log('Signup response:', signupJson);
    const token = signupJson.token;
    if (!token) {
      console.error('No token returned from signup');
      process.exit(1);
    }

    console.log('Connecting socket using token...');
    const socket = io(SOCKET, {
      auth: { token },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected, id=', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connect_error', err.message || err);
      process.exit(1);
    });

    socket.on('getOnlineUsers', (users) => {
      console.log('getOnlineUsers event received:', users);
      socket.close();
      process.exit(0);
    });

    // Timeout if no event
    setTimeout(() => {
      console.error('Timed out waiting for getOnlineUsers');
      socket.close();
      process.exit(1);
    }, 15000);
  } catch (err) {
    console.error('Error in e2e test', err);
    process.exit(1);
  }
}

main();
