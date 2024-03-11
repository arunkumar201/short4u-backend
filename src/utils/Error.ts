//  create error function
export const CreateError = (message: string, statusCode: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = new Error();
  error.message = message;
  error.statusCode = statusCode;
  return error;
};
