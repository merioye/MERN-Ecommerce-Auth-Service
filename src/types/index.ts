type ErrorFormat = {
  message: string;
  field: string;
  location: string;
  stack: string | null;
};

type LoggerErrorMetadata = {
  id: string;
  errors?: ErrorFormat[];
  stack: string;
  statusCode: number;
  path: string;
  method: string;
};

type ApiResponseParams = {
  result: unknown;
  message?: string;
  statusCode?: number;
};

export { ErrorFormat, LoggerErrorMetadata, ApiResponseParams };
