import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface WeChatResponse<T = any> {
  errcode?: number;
  errmsg?: string;
  [key: string]: any;
}

export interface RequestConfig extends AxiosRequestConfig {
  retry?: number;
  retryDelay?: number;
}

class WeChatRequest {
  private instance: AxiosInstance;
  private defaultRetry: number = 3;
  private defaultRetryDelay: number = 1000;

  constructor() {
    this.instance = axios.create({
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: any) => {
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  async request<T = any>(config: RequestConfig): Promise<T> {
    const response = await this.instance.request<T>(config);
    return response.data;
  }

  async postWithRetry<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const retry = config?.retry || this.defaultRetry;
    const retryDelay = config?.retryDelay || this.defaultRetryDelay;
    let lastError: Error | null = null;

    for (let i = 0; i < retry; i++) {
      try {
        const response = await this.post<T>(url, data, config);
        return response;
      } catch (error) {
        lastError = error as Error;
        if (i < retry - 1) {
          await this.delay(retryDelay);
        }
      }
    }

    throw lastError;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const weChatRequest = new WeChatRequest();
export default weChatRequest;
