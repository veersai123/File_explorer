import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFile, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { getFileIcon } from './utils/iconMapper'; 
import folderStructure from './FolderStructure';
import './FileExplorer.css'; 
import boyImage from './assets/boy.png';  // Importing the image

const FileExplorer = () => {
  const [structure, setStructure] = useState(folderStructure);
  const [showImage, setShowImage] = useState(false);  // State to control the image display

  const addFile = (folder) => {
    const fileName = prompt("Enter new file name:");
    if (fileName) {
      const newStructure = addToStructure(structure, folder, { name: fileName, type: "file" });
      setStructure(newStructure);
    }
  };

  const addFolder = (folder) => {
    const folderName = prompt("Enter new folder name:");
    if (folderName) {
      const newStructure = addToStructure(structure, folder, { name: folderName, type: "folder", children: [] });
      setStructure(newStructure);
    }
  };
  const editItem = (item) => {
    const newName = prompt("Enter new name:", item.name);
    if (newName) {
      const newStructure = updateItemName(structure, item, newName);
      console.log("New Structure:", newStructure);  // Debug the new structure
      setStructure(newStructure);
    }
  };
  

  const deleteItem = (item) => {
    if (item.name === 'root') {
      setShowImage(true);  // Show image when root is deleted
    } else {
      const newStructure = deleteFromStructure(structure, item);
      setStructure(newStructure);
    }
  };

  const addToStructure = (currentStructure, parent, newItem) => {
    if (currentStructure === parent) {
      return {
        ...currentStructure,
        children: [...(currentStructure.children || []), newItem],
      };
    }

    return {
      ...currentStructure,
      children: currentStructure.children.map((child) =>
        child.type === "folder" ? addToStructure(child, parent, newItem) : child
      ),
    };
  };

  const updateItemName = (currentStructure, item, newName) => {
    if (currentStructure === item) {
      return { ...currentStructure, name: newName };  // Update name if this is the item
    }
  
    return {
      ...currentStructure,
      children: currentStructure.children.map((child) =>
        child === item ? { ...child, name: newName } : updateItemName(child, item, newName) // Recursively update
      ),
    };
  };

  const deleteFromStructure = (currentStructure, itemToDelete) => {
    if (currentStructure === itemToDelete) {
      return null; 
    }

    return {
      ...currentStructure,
      children: currentStructure.children
        ? currentStructure.children
            .map((child) => deleteFromStructure(child, itemToDelete))
            .filter(Boolean) 
        : [],
    };
  };

  return (
    <div className="file-explorer">
      <h1>File Explorer</h1>
      {showImage ? (
        <div>
          <img src={boyImage} alt="Boy asking not to delete" style={{ width: '300px', margin: '0 auto' }} />
        </div>
      ) : (
        <FolderComponent folder={structure} addFile={addFile} addFolder={addFolder} editItem={editItem} deleteItem={deleteItem} />
      )}
    </div>
  );
};

const FolderComponent = ({ folder, addFile, addFolder, editItem, deleteItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFolder = () => setIsOpen(!isOpen);

  return (
    <div className="nested-folder">
      <div className="folder-header">
        <span onClick={toggleFolder} style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faFolder} className="folder-icon" /> {folder.name}
        </span>
        <div className="actions">
          <button onClick={() => addFile(folder)}>
            <FontAwesomeIcon icon={faFile} className="file-icon" />  
          </button>
          <button onClick={() => addFolder(folder)}>
            <FontAwesomeIcon icon={faFolder} className="folder-icon" />  
          </button>
          <button onClick={() => editItem(folder)}>
            <FontAwesomeIcon icon={faEdit} className="edit-icon" />
          </button>
          <button onClick={() => deleteItem(folder)}>
            <FontAwesomeIcon icon={faTrash} className="delete-icon" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div>
          {folder.children &&
            folder.children.map((child, index) =>
              child.type === "folder" ? (
                <FolderComponent 
                  key={index} 
                  folder={child} 
                  addFile={addFile} 
                  addFolder={addFolder} 
                  editItem={editItem} 
                  deleteItem={deleteItem} 
                />
              ) : (
                <div key={index} className="file-item">
                  {getFileIcon(child.name)} {child.name}
                  <div className="actions">
                    <button onClick={() => editItem(child)}><FontAwesomeIcon icon={faEdit} /></button>
                    <button onClick={() => deleteItem(child)}><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
