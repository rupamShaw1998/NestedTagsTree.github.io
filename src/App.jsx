import { useState } from "react";
import TagView from "./components/TagView";
import "./App.css";

function App() {
  const [showExport, setShowExport] = useState(false);
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
      updatedTree.name = updatedTag.name;
      updatedTree.data = updatedTag.data;
      updatedTree.children = updatedTag.children;
      return updatedTree;
    });
  };

  console.log({tree});

  return (
    <div>
      <h1>Nested Tags Tree</h1>
      <TagView tag={tree} sendData={handleTagChange} />
      <button onClick={() => setShowExport(true)}>Export</button>
      {showExport && <div>{JSON.stringify(tree)}</div>}
    </div>
  );
}

export default App;
