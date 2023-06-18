export type CreateMailTemplateDTO = {
  file: Express.Multer.File;
  name: string;
  userId: string;
};
