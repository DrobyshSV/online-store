abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};

  protected constructor(id: string) {
    this.container = document.createElement('main');
    this.container.id = id;
  }

  render() {
    return this.container;
  }
}

export default Page;
