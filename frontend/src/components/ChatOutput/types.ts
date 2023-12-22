export type TResponse = { id: string | number; role: string; content: string };
export interface IProps {
  responses: TResponse[];

  autoScroll?: boolean;
}
