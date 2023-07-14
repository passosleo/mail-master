import { ServiceResult } from '../@types/generic';
import {
  CreateMailTemplateDTO,
  UpdateMailTemplateDTO,
} from '../data/dtos/mail-template';
import { useMailTemplateRepository } from '../data/repositories/mail-template-repository';
import { useHelpers } from '../helpers/helpers';

export function useMailTemplateService() {
  const mailTemplateRepository = useMailTemplateRepository();
  const helpers = useHelpers();

  async function getMailTemplates(): Promise<ServiceResult> {
    const templates = await mailTemplateRepository.findAll();

    return {
      success: true,
      data: templates.map((template) => ({
        ...template,
        fileUrl: 'http://localhost:3000/uploads/templates/' + template.file,
      })),
    };
  }

  async function getMailTemplateById(
    templateId: string,
  ): Promise<ServiceResult> {
    const template = await mailTemplateRepository.findOneBy({ templateId });

    return template
      ? {
          success: true,
          data: {
            ...template,
            fileUrl: 'http://localhost:3000/uploads/templates/' + template.file,
          },
        }
      : {
          success: false,
          error: 'Template not found',
        };
  }

  async function createMailTemplate({
    file,
    name,
    userId,
  }: CreateMailTemplateDTO): Promise<ServiceResult> {
    const nameExists = await mailTemplateRepository.findOneBy({ name });

    if (nameExists) {
      helpers.file.removeFile(file.path);
      return {
        success: false,
        error: 'Template name already exists',
      };
    }

    const templateId = file.filename.split('.')[0];
    const template = await mailTemplateRepository.create({
      templateId,
      name,
      file: file.filename,
      createdBy: userId,
      updatedBy: userId,
    });

    return {
      success: true,
      data: template,
    };
  }

  async function updateMailTemplate(
    templateId: string,
    { file, name, userId }: UpdateMailTemplateDTO,
  ): Promise<ServiceResult> {
    const [template, nameExists] = await Promise.all([
      mailTemplateRepository.findOneBy({ templateId }),
      mailTemplateRepository.findOneBy({ name }),
    ]);

    if (!template) {
      if (file) helpers.file.removeFile(file.path);
      return {
        success: false,
        error: 'Template not found',
      };
    }

    if (name && nameExists && nameExists.templateId !== templateId) {
      if (file) helpers.file.removeFile(file.path);
      return {
        success: false,
        error: 'Template name already exists',
      };
    }

    const templateData = {
      name: name ? name : template.name,
      updatedBy: userId,
    };

    const { affected: isUpdated } = await mailTemplateRepository.update(
      { templateId },
      templateData,
    );

    if (file && !!isUpdated) {
      const oldFilepath = `uploads/templates/` + template.file;
      helpers.file.removeFile(oldFilepath);
      helpers.file.renameFile(file.path, oldFilepath);
    }

    return {
      success: true,
    };
  }

  async function deleteMailTemplate(
    templateId: string,
  ): Promise<ServiceResult> {
    const template = await mailTemplateRepository.findOneBy({ templateId });

    if (!template) {
      return {
        success: false,
        error: 'Template not found',
      };
    }

    const { affected } = await mailTemplateRepository.remove({ templateId });

    const isDeleted = !!affected;

    if (isDeleted) {
      const oldFilepath = `uploads/templates/` + template.file;
      helpers.file.removeFile(oldFilepath);
    }

    return {
      success: true,
    };
  }

  return {
    getMailTemplates,
    getMailTemplateById,
    createMailTemplate,
    updateMailTemplate,
    deleteMailTemplate,
  };
}
