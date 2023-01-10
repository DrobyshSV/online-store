import { FilterStateType, ProductType } from '../types/types';

export const filterState: FilterStateType = {
  categories: [],
  brands: [],
  price: [],
  stock: [],
  state: [],
  filter: [],
  setCategory(category: string) {
    if (!this.categories.some((t) => t === category)) {
      this.categories.push(category);
      this.categories.sort();
    }
  },
  setBrand(brand: string) {
    if (!this.brands.some((t) => t.toLowerCase() === brand.toLowerCase())) {
      this.brands.push(brand);
      this.brands.sort();
    }
  },
  setPrice(price: number) {
    if (!this.price.some((t) => t === price)) {
      this.price.push(price);
    }
    this.price.sort((a, b) => a - b);
  },
  setStock(stock: number) {
    if (!this.stock.some((t) => t === stock)) {
      this.stock.push(stock);
    }
    this.stock.sort((a, b) => a - b);
  },
  setState(arr: Array<ProductType>) {
    this.state = [...arr];
  },
  setFilter(arr: Array<ProductType>) {
    this.filter = [...arr];
  },
};
