import "../../AiStyles/Sidebar.css";

import {
  FiType,
  FiImage,
  FiSquare,
  FiLayers,
  FiGrid,
} from "react-icons/fi";

import { BsMagic } from "react-icons/bs";

function Sidebar({ setElements }) {

  const addText = () => { 
    const newText = {
      id: Date.now(),
      type: "text",

      // Content
      text: "new text",

      // Position (inside print area)
      x: 20,
      y: 20,

      // Size
      width: 220,
      height: 40,

      // Typography
      fontSize: 28,
      fontFamily: "Arial",
      fontWeight: "600",

      // Style
      color: "#111827",
      opacity: 1,

      // Transform
      rotation: 0,

      // Selection
      selected: false,
    };

    setElements((prev) => [...prev, newText]);
  };

  const tools = [
    {
      icon: <FiType />,
      label: "Text",
      onClick: addText,
    },
    {
      icon: <FiImage />,
      label: "Images",
    },
    {
      icon: <FiSquare />,
      label: "Shapes",
    },
    {
      icon: <BsMagic />,
      label: "AI Generator",
    },
    {
      icon: <FiGrid />,
      label: "Templates",
    },
    {
      icon: <FiLayers />,
      label: "Layers",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>AI Studio</h2>
        <p>Design Tools</p>
      </div>

      <div className="sidebar-tools">
        {tools.map((tool, index) => (
          <button
            key={index}
            className="tool-btn"
            onClick={tool.onClick}
          >
            <span className="tool-icon">{tool.icon}</span>
            <span>{tool.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;