import "../../AiStyles/EditableText.css";

function EditableText({ element }) {
  return (
    <div
      className="editable-text"
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        color: element.color,
        fontSize: `${element.fontSize}px`,
      }}
    >
      {element.text}
    </div>
  );
}

export default EditableText;