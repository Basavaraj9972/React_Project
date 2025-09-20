import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function OpenAIChatGPT() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8005/api/core/openaichatgpt/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: input }]
        })
      });

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content || "⚠️ No response";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: " + err.message }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Full screen height
        maxWidth: "800px",
        margin: "auto",
        padding: "10px"
      }}
    >
      <h2>💬 Chat with AI</h2>

      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          marginBottom: "10px",
          whiteSpace: "pre-wrap",
          overflowY: "auto",
          backgroundColor: "#fafafa"
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              margin: "10px 0",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: msg.role === "assistant" ? "#f0f4ff" : "#e9ffe9"
            }}
          >
            <b style={{ textTransform: "capitalize" }}>{msg.role}:</b>
            <div style={{ marginTop: "5px" }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <p>
            <i>⏳ AI is typing...</i>
          </p>
        )}
      </div>

      {/* Fixed Input Box */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "flex-end",
          borderTop: "1px solid #ccc",
          padding: "10px",
          backgroundColor: "#fff"
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
            minHeight: "60px",
            maxHeight: "200px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none",
            overflowY: "auto"
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default OpenAIChatGPT;
