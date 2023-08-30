import { useState } from "react";
import TagView from "./components/TagView";
import "./App.css";

function App() {
  const [tree, setTree] = useState({
    name: "root",
    children: [
      {
        name: "child1",
        children: [
          { name: "child1-child1", data: "c1-c1 Hello" },
          { name: "child1-child2", data: "c1-c2 JS" },
        ],
      },
      { name: "child2", data: "c2 World" },
    ],
  });

  const handleTagChange = (updatedTag) => {
    setTree((prevTree) => {
      const updatedTree = { ...prevTree };
      // Update the tag in the tree hierarchy
      // You might need a recursive function to find and update the tag
      // Here, we are updating the root level tag for simplicity
      updatedTree.name = updatedTag.name;
      updatedTree.data = updatedTag.data;
      return updatedTree;
    });
  };

  return (
    <div>
      <h1>Nested Tags Tree</h1>
      <TagView tag={tree} onTagChange={handleTagChange} />
    </div>
  );
}

export default App;
