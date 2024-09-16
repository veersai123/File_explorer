// FolderStructure.js
const folderStructure = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "public",
      type: "folder",
      children: [
        {
          name: "public nested 1",
          type: "folder",
          children: [
            { name: "index.html", type: "file" },
            { name: "hello.html", type: "file" },
            { name: "public_nested_file", type: "file" },
          ],
        },
      ],
    },
    {
      name: "src",
      type: "folder",
      children: [
        { name: "App.js", type: "file" },
        { name: "Index.js", type: "file" },
        { name: "styles.css", type: "file" },
      ],
    },
    { name: "package.json", type: "file" },
  ],
};

export default folderStructure;
