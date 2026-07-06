import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./AiStyles/AIStudio.css";
import "../AiStudio/AiStyles/AIStudio.css";

import ProductSelector from "./components/ai/ProductSelector";

function AIStudio() {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleStartDesign = () => {
    if (!selectedProduct) return;

    navigate("/ai-studio/editor", {
      state: {
        product: selectedProduct,
      },
    });
  };

  return (
    <div className="studio">
      <ProductSelector
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        handleStartDesign={handleStartDesign}
      />
    </div>
  );
}

export default AIStudio;