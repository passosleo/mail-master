export type CreateMailTemplateDTO = {
  file: Express.Multer.File;
  name: string;
  userId: string;
};

export type UpdateMailTemplateDTO = {
  file?: Express.Multer.File;
  name?: string;
  userId: string;
};
