import AppLoader from './appLoader';

export interface ISources {
  products: [
    {
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
    }
  ];
  total: number;
  skip: number;
  limit: number;
}

class AppController extends AppLoader {
  getSources(callback: ((data?: ISources) => void) | undefined) {
    super.getResp(
      {
        endpoint: 'products',
      },
      callback
    );
  }
}

export default AppController;
