import Page from '../../common/Page';
import AppController from './products/controller/controller';

class MainPage extends Page {
  static TextObject = {};
  private controller: AppController;

  constructor(id: string) {
    super(id);
    this.controller = new AppController();
  }

  render() {
    this.controller.getSources((data) => {
      console.log(data);
    });
    return this.container;
  }
}

export default MainPage;
