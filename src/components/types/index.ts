export const enum PageIds {
  MainPage = 'main-page',
  ProductPage = 'product-page',
  BasketPage = 'basket-page',
}

export const enum ErrorTypes {
  Error_404 = 404,
}

export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
};

export interface ISources {
  products: Array<ProductType>;
  total: number;
  skip: number;
  limit: number;
}

export interface IOptions {
  limit?: string;
}

export type RespType = {
  endpoint: string;
  options?: Partial<OptionsType>;
};

export type OptionsType = {
  sources?: string;
  limit?: string;
  search?: string;
};

export enum StatusCode {
  Unauthorized = 401,
  NotFound = 404,
}

export type FilterStateType = {
  categories: Array<string>;
  brands: Array<string>;
  price: Array<number>;
  stock: Array<number>;
  state: Array<ProductType>;
  filter: Array<ProductType>;
  setCategory: (str: string) => void;
  setBrand: (str: string) => void;
  setPrice: (str: number) => void;
  setStock: (str: number) => void;
  setState: (arr: Array<ProductType>) => void;
  setFilter: (arr: Array<ProductType>) => void;
};

export type loadCallbackType = <T>(data: T) => void;
