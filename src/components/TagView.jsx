import { Button, Collapse, Input, Typography } from "antd";
import React, { useState } from "react";
import "./TagView.css";

const { Text } = Typography;

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
          <Text strong onClick={() => setEditName(true)}>{tag.name}</Text>
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
            <Input
              type="text"
              value={tag.data}
              onChange={(e) => handleTagChange("data", e.target.value)}
              placeholder="data"
              style={{width: "20%"}}
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
            extra: <Button onClick={addChild}>Add Child</Button>
          }
        ]}
      />
    </div>
  );
};

export default TagView;
