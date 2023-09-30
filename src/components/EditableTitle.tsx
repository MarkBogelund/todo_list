import React, { useState, useRef, useEffect } from "react";

interface EditableTitleProps {
  defaultTitle: string;
  onSave?: (newTitle: string) => void;
  positionStyle?: string;
  titleStyle?: string;
  textType?: string;
}

const EditableTitle: React.FC<EditableTitleProps> = ({
  defaultTitle,
  onSave,
  positionStyle,
  titleStyle,
  textType,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  // Used for limiting the amount of text in the text area
  const [prevTitle, setPrevTitle] = useState(defaultTitle);

  // Update title state when defaultTitle prop changes
  useEffect(() => {
    setTitle(defaultTitle);
    setPrevTitle(defaultTitle);
  }, [defaultTitle]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    if (title.trim() === "") {
      setTitle("");
    }
    if (onSave) onSave(title);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;

    if (textarea.scrollHeight > textarea.clientHeight) {
      e.currentTarget.value = prevTitle; // Revert to the previous value
    } else {
      setTitle(e.target.value);
      setPrevTitle(e.target.value);
    }
  };

  return (
    <div className={`${positionStyle} flex items-start`}>
      {!isEditing ? (
        title ? (
          <h1
            className={`${titleStyle} cursor-pointer text-white font-thin px-2 py-1 w-full h-full`}
            onClick={() => setIsEditing(true)}
          >
            {title}
          </h1>
        ) : (
          <h1
            className="cursor-pointer text-white font-thin px-2 py-1 italic opacity-60 w-full h-full"
            onClick={() => setIsEditing(true)}
          >
            Add a {`${textType}...`}
          </h1>
        )
      ) : (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          className={`${titleStyle} w-full h-full border-white border rounded-md px-2 py-1 outline-none text-gray-900 font-thin resize-none overflow-hidden bg-transparent box-border`}
          placeholder={`${textType}...`}
          value={title}
          onChange={handleInputChange}
          onBlur={handleSave}
        />
      )}
    </div>
  );
};

export default EditableTitle;
