import React, { useState } from "react";

const TagView = ({ tag, onTagChange }) => {
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [children, setChildren] = useState(tag.children || []);

  const toggleAddChild = () => {
    setShowAddChild(!showAddChild);
    setNewChildName("");
  };

  const addChild = () => {
    setChildren([...children, { name: newChildName }]);
    toggleAddChild();
  };

  const handleTagChange = (property, value) => {
    const updatedTag = { ...tag, [property]: value };
    onTagChange(updatedTag);
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <div>
        <input
          type="text"
          value={tag.name}
          onChange={(e) => handleTagChange("name", e.target.value)}
        />
      </div>
      <div>
        {!(tag.data === undefined) && <input
          type="text"
          value={tag.data || ""}
          onChange={(e) => handleTagChange("data", e.target.value)}
          placeholder="Data"
        />}
      </div>
      {children.map((child, index) => (
        <TagView
          key={index}
          tag={child}
          onTagChange={(updatedChild) => {
            const updatedChildren = [...children];
            updatedChildren[index] = updatedChild;
            setChildren(updatedChildren);
          }}
        />
      ))}
      {showAddChild ? (
        <div>
          <input
            type="text"
            placeholder="New Child Name"
            value={newChildName}
            onChange={(e) => setNewChildName(e.target.value)}
          />
          <button onClick={addChild}>Add Child</button>
        </div>
      ) : (
        <button onClick={toggleAddChild}>Add Child</button>
      )}
    </div>
  );
};

export default TagView;
