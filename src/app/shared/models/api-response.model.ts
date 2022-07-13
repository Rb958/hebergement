export interface ApiResponseModel<T>{
  message: string;
  code: number;
  result: T;
}
