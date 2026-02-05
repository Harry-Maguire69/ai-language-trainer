"use client";
import { useState } from "react";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkAnswer() {
    setLoading(true);
    const res = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: "La voiture est rouge",
        answer
      })
    });
    const data = await res.json();
    setFeedback(data.feedback);
    setLoading(false);
  }

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>AI Language Trainer</h1>
      <p><b>Translate to Dutch:</b> “La voiture est rouge”</p>

      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your translation"
        style={{ padding: 10, width: 300 }}
      />

      <br /><br />

      <button onClick={checkAnswer} disabled={loading}>
        {loading ? "Checking..." : "Check answer"}
      </button>

      {feedback && (
        <div style={{ marginTop: 20 }}>
          <b>AI feedback:</b>
          <p>{feedback}</p>
        </div>
      )}
    </main>
  );
}
