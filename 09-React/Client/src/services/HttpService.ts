import { ErrorResponseModel } from '../models/ErrorResponseModel';

const apiKey = process.env.REACT_APP_REST_API_KEY;
const appId = process.env.REACT_APP_APP_ID;
const baseUrl = `https://eu-api.backendless.com/${appId}/${apiKey}`;

export default class HttpService {
  public async get<T>(
    path: string,
    headersToAdd: Headers | undefined = undefined
  ): Promise<T> {
    const headers: Headers = await this.appendHeaders(headersToAdd, false);

    return fetch(`${baseUrl}/${path}`, {
      method: 'GET',
      headers
    }).then(this.handleResponse);
  }

  public async post<T>(
    path: string,
    body:
      | string
      | FormData
      | Blob
      | ArrayBufferView
      | ArrayBuffer
      | URLSearchParams
      | ReadableStream<Uint8Array>
      | null
      | undefined,
    headersToAdd: Headers | undefined = undefined
  ): Promise<T> {
    const headers: Headers = await this.appendHeaders(headersToAdd, false);

    return fetch(`${baseUrl}/${path}`, {
      method: 'POST',
      headers,
      body
    }).then(this.handleResponse);
  }

  private readonly appendHeaders = async (
    headersToAdd: Headers | undefined,
    isDelete: boolean
  ): Promise<Headers> => {
    const headers: Headers = new Headers();

    if (headersToAdd !== undefined) {
      const headersIterator: IterableIterator<[
        string,
        string
      ]> = headersToAdd.entries();
      let result: IteratorResult<[string, string]> = headersIterator.next();
      while (!result.done) {
        headers.append(result.value[0], result.value[1]);
        result = headersIterator.next();
      }
    }

    if (isDelete) {
      headers.append('Accept', 'application/json; text/javascript, */*');
      headers.append('Content-Type', 'application/json; charset=UTF-8');
    }

    return headers;
  };

  private readonly handleResponse = async (response: Response) => {
    return response.text()
      .then((text: string) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
          const error = data as ErrorResponseModel;
          return Promise.reject(error);
        }

        return data;
      });
  };
}