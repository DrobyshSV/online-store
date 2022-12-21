import Page from '../../common/Page';

class ProductPage extends Page {
  static TextObject = {
    MainTitle: 'Settings Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    return this.container;
  }
}

export default ProductPage;
