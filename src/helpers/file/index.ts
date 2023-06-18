import fs from 'fs';

export function useFileHelper() {
  function removeFile(path: string) {
    fs.unlinkSync(path);
  }

  return {
    removeFile,
  };
}
