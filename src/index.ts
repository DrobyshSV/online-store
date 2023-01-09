import './index.scss';
import App from './components/app/App';

const app = new App();
app.start();

export async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Error in copying text: ', err);
  }
}
