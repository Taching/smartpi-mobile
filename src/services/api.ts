import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface DeviceCommand {
  device: string;
  action: string;
  parameters?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface WaterPlantsResponse {
  status: string;
  message: string;
  device_id: string;
  device_name: string;
  timer_seconds: number;
}

class Api {
  private client: AxiosInstance;

  constructor(config: ApiConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        ...config.headers, // Merge config headers instead of overriding
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  async healthCheck(): Promise<ApiResponse> {
    try {
      const response = await this.client.get("health/");

      const isHealthy = response.data?.status === "ok";
      return {
        success: isHealthy,
        data: response.data,
        error: isHealthy ? undefined : "Health check returned non-ok status",
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }
  async waterPlants(
    timer_seconds: number
  ): Promise<ApiResponse<WaterPlantsResponse>> {
    try {
      const response = await this.client.post("switchbot/turn-on-timer", {
        device_name: "pump",
        timer_seconds: timer_seconds,
      });
      return {
        success: true,
        data: response.data,
        error: undefined,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }
}

export default Api;
