import { useState } from "react";

function ProductCustomizer() {
  const [logo, setLogo] = useState(null);
  const [brandName, setBrandName] = useState("My Brand");

  const [logoPos, setLogoPos] = useState({
    x: 180,
    y: 120,
  });

  const [textPos, setTextPos] = useState({
    x: 170,
    y: 250,
  });

  const startDrag = (type, e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const currentPos =
      type === "logo" ? logoPos : textPos;

    const handleMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (type === "logo") {
        setLogoPos({
          x: currentPos.x + dx,
          y: currentPos.y + dy,
        });
      } else {
        setTextPos({
          x: currentPos.x + dx,
          y: currentPos.y + dy,
        });
      }
    };

    const handleUp = () => {
      document.removeEventListener(
        "mousemove",
        handleMove
      );
      document.removeEventListener(
        "mouseup",
        handleUp
      );
    };

    document.addEventListener(
      "mousemove",
      handleMove
    );

    document.addEventListener(
      "mouseup",
      handleUp
    );
  };

  return (
    <div className="container py-4">
      <h2>Customize Product</h2>

      <input
        type="file"
        className="form-control mb-3"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            setLogo(
              URL.createObjectURL(
                e.target.files[0]
              )
            );
          }
        }}
      />

      <input
        type="text"
        className="form-control mb-4"
        value={brandName}
        onChange={(e) =>
          setBrandName(e.target.value)
        }
      />

      <div
        style={{
          position: "relative",
          width: "500px",
          height: "500px",
          margin: "auto",
          border: "1px solid #ddd",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/tshirt.png"
          alt="Tshirt"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        {logo && (
          <img
            src={logo}
            alt="logo"
            onMouseDown={(e) =>
              startDrag("logo", e)
            }
            style={{
              position: "absolute",
              left: logoPos.x,
              top: logoPos.y,
              width: "100px",
              cursor: "move",
              zIndex: 10,
            }}
          />
        )}

        <div
          onMouseDown={(e) =>
            startDrag("text", e)
          }
          style={{
            position: "absolute",
            left: textPos.x,
            top: textPos.y,
            fontSize: "24px",
            fontWeight: "bold",
            cursor: "move",
            zIndex: 10,
          }}
        >
          {brandName}
        </div>
      </div>
    </div>
  );
}

export default ProductCustomizer;