import "../../AiStyles/Properties.css";

function Properties({ selectedElement, setElements, setSelectedElement }) {
  const updateElement = (property, value) => {
    if (!selectedElement) return;

    setElements((prev) =>
      prev.map((element) =>
        element.id === selectedElement.id
          ? {
              ...element,
              [property]: value,
            }
          : element,
      ),
    );

    setSelectedElement((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const deleteElement = () => {
    setElements((prev) =>
      prev.filter((element) => element.id !== selectedElement.id),
    );

    setSelectedElement(null);
  };

  return (
    <aside className="properties-panel">
      <div className="properties-header">
        <h3>Properties</h3>
      </div>

      {!selectedElement ? (
        <div className="properties-empty">Select an element</div>
      ) : (
        <div className="properties-content">
          {/* TEXT */}

          <div className="property-group">
            <label>Text</label>

            <input
              type="text"
              value={selectedElement.text}
              onChange={(e) => {
                updateElement("text", e.target.value);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();

                if (e.key === "Backspace") {
                  const input = e.currentTarget;
                  const start = input.selectionStart;
                  const end = input.selectionEnd;

                  if (start === end && start > 0) {
                    e.preventDefault();

                    const newText =
                      selectedElement.text.slice(0, start - 1) +
                      selectedElement.text.slice(end);

                    updateElement("text", newText);

                    requestAnimationFrame(() => {
                      input.setSelectionRange(start - 1, start - 1);
                    });
                  }
                }
              }}
            />
          </div>

          {/* FONT SIZE */}

          <div className="property-group">
            <label>
              Font Size
              <span>{selectedElement.fontSize}px</span>
            </label>

            <input
              type="range"
              min="12"
              max="60"
              value={selectedElement.fontSize}
              onChange={(e) =>
                updateElement("fontSize", Number(e.target.value))
              }
            />
          </div>

          {/* COLOR */}

          <div className="property-group">
            <label>Color</label>

            <input
              className="color-input"
              type="color"
              value={selectedElement.color}
              onChange={(e) => updateElement("color", e.target.value)}
            />
          </div>

          {/* DELETE */}

          <button className="delete-element-btn" onClick={deleteElement}>
            Delete
          </button>
        </div>
      )}
    </aside>
  );
}

export default Properties;
