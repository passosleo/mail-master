export type ServiceResult<T = any> =
  | {
      success: true;
      data?: T;
    }
  | {
      success: false;
      error: string;
    };
