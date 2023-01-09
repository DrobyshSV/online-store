import Header from '../header/Header';
import Footer from '../Footer/Footer';
import Page from '../common/Page';
import {ErrorTypes, PageIds} from '../types/types';
import MainPage from '../pages/main/MainPage';
import ProductPage from '../pages/product/ProductPage';
import BasketPage from '../../components/basket/Basket';
import ErrorPage from '../pages/error/ErrorPage';
import Payment from '../payment/Payment';


class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId = PageIds.ProductPage;
  private header: Header;
  private footer: Footer;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`main`);
    if (currentPageHTML) {
      currentPageHTML.innerHTML = ''
    }
    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage.split('/')[0] === PageIds.ProductPage) {
      page = new ProductPage(idPage);
    } else if (idPage === PageIds.BasketPage) {
      page = new BasketPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      const header = document.querySelector('header');
      header ?
        header.after(pageHTML) :
        App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header('header', 'header-container');
    this.footer = new Footer('footer', 'footer-container');
  }

  start() {
    App.container.append(this.header.render());
    App.renderNewPage('main-page');
    this.enableRouteChange();
    App.container.append(this.footer.render());
  }
}

export default App;
