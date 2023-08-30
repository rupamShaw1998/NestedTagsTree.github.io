import React, { useEffect, useState } from "react";

const TagView = ({ tag, onTagChange, sendData }) => {

  const handleTagChange = (property, value) => {
    tag = { ...tag, [property]: value };
    sendData(tag);
    
  };

  const addChild = () => {
    const newChild = {name: "NewChild", data: "Data"};
    delete tag.data;
    const updatedChildren = tag.children? [...tag.children, newChild]: [newChild];
    const newTag = {...tag, children: updatedChildren};
    sendData(newTag);
  };

  return (
    <div style={{ border: "1px solid red", margin: "50px", textAlign: "left" }}>
      <div style={{ border: "1px solid blue", backgroundColor: "yellow" }}>
        {/* <input
          type="text"
          value={tag.name}
          onChange={(e) => handleTagChange("name", e.target.value)}
        /> */}
        <span>
          {tag.name}
          <button onClick={addChild}>Add Child</button>
        </span>
      </div>

      {!(tag.data === undefined) && (
        <div>
          <span>Data </span>
          <input
            type="text"
            value={tag.data}
            onChange={(e) => handleTagChange("data", e.target.value)}
            placeholder="data"
          />
        </div>
      )}

      {tag.children &&
        tag.children.map((child, index) => (

          <ChildObject
            key={index}
            tag={child}
            index={index}
            sendData={(updatedTag) => {
              tag.children[index] = updatedTag;
              sendData(tag);
            }}
          />
        ))}
    </div>
  );
};

function ChildObject({ index, tag, sendData }) {
  const handleTagChange = (property, value) => {
    tag = { ...tag, [property]: value };
    sendData(tag);
  };

  const addChild = () => {
    const newChild = {name: "NewChild", data: "Data"};
    delete tag.data;
    const updatedChildren = tag.children? [...tag.children, newChild]: [newChild];
    const newTag = {...tag, children: updatedChildren};
    sendData(newTag);
  };

  return (
    <div style={{ border: "1px solid red", margin: "50px", textAlign: "left" }}>
      <div style={{ border: "1px solid blue", backgroundColor: "yellow" }}>
        <span>
          {tag.name}
          <button onClick={addChild}>Add Child</button>
        </span>
      </div>

      {!(tag.data === undefined) && (
        <div>
          <span>Data </span>
          <input
            type="text"
            value={tag.data}
            onChange={(e) => handleTagChange("data", e.target.value)}
            placeholder="data"
          />
        </div>
      )}

      {tag.children &&
        tag.children.map((child, index) => (
          <ChildObject
            key={index}
            index={index}
            tag={child}
            sendData={(updatedTag) => {
              tag.children[index] = updatedTag;
              sendData(tag);
            }}
          />
        ))}
    </div>
  );
}

export default TagView;
