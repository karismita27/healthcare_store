import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { readJSON, writeJSON, removeKey } from "../utils/storage.js";

const AUTH_KEY = "hc_auth";
const USERS_KEY = "hc_users";

const AuthContext = createContext(null);

const initialAuth = {
  status: "anonymous", // anonymous | user | guest
  user: null, // { id, name, email, phone }
  guest: null, // { fullName, phone, address, city, state, pincode, email? }
};

function safeId(prefix = "u") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => readJSON(AUTH_KEY, initialAuth));

  useEffect(() => {
    writeJSON(AUTH_KEY, auth);
  }, [auth]);

  const isAllowed = auth.status === "user" || auth.status === "guest";

  function logout() {
    setAuth(initialAuth);
    removeKey(AUTH_KEY);
  }

  function register({ fullName, email, phone, password }) {
    const users = readJSON(USERS_KEY, []);
    const exists = users.some((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { ok: false, message: "Email already registered. Please login." };
    }
    const newUser = { id: safeId("user"), name: fullName, email, phone, password };
    writeJSON(USERS_KEY, [...users, newUser]);
    setAuth({ status: "user", user: { id: newUser.id, name: newUser.name, email, phone }, guest: null });
    return { ok: true };
  }

  function login({ email, password }) {
    const users = readJSON(USERS_KEY, []);
    const user = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (!user) return { ok: false, message: "No account found. Please register." };
    if (user.password !== password) return { ok: false, message: "Invalid credentials." };
    setAuth({ status: "user", user: { id: user.id, name: user.name, email: user.email, phone: user.phone }, guest: null });
    return { ok: true };
  }

  function startGuestSession(guestForm) {
    setAuth({ status: "guest", user: null, guest: { ...guestForm, id: safeId("guest") } });
  }

  const value = useMemo(
    () => ({
      auth,
      isAllowed,
      login,
      register,
      startGuestSession,
      logout,
    }),
    [auth, isAllowed],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
