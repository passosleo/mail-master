import fs from 'fs';

export function useFileHelper() {
  function removeFile(path: string) {
    fs.unlinkSync(path);
  }

  function renameFile(oldPath: string, newPath: string) {
    fs.renameSync(oldPath, newPath);
  }

  return {
    removeFile,
    renameFile,
  };
}
