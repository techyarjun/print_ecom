import { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../AiStudio/components/ai/Sidebar";
import Toolbar from "../AiStudio/components/ai/Toolbar";
import Canvas from "../AiStudio/components/ai/Canvas";
import Properties from "../AiStudio/components/ai/Properties";
import AiChat from "../AiStudio/components/ai/AIChat";

import "../AiStudio/AiStyles/Editor.css";

function Editor() {
  const location = useLocation();
  const product = location.state?.product;

  // All objects placed on the product
  const [elements, setElements] = useState([]);

  // Currently selected object
  const [selectedElement, setSelectedElement] = useState(null);

  return (
    <div className="editor">
      <Sidebar setElements={setElements} />

      <div className="editor-main">
        <Toolbar />

        <Canvas
          product={product}
          elements={elements}
          setElements={setElements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />
      </div>

      {/* <AiChat /> */}

      <Properties
        selectedElement={selectedElement}
        setElements={setElements}
        setSelectedElement={setSelectedElement}
      />
    </div>
  );
}

export default Editor;
