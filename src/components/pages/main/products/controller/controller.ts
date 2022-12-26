import AppLoader from './appLoader';

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

class AppController extends AppLoader {
  getSources(callback: ((data?: ISources) => void) | undefined, search = '') {
    super.getResp(
      {
        endpoint: 'products/',
        options: {
          search: search,
        },
      },
      callback
    );
  }
}

export default AppController;
