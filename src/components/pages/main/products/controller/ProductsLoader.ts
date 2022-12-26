export interface IOptions {
  limit?: string;
  search?: string;
}

type RespType = {
  endpoint: string;
  options?: Partial<OptionsType>;
};
type OptionsType = {
  sources?: string;
  limit?: string;
  search?: string;
};

enum StatusCode {
  Unauthorized = 401,
  NotFound = 404,
}

class ProductsLoader {
  baseLink: string;
  options: IOptions;
  private searchKeyEvent: string;

  constructor(baseLink: string, options: IOptions) {
    this.baseLink = baseLink;
    this.options = options;
    this.searchKeyEvent = '';
  }

  getResp(
    { endpoint, options = {} }: RespType,
    callback = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === StatusCode.Unauthorized || res.status === StatusCode.NotFound)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: IOptions, endpoint: string) {
    const urlOptions: { [index: string]: string } = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}?q=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: <T>(data: T) => void, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res): Promise<any> => res.json())
      .then((data) => callback({ ...data }))
      .catch((err: Error) => console.error(err));
  }
}

export default ProductsLoader;
