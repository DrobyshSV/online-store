export const enum PageIds {
  MainPage = 'main-page',
  SettingsPage = 'settings-page',
  StatisticsPage = 'statistics-page',
}

class App {
  private container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  start() {
    this.container.innerText = 'Hello';
  }
}

export default App;
