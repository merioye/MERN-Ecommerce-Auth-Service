import { ApiResponseParams, ErrorFormat } from '../types';

export class ApiResponse {
  public readonly errors: ErrorFormat[] = [];
  public readonly errorInfo = {};
  public readonly result: unknown;
  public readonly message: string;
  public readonly success: boolean;
  public readonly statusCode: number;

  public constructor({
    result,
    message = 'Success',
    statusCode = 200,
  }: ApiResponseParams) {
    this.result = result;
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
  }
}
