import CreateHtml from '../CreateHtml';

class RangeSlider extends CreateHtml {
  private routerParams: Record<string, string>;

  constructor(routerParams: Record<string, string>) {
    super();
    this.routerParams = routerParams;
  }

  getDoubleRange(type: string, node: HTMLElement, minValue: string, maxValue: string) {
    const divWrapper = this.createElement('div', 'wrapper');
    const values = this.createElement('div', 'values');
    const range1 = this.createElement('span', 'range1');
    range1.classList.add(`${type.split('-')[0]}-range`);
    const dash = this.createElement('span', 'dash');
    dash.textContent = '-';
    const range2 = this.createElement('span', 'range2');
    range2.classList.add(`${type.split('-')[0]}-range`);
    values.append(range1, dash, range2);
    const divContainer = this.createElement('div', 'container');
    divContainer.classList.add(type);
    const divSliderTrack = this.createElement('div', 'slider-track');
    divSliderTrack.classList.add(`${type.split('-')[0]}-track`);
    const rangeSliderLeft = this.createElement('input', 'slider-1') as HTMLInputElement;
    rangeSliderLeft.setAttribute('type', 'range');
    rangeSliderLeft.setAttribute('min', minValue);
    rangeSliderLeft.setAttribute('max', maxValue);

    const rangeSliderRight = this.createElement('input', 'slider-2') as HTMLInputElement;
    rangeSliderRight.setAttribute('type', 'range');
    rangeSliderRight.setAttribute('min', minValue);
    rangeSliderRight.setAttribute('max', maxValue);

    const searchKey = type.split('-')[0];
    if (this.routerParams.hasOwnProperty(searchKey)) {
      const searchKeyArray = this.routerParams[searchKey].split('↕');
      range1.textContent = searchKeyArray[0];
      range2.textContent = searchKeyArray[1];
      rangeSliderLeft.setAttribute('value', searchKeyArray[0]);
      rangeSliderRight.setAttribute('value', searchKeyArray[1]);
    } else {
      range1.textContent = minValue;
      range2.textContent = maxValue;
      rangeSliderLeft.setAttribute('value', minValue);
      rangeSliderRight.setAttribute('value', maxValue);
    }

    divContainer.append(divSliderTrack, rangeSliderLeft, rangeSliderRight);
    divWrapper.append(values, divContainer);
    node.append(divWrapper);
    this.rangeColor(rangeSliderLeft, rangeSliderRight, divSliderTrack, range1, range2);
  }

  rangeColor(
    rangeSliderLeft: HTMLInputElement,
    rangeSliderRight: HTMLInputElement,
    divSliderTrack: HTMLElement,
    range1: HTMLElement,
    range2: HTMLElement
  ) {
    function fillColor() {
      const percent1: number = (parseInt(rangeSliderLeft.value) / parseInt(rangeSliderLeft.max)) * 100;
      const percent2: number = (parseInt(rangeSliderRight.value) / parseInt(rangeSliderLeft.max)) * 100;
      divSliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
    }

    function slideLeft() {
      if (parseInt(rangeSliderRight.value) - parseInt(rangeSliderLeft.value) <= 0) {
        rangeSliderLeft.value = parseInt(rangeSliderRight.value).toString();
      }
      range1.textContent = rangeSliderLeft.value;
      fillColor();
    }

    function slideRight() {
      if (parseInt(rangeSliderRight.value) - parseInt(rangeSliderLeft.value) <= 0) {
        rangeSliderRight.value = parseInt(rangeSliderLeft.value).toString();
      }
      range2.textContent = rangeSliderRight.value;
      fillColor();
    }

    slideLeft();
    slideRight();
    rangeSliderLeft.addEventListener('change', () => slideLeft());
    rangeSliderRight.addEventListener('change', () => slideRight());
  }
}

export default RangeSlider;
