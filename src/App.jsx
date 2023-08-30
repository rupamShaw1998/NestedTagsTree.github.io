import { useEffect, useState } from "react";
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
      { name: "child2", children: [{name: "NewChild", data: "Data"}] },
    ],
  });

  const handleTagChange = (updatedTag) => {
    console.log({updatedTag});
    setTree((prevTree) => {
      const updatedTree = { ...prevTree };
      updatedTree.name = updatedTag.name;
      updatedTree.data = updatedTag.data;
      return updatedTree;
    });
  };

  console.log({tree})

  return (
    <div>
      <h1>Nested Tags Tree</h1>
      <TagView tag={tree} sendData={handleTagChange} />
    </div>
  );
}

export default App;
