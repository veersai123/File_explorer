import { DiJava, DiCss3, DiHtml5, DiJavascript1, DiPython, DiGit } from 'react-icons/di';

// Map file extensions to icons
export const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();

  switch (extension) {
    case 'java':
      return <DiJava size="1.5em" />;
    case 'js':
      return <DiJavascript1 size="1.5em" />;
    case 'css':
      return <DiCss3 size="1.5em" />;
    case 'html':
      return <DiHtml5 size="1.5em" />;
    // case 'cpp':
    // case 'c++':
    //   return <DiCplusplus size="2em" />;
    case 'gitignore':
      return <DiGit size="1.5em" />;
    case 'py':
      return <DiPython size="1.5em" />;
    default:
      return <DiHtml5 size="1.5em" />; // Default icon
  }
};
