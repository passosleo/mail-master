import { MailTemplate } from '../entities/mail-template';
import { useBaseRepository } from './base-repository';

export function useMailTemplateRepository() {
  const baseRepository = useBaseRepository<MailTemplate>({
    entity: MailTemplate,
  });

  return {
    ...baseRepository,
  };
}
