import { useEffect, useState } from "react";
import Header from "./Header";
import ProfileCard from "./ProfileCard";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*Fetch User Information*/
  async function fetchUser() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("https://randomuser.me/api/"); /*Due to the nature of project, VITE_API_URL wasn't called in env file*/
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setUser(data.results?.[0]);
    } catch (e) { /*This section was GPT Prompted to help catch return crash error*/
      setError("Could not load user. Please try again.");
      console.error("Error:", e) /*Display Error in Terminal to help with debugging*/
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchUser(); }, []);

  return (
    /*Container for components*/
    <div className="app">
      <Header />
      <main className="container">
        {/* States of Page depending on status */}
        {loading && <div className="status">Loading…</div>}
        {error && <div className="status error">{error}</div>}
        {user && <ProfileCard user={user} onFetch={fetchUser} />}
      </main>
    </div>
  );
}
