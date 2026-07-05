import "../../AiStyles/Toolbar.css";

import {
  FiRotateCcw,
  FiRotateCw,
  FiZoomIn,
  FiZoomOut,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";

function Toolbar() {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <h3>AI Design Studio</h3>
      </div>

      <div className="toolbar-actions">
        <button className="toolbar-btn">
          <FiRotateCcw />
          Undo
        </button>

        <button className="toolbar-btn">
          <FiRotateCw />
          Redo
        </button>

        <button className="toolbar-btn">
          <FiZoomIn />
          {/* Zoom In */}
        </button>

        <button className="toolbar-btn">
          <FiZoomOut />
          {/* Zoom Out */}
        </button>

        <button className="toolbar-btn">
          <FiRefreshCw />
          Reset
        </button>

        <button className="download-btn">
          <FiDownload />
          Download
        </button>
      </div>
    </div>
  );
}

export default Toolbar;