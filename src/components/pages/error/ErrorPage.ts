import Page from '../../common/Page';
import { ErrorTypes } from '../../types/types';

class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  static TextObject: { [prop: string]: string } = {
    '404': 'Error! The page was not found.',
  };

  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    this.container.innerText = 'scass'
    return this.container;
  }
}

export default ErrorPage;
