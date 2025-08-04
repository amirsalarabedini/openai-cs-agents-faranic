// Helper to call the server
export async function callChatAPI(message: string, conversationId: string) {
  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation_id: conversationId, message }),
    });
    if (!res.ok) throw new Error(`Chat API error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("Error sending message:", err);
    return null;
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error(`Login error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("Error logging in:", err);
    return null;
  }
}

export async function registerUser(username: string, password: string) {
  try {
    const res = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error(`Register error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("Error registering user:", err);
    return null;
  }
}

export async function fetchUsers() {
  try {
    const res = await fetch("/users");
    if (!res.ok) throw new Error(`Fetch users error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
}
