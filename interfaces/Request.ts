export interface IRequest {
  url: string;
  method?: string;
  headers?: { [key: string]: string },
  body?: string
};
