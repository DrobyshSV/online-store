import './index.scss';
import App from './components/app/App';
import { PageIds } from './components/types';

let hash = window.location.hash.replace('#', '');
if (hash === '') {
  hash = 'main-page';
}

const app = new App();
app.start(hash);

export async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Error in copying text: ', err);
  }
}

export function idHelper(idPage: string) {
  const leftPartOfId = idPage.split('/')[0];
  const rightPartOfId = Number(idPage.split('/')[1]);
  return leftPartOfId === PageIds.ProductPage && rightPartOfId < 101 && rightPartOfId > 0;
}
