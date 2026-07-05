import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import html2canvas from "html2canvas";

function CustomizeProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [designFile, setDesignFile] = useState(null);

  const frontPreviewRef = useRef(null);
  const backPreviewRef = useRef(null);
  // 1. const previewRef = useRef(null);

  const [logoPosition, setLogoPosition] = useState({
    x: 120,
    y: 100,
  });
  const [logoPreview, setLogoPreview] = useState("");
  const [logoSize, setLogoSize] = useState(60);
  const [backName, setBackName] = useState("");
  const [slogan, setSlogan] = useState("");

  const [backNamePosition, setBackNamePosition] = useState({
    x: 80,
    y: 140,
  });

  const [sloganPosition, setSloganPosition] = useState({
    x: 90,
    y: 190,
  });

  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(24);

  const [formData, setFormData] = useState({
    color: "",
    size: "",
    quantity: 1,
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`,
      );

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const startDrag = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const currentPos = { ...logoPosition };

    const handleMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      setLogoPosition({
        x: currentPos.x + dx,
        y: currentPos.y + dy,
      });
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  const startTextDrag = (type, e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const current =
      type === "name" ? { ...backNamePosition } : { ...sloganPosition };

    const move = (event) => {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      if (type === "name") {
        setBackNamePosition({
          x: current.x + dx,
          y: current.y + dy,
        });
      } else {
        setSloganPosition({
          x: current.x + dx,
          y: current.y + dy,
        });
      }
    };

    const stop = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    };

    document.addEventListener("mousemove", move);

    document.addEventListener("mouseup", stop);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

     const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

    try {
      let designImageUrl = "";

      if (designFile) {
        const uploadData = new FormData();

        uploadData.append("image", designFile);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload/custom-design",
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        designImageUrl = uploadRes.data.imageUrl;
      }

      const frontCanvas = await html2canvas(frontPreviewRef.current);

      const backCanvas = await html2canvas(backPreviewRef.current);
      const frontBlob = await new Promise((resolve) =>
        frontCanvas.toBlob(resolve),
      );

      const frontData = new FormData();

      frontData.append("image", frontBlob, "front-preview.png");

      const frontUpload = await axios.post(
        "http://localhost:5000/api/upload/custom-design",
        frontData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const frontPreviewImage = frontUpload.data.imageUrl;

      const backBlob = await new Promise((resolve) =>
        backCanvas.toBlob(resolve),
      );

      const backData = new FormData();

      backData.append("image", backBlob, "back-preview.png");

      const backUpload = await axios.post(
        "http://localhost:5000/api/upload/custom-design",
        backData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const backPreviewImage = backUpload.data.imageUrl;
     
     const token = localStorage.getItem("token");

await axios.post(
  "http://localhost:5000/api/custom-orders",
  {
    product: id,

    quantity: formData.quantity,
    color: formData.color,
    size: formData.size,

    designImage: designImageUrl,

    logoPosition,

    backName,
    slogan,

    textColor,
    fontSize,

    backNamePosition,
    sloganPosition,

    frontPreviewImage,
    backPreviewImage,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      console.log(frontPreviewImage);
      console.log(backPreviewImage);
      console.log("backName =", backName);
      console.log("slogan =", slogan);
      alert("Custom Order Submitted Successfully");

      setFormData({
        color: "",
        size: "",
        quantity: 1,
      });

      setDesignFile(null);
      setLogoPreview("");
      setBackName("");
      setSlogan("");
      setLogoPosition({
        x: 120,
        y: 100,
      });
      setTextColor("#000000");
      setFontSize(24);
    } catch (error) {
      console.log(error);
      alert("Error creating custom order");
    }
  };

  if (!product) return <h2>Loading...</h2>;

  // const title = product.title.toLowerCase();

  const frontMockup = product.customizationFront;

  const backMockup = product.customizationBack || product.customizationFront;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Design Your {product.title}</h2>

      <div className="row">
        <div className="col-md-7">
          <form onSubmit={submitHandler}>
            <select
              className="form-select mb-3"
              value={formData.color}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  color: e.target.value,
                })
              }
            >
              <option value="">Select Color</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Navy Blue">Navy Blue</option>
              <option value="Red">Red</option>
              <option value="Grey">Grey</option>
            </select>

            <select
              className="form-select mb-3"
              value={formData.size}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  size: e.target.value,
                })
              }
            >
              <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>

            <hr />

            <h5>Front Design</h5>

            <label className="form-label">Upload Logo</label>

            <input
              type="file"
              accept="image/*"
              className="form-control mb-3"
              onChange={(e) => {
                const file = e.target.files[0];

                setDesignFile(file);

                if (file) {
                  setLogoPreview(URL.createObjectURL(file));
                }
              }}
            />

            <div className="mb-3">
              <label className="form-label">Logo Size: {logoSize}px</label>

              <input
                type="range"
                min="30"
                max="200"
                value={logoSize}
                className="form-range"
                onChange={(e) => setLogoSize(Number(e.target.value))}
              />
            </div>

            {/* <select
              className="form-select mb-3"
              value={logoPosition}
              onChange={(e) => setLogoPosition(e.target.value)}
            >
              <option value="left-chest">Left Chest</option>

              <option value="center-chest">Center Chest</option>

              <option value="right-chest">Right Chest</option>
            </select> */}

            <hr />

            <h5>Back Design</h5>

            <input
              className="form-control mb-2"
              placeholder="Name On Back"
              value={backName}
              onChange={(e) => setBackName(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Slogan"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
            />

            <div className="mb-3">
              <label className="form-label">Text Color</label>

              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Font Size: {fontSize}px</label>

              <input
                type="range"
                min="16"
                max="50"
                value={fontSize}
                className="form-range"
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>

            {/* <div className="card p-3 mb-4">
              <h4 className="mb-3">
                Live Preview
              </h4>

              <h6>Front</h6>

              <div
                style={{
                  width: "300px",
                  height: "350px",
                  border: "2px solid #ddd",
                  borderRadius: "12px",
                  background: "#fff",
                  position: "relative",
                  marginBottom: "20px",
                }}
              >
                {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Logo"
                    style={{
                      width: "70px",
                      position: "absolute",
                      top: "70px",
                      left:
                        logoPosition ===
                        "left-chest"
                          ? "60px"
                          : logoPosition ===
                            "center-chest"
                          ? "115px"
                          : "200px",
                    }}
                  />
                )}
              </div>

              <h6>Back</h6>

              <div
                style={{
                  width: "300px",
                  height: "350px",
                  border: "2px solid #ddd",
                  borderRadius: "12px",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    color: textColor,
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {backName}
                </h3>

                <p
                  style={{
                    color: textColor,
                  }}
                >
                  {slogan}
                </p>
              </div>
            </div> */}

            <div className="card p-3 mb-4">
              <h4 className="mb-4 text-center">Live Preview</h4>

              <div className="row">
                {/* FRONT */}
                <div className="col-md-6">
                  <h5 className="text-center mb-3">Front View</h5>

                  <div
                    ref={frontPreviewRef}
                    style={{
                      position: "relative",
                      maxWidth: "350px",
                      margin: "auto",
                    }}
                  >
                    <img
                      src={frontMockup}
                      alt="Front Mockup"
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                      }}
                    />

                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo"
                        onMouseDown={startDrag}
                        style={{
                          position: "absolute",
                          width: `${logoSize}px`,
                          left: `${logoPosition.x}px`,
                          top: `${logoPosition.y}px`,
                          cursor: "move",
                          zIndex: 10,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* BACK */}
                <div className="col-md-6">
                  <h5 className="text-center mb-3">Back View</h5>

                  <div
                    ref={backPreviewRef}
                    style={{
                      position: "relative",
                      maxWidth: "350px",
                      margin: "auto",
                    }}
                  >
                    <img
                      src={backMockup}
                      alt="Back Mockup"
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div
                        onMouseDown={(e) => startTextDrag("name", e)}
                        style={{
                          position: "absolute",
                          left: `${backNamePosition.x}px`,
                          top: `${backNamePosition.y}px`,
                          color: textColor,
                          fontSize: `${fontSize}px`,
                          fontWeight: "bold",
                          cursor: "move",
                          zIndex: 10,
                        }}
                      >
                        {backName}
                      </div>

                      <div
                        onMouseDown={(e) => startTextDrag("slogan", e)}
                        style={{
                          position: "absolute",
                          left: `${sloganPosition.x}px`,
                          top: `${sloganPosition.y}px`,
                          color: textColor,
                          fontSize: "16px",
                          cursor: "move",
                          zIndex: 10,
                        }}
                      >
                        {slogan}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <input
              type="number"
              min="1"
              className="form-control mb-3"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: e.target.value,
                })
              }
            />

            <button type="submit" className="btn btn-dark w-100">
              Submit Custom Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomizeProduct;
