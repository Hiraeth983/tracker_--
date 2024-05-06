export interface Types<T = Record<string, any>> {
  text: string | number | undefined | null;
  type: string;
  data: T;
}

export type Send = <T = Record<string, any>>(params: Types<T>) => void;