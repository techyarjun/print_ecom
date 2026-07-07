// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import "../../AiStyles/AIChat.css";

// function AIChat() {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       sender: "ai",
//       text: "Hi 👋 Tell me what you want to create, and I'll help you design it.",
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userText = input;

//     const userMessage = {
//       id: Date.now(),
//       sender: "user",
//       text: userText,
//     };

//     const updatedMessages = [...messages, userMessage];

//     setMessages(updatedMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://print-ecom-server.onrender.com/api/ai/chat",
//         {
//           messages: updatedMessages,
//         }
//       );

//       const aiMessage = {
//         id: Date.now() + 1,
//         sender: "ai",
//         text: response.data.reply,
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("AI Chat Error:", error);

//       const errorMessage = {
//         id: Date.now() + 1,
//         sender: "ai",
//         text: "Sorry, I couldn't process your request.",
//       };

//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !loading) {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="ai-chat">
//       <div className="ai-chat-header">
//         <div>
//           <h3>AI Design Assistant</h3>
//           <span>Online</span>
//         </div>
//       </div>

//       <div className="ai-chat-messages">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`message ${
//               message.sender === "user"
//                 ? "user-message"
//                 : "ai-message"
//             }`}
//           >
//             {message.text}
//           </div>
//         ))}

//         {loading && (
//           <div className="message ai-message typing-message">
//             AI is thinking...
//           </div>
//         )}
//       </div>

//       <div className="ai-chat-input">
//         <input
//           type="text"
//           placeholder="Describe your design idea..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           disabled={loading}
//         />

//         <button
//           onClick={sendMessage}
//           disabled={loading}
//         >
//           {loading ? "..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AIChat;

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../AiStyles/AIChat.css";
import ReactMarkdown from "react-markdown";

function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi 👋 Tell me what you want to create, and I'll help you design it.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Reference to the bottom of the message list
  const messagesEndRef = useRef(null);

  // Automatically scroll when messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: userText,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://print-ecom-server.onrender.com/api/ai/chat",
        {
          messages: updatedMessages,
        }
      );

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: response.data.reply,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "Sorry, I couldn't process your request.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="ai-chat">

      {/* Header */}
      <div className="ai-chat-header">
        <div>
          <h3>AI Design Assistant</h3>
          <span>Online</span>
        </div>
      </div>


      {/* Messages */}
      <div className="ai-chat-messages">

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "user"
                ? "user-message"
                : "ai-message"
            }`}
          >
            {message.sender === "ai" ? (
              <ReactMarkdown>{message.text}</ReactMarkdown>
            ) : (
              message.text
            )}
          </div>
        ))}


        {/* Loading message */}
        {loading && (
          <div className="message ai-message typing-message">
            AI is thinking...
          </div>
        )}


        {/* Auto-scroll target */}
        <div ref={messagesEndRef} />

      </div>


      {/* Input */}
      <div className="ai-chat-input">

        <input
          type="text"
          placeholder="Describe your design idea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>

      </div>

    </div>
  );
}

export default AIChat;