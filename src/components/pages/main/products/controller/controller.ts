import AppLoader from './appLoader';
import { ProductType } from '../../../../types';

class AppController extends AppLoader {
  getSources(callback: (data?: Array<ProductType>) => void) {
    super.getResp(
      {
        endpoint: 'products',
      },
      callback
    );
  }
}

export default AppController;
