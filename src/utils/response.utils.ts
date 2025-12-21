import { Response } from "express";

interface IResponseJson {
  statusCode: number;
  message: string;
  data: unknown;
  res: Response; // to call the res.json()
  success: true | false;
}

function responseJsonHandler(params: IResponseJson) {
  return params.res.json({
    statusCode: params.statusCode,
    message: params.message,
    data: params.data,
    success: params.success,
  });
}

export { responseJsonHandler };
