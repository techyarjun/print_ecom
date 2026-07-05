import { useRef } from "react";
import "../../AiStyles/Canvas.css";

function Canvas({
  product,
  elements,
  setElements,
  selectedElement,
  setSelectedElement,
}) {
  const actionData = useRef(null);

  const PRINT_WIDTH = 260;
  const PRINT_HEIGHT = 320;

  const handleCanvasClick = () => {
    setSelectedElement(null);
  };

  // ==========================================
  // START DRAG
  // ==========================================

  const handleDragStart = (e, element) => {
    e.stopPropagation();

    setSelectedElement(element);

    actionData.current = {
      type: "drag",

      id: element.id,

      startMouseX: e.clientX,
      startMouseY: e.clientY,

      startX: element.x,
      startY: element.y,

      width: element.width,
      height: element.height,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // ==========================================
  // START RESIZE
  // ==========================================

  const handleResizeStart = (e, element, direction) => {
    e.stopPropagation();

    setSelectedElement(element);

    actionData.current = {
      type: "resize",

      direction,

      id: element.id,

      startMouseX: e.clientX,
      startMouseY: e.clientY,

      startX: element.x,
      startY: element.y,

      startWidth: element.width,
      startHeight: element.height,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // ==========================================
  // POINTER MOVE
  // ==========================================

  const handlePointerMove = (e) => {
    if (!actionData.current) return;

    const data = actionData.current;

    const deltaX = e.clientX - data.startMouseX;
    const deltaY = e.clientY - data.startMouseY;

    // ========================================
    // DRAG
    // ========================================

    if (data.type === "drag") {
      let newX = data.startX + deltaX;
      let newY = data.startY + deltaY;

      // Keep element inside print area
      newX = Math.max(0, Math.min(newX, PRINT_WIDTH - data.width));

      newY = Math.max(0, Math.min(newY, PRINT_HEIGHT - data.height));

      setElements((prevElements) =>
        prevElements.map((element) =>
          element.id === data.id
            ? {
                ...element,
                x: newX,
                y: newY,
              }
            : element,
        ),
      );

      return;
    }

    // ========================================
    // RESIZE
    // ========================================

    if (data.type === "resize") {
      let newX = data.startX;
      let newY = data.startY;

      let newWidth = data.startWidth;
      let newHeight = data.startHeight;

      const minWidth = 60;
      const minHeight = 30;

      // Bottom Right
      if (data.direction === "se") {
        newWidth = Math.max(
          minWidth,
          Math.min(data.startWidth + deltaX, PRINT_WIDTH - data.startX),
        );

        newHeight = Math.max(
          minHeight,
          Math.min(data.startHeight + deltaY, PRINT_HEIGHT - data.startY),
        );
      }

      // Bottom Left
      if (data.direction === "sw") {
        const maxDeltaX = data.startWidth - minWidth;

        const safeDeltaX = Math.min(deltaX, maxDeltaX);

        newX = Math.max(0, data.startX + safeDeltaX);

        newWidth = data.startWidth - (newX - data.startX);

        newHeight = Math.max(
          minHeight,
          Math.min(data.startHeight + deltaY, PRINT_HEIGHT - data.startY),
        );
      }

      // Top Right
      if (data.direction === "ne") {
        const maxDeltaY = data.startHeight - minHeight;

        const safeDeltaY = Math.min(deltaY, maxDeltaY);

        newY = Math.max(0, data.startY + safeDeltaY);

        newHeight = data.startHeight - (newY - data.startY);

        newWidth = Math.max(
          minWidth,
          Math.min(data.startWidth + deltaX, PRINT_WIDTH - data.startX),
        );
      }

      // Top Left
      if (data.direction === "nw") {
        const maxDeltaX = data.startWidth - minWidth;

        const maxDeltaY = data.startHeight - minHeight;

        const safeDeltaX = Math.min(deltaX, maxDeltaX);

        const safeDeltaY = Math.min(deltaY, maxDeltaY);

        newX = Math.max(0, data.startX + safeDeltaX);

        newY = Math.max(0, data.startY + safeDeltaY);

        newWidth = data.startWidth - (newX - data.startX);

        newHeight = data.startHeight - (newY - data.startY);
      }

      setElements((prevElements) =>
        prevElements.map((element) =>
          element.id === data.id
            ? {
                ...element,
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight,
              }
            : element,
        ),
      );
    }
  };

  // ==========================================
  // END ACTION
  // ==========================================

  const handlePointerUp = (e) => {
    actionData.current = null;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <main className="canvas" onClick={handleCanvasClick}>
      <div className="canvas-workspace">
        <div className="product-stage">
          {product ? (
            <>
              <img
                src={product.image}
                alt={product.name}
                className="canvas-product-image"
                draggable={false}
              />

              <div className="print-area">
                {elements.map((element) => {
                  if (element.type !== "text") {
                    return null;
                  }

                  const isSelected = selectedElement?.id === element.id;

                  return (
                    <div
                      key={element.id}
                      className={`canvas-element ${
                        isSelected ? "selected" : ""
                      }`}
                      style={{
                        left: `${element.x}px`,
                        top: `${element.y}px`,
                        width: `${element.width}px`,
                        height: `${element.height}px`,
                        opacity: element.opacity,
                        transform: `rotate(${element.rotation}deg)`,
                      }}
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => handleDragStart(e, element)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                    >
                      <span
                        className="element-text"
                        style={{
                          fontSize: `${element.fontSize}px`,
                          fontFamily: element.fontFamily,
                          fontWeight: element.fontWeight,
                          color: element.color,
                        }}
                      >
                        {element.text}
                      </span>

                      {/* RESIZE HANDLES */}

                      {isSelected && (
                        <>
                          <div
                            className="resize-handle nw"
                            onPointerDown={(e) =>
                              handleResizeStart(e, element, "nw")
                            }
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                          />

                          <div
                            className="resize-handle ne"
                            onPointerDown={(e) =>
                              handleResizeStart(e, element, "ne")
                            }
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                          />

                          <div
                            className="resize-handle sw"
                            onPointerDown={(e) =>
                              handleResizeStart(e, element, "sw")
                            }
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                          />

                          <div
                            className="resize-handle se"
                            onPointerDown={(e) =>
                              handleResizeStart(e, element, "se")
                            }
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="canvas-empty">
              <h2>No product selected</h2>

              <p>Select a product before opening the editor.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Canvas;
