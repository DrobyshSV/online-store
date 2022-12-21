import Page from '../../common/Page';

class MainPage extends Page {
  static TextObject = {};

  constructor(id: string) {
    super(id);
  }

  render() {
    return this.container;
  }
}

export default MainPage;
