import { ProductType } from '../../../../types';

import AppLoader from './appLoader';

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
