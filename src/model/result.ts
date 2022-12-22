import { HttpStatus } from '@nestjs/common';

export class Result {
  isSuccess: boolean;
  httpStatus?: HttpStatus;
  errorMessage?: string;

  constructor(isSuccess: boolean, error?: HttpStatus, errorMessage?: string) {
    this.isSuccess = isSuccess;
    this.httpStatus = error;
    this.errorMessage = errorMessage;
  }

  static OK(): Result {
    return new Result(true, null, null);
  }

  static BAD(httpStatus: HttpStatus, errorMessage: string): Result {
    return new Result(false, httpStatus, errorMessage);
  }

  isBad(): boolean {
    return !this.isSuccess;
  }

  isErrorSet(): this is Result &
    Required<Pick<Result, 'httpStatus' | 'errorMessage'>> {
    return !this.isSuccess;
  }
}
