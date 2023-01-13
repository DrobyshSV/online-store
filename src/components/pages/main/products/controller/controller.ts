import AppLoader from './appLoader';
import { ProductType } from '../../../../types';

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
