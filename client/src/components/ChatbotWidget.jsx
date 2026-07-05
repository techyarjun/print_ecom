// import { useState } from "react";
// import { Bot, X } from "lucide-react";
// import AIChat from "../pages/AiStudio/components/ai/AIChat";
// import "./styles/ChatbotWidget.css";

// function ChatbotWidget() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Chat Window */}
//       {isOpen && (
//         <div className="chatbot-widget-window">
//           <div className="chatbot-widget-header">
//             <div className="chatbot-widget-title">
//               <Bot size={20} />
//               <span>AI Design Assistant</span>
//             </div>

//             <button
//               className="chatbot-close-btn"
//               onClick={() => setIsOpen(false)}
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <div className="chatbot-widget-content">
//             <AIChat />
//           </div>
//         </div>
//       )}

//       {/* Floating Chat Button */}
//       <button
//         className={`chatbot-floating-btn ${isOpen ? "chat-open" : ""}`}
//         onClick={() => setIsOpen((prev) => !prev)}
//         aria-label="Open AI chatbot"
//       >
//         {isOpen ? <X size={28} /> : <Bot size={30} />}
//       </button>
//     </>
//   );
// }

// export default ChatbotWidget;

import { useRef, useState } from "react";
import { Bot, X } from "lucide-react";
import AIChat from "../pages/AiStudio/components/ai/AIChat";
import "./styles/ChatbotWidget.css";

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [position, setPosition] = useState({
    x: window.innerWidth - 90,
    y: window.innerHeight - 90,
  });

  const dragRef = useRef({
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0,
    moved: false,
  });

  const handlePointerDown = (e) => {
    dragRef.current = {
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };

    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const moveX = Math.abs(
      e.clientX - dragRef.current.startX
    );

    const moveY = Math.abs(
      e.clientY - dragRef.current.startY
    );

    if (moveX > 5 || moveY > 5) {
      dragRef.current.moved = true;
    }

    const buttonSize = 62;

    let x =
      e.clientX - dragRef.current.offsetX;

    let y =
      e.clientY - dragRef.current.offsetY;

    // Keep logo inside screen
    x = Math.max(
      0,
      Math.min(x, window.innerWidth - buttonSize)
    );

    y = Math.max(
      0,
      Math.min(y, window.innerHeight - buttonSize)
    );

    setPosition({ x, y });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    // Click opens chat, drag does not
    if (!dragRef.current.moved) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chatbot-widget-window">
          <div className="chatbot-widget-header">
            <div className="chatbot-widget-title">
              <Bot size={20} />
              AI Design Assistant
            </div>

            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-widget-content">
            <AIChat />
          </div>
        </div>
      )}

      <button
        className={`chatbot-floating-btn ${
          isDragging ? "dragging" : ""
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          right: "auto",
          bottom: "auto",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setIsDragging(false)}
      >
        <Bot size={29} />
      </button>
    </>
  );
}

export default ChatbotWidget;