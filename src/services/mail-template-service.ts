import { ServiceResult } from '../@types/generic';
import { CreateMailTemplateDTO } from '../data/dtos/mail-template';
import { useMailTemplateRepository } from '../data/repositories/mail-template-repository';
import { useHelpers } from '../helpers/helpers';

export function useMailTemplateService() {
  const mailTemplateRepository = useMailTemplateRepository();
  const helpers = useHelpers();

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

  return {
    createMailTemplate,
  };
}
