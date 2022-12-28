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
  getSources(callback: ((data?: Array<ProductType>) => void) | undefined) {
    super.getResp(
      {
        endpoint: 'products',
      },
      callback
    );
  }
}

export default AppController;
