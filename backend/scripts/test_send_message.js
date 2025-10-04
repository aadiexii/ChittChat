import fetch from 'node-fetch';

const API = process.env.API_URL || 'https://chittchat.onrender.com';

async function signupUser(usernamePrefix) {
  const ts = Date.now();
  const username = `${usernamePrefix}_${ts}`;
  const email = `${username}@example.com`;
  const password = 'Password123!';

  const res = await fetch(`${API}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: `${usernamePrefix} Test`,
      email,
      username,
      password,
      confirmPassword: password,
      gender: 'male',
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`Signup failed: ${res.status} ${JSON.stringify(json)}`);
  return json; // should include _id and token
}

async function sendMessage(token, receiverId, message) {
  const res = await fetch(`${API}/api/messages/send/${receiverId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });
  const json = await res.json();
  return { status: res.status, body: json };
}

async function main() {
  try {
    console.log('Signing up UserA');
    const userA = await signupUser('UserA');
    console.log('UserA:', { id: userA._id });

    console.log('Signing up UserB');
    const userB = await signupUser('UserB');
    console.log('UserB:', { id: userB._id });

    console.log('Sending message from UserA to UserB');
    const result = await sendMessage(userA.token, userB._id, 'Hello from test script');
    console.log('Send message result:', result);
  } catch (err) {
    console.error('Error in test_send_message:', err);
    process.exit(1);
  }
}

main();
