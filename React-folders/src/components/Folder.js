import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";

const Folder = ({ folder, expanded, setIsExpanded, parentPath, setData }) => {
  const [userAddingFolder, setUserAddingFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");

  const handleFolderExpand = (name, child) => {
    setIsExpanded((prev) => {
      const newSet = new Set(prev);

      //Tracking the path
      const fullPath = parentPath ? `${parentPath}/${name}` : `${name}`;

      newSet.has(fullPath) ? newSet.delete(fullPath) : newSet.add(fullPath);

      console.log(newSet);
      return newSet;
    });
  };

  const handleAddFolder = (path) => {
    console.log("folder adding", path);
    setUserAddingFolder(path);
    //Add the new folder to the data
  };

  const handleNewFolderRender = (e, parent, path) => {
    if (e.key === "Enter") {
      setUserAddingFolder(false);
      //Attach it to the child of the parent

      setData((prev) => {
        const handleAddChildFolder = (folder, path) => {
          return folder.map((fd) => {
            if (fd.name === path[0]) {
              if (path.length === 1) {
                return {
                  ...fd,
                  children: [
                    ...(fd.children || []),
                    {
                      name: newFolderName,
                      isFolder: !newFolderName.includes("."),
                    },
                  ],
                };
              } else {
                return {
                  ...fd,
                  children: handleAddChildFolder(
                    fd.children || [],
                    path.slice(1)
                  ),
                };
              }
            } else {
              return fd;
            }
          });
        };
        const iterpath = path.includes("/") ? path.split("/") : [path];
        console.log("iterpath", path, "Array", iterpath);
        const finalData = handleAddChildFolder(prev, iterpath);
        console.log("Final Data", finalData);
        return finalData;
      });
    }
    setNewFolderName(e.target.value);
  };

  return (
    <div className="folder">
      {folder.map((eachFolder, index) => {
        //   1) Movies so parent path is empty
        //   2) songs here also parent path is empty
        //   Then recurssion then their child are mapped
        //   Movies -> child 2025 and 2024
        //   Here the parent path to send to child is 'Movies'

        const fullPath =
          (parentPath ? parentPath + "/" : parentPath) + eachFolder?.name;
        return (
          <div key={index}>
            <div>
              <span
                onClick={() =>
                  handleFolderExpand(eachFolder?.name, eachFolder?.children)
                }
              >
                {eachFolder.isFolder ? (
                  expanded.has(fullPath) ? (
                    <FolderOpenOutlinedIcon className="folder-icon" />
                  ) : (
                    <FolderIcon className="folder-icon" />
                  )
                ) : (
                  <MovieFilterOutlinedIcon className="movie-icon" />
                )}
              </span>

              {eachFolder.name}
              <span onClick={() => handleAddFolder(fullPath)}>
                {eachFolder.isFolder && expanded.has(fullPath) ? (
                  <CreateNewFolderOutlinedIcon
                    fontSize="small"
                    className="add-folder-icon"
                  />
                ) : (
                  ""
                )}
              </span>
              {eachFolder.children && expanded.has(fullPath) && (
                <Folder
                  folder={eachFolder.children}
                  expanded={expanded}
                  setIsExpanded={setIsExpanded}
                  parentPath={fullPath}
                  setData={setData}
                />
              )}
            </div>
            {userAddingFolder === fullPath && (
              <input
                type="text"
                placeholder="Enter folder name"
                style={{ marginLeft: "25px" }}
                onChange={(e) => handleNewFolderRender(e)}
                onKeyDown={(e) =>
                  handleNewFolderRender(e, eachFolder.name, fullPath)
                }
                value={newFolderName}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Folder;
