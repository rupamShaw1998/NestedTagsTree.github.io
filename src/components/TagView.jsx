import { Collapse } from "antd";
import React, { useState } from "react";

const TagView = ({ tag, sendData }) => {
  const [editName, setEditName] = useState(false);

  const nameChange = (e) => {
    if (e.key === "Enter") {
      handleTagChange("name", e.target.value);
      setEditName(false);
    }
  };

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

  const getName = () => {
    return (
      <div>
        {editName ? (
          <input
            type="text"
            defaultValue={tag.name}
            onKeyUp={nameChange}
          />
        ) : (
          <span onClick={() => setEditName(true)}>{tag.name}</span>
        )}
      </div>
    );
  }

  const getDataAndChildren = () => {
    return (
      <div>
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
            <TagView
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
  }

  return (
    <div style={{ textAlign: "left", marginBottom: "5px" }}>
      <Collapse
        collapsible="icon"
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: getName(), 
            children: getDataAndChildren(), 
            extra: <button onClick={addChild}>Add Child</button>
          }
        ]}
      />
    </div>
  );
};


export default TagView;
