import { apiRequest } from "./queryClient";
import type { DashboardData, AdminConfig, ValidationResult, RowConfiguration } from "../types/dashboard";

export const api = {
  auth: {
    login: async (password: string) => {
      const response = await apiRequest("POST", "/api/admin/auth", { password });
      return response.json();
    }
  },

  config: {
    get: async (): Promise<AdminConfig> => {
      const response = await apiRequest("GET", "/api/admin/config");
      return response.json();
    },

    update: async (config: Partial<AdminConfig & { rowConfiguration?: RowConfiguration }>) => {
      const response = await apiRequest("POST", "/api/admin/config", config);
      return response.json();
    },

    validateUrl: async (url: string): Promise<ValidationResult> => {
      const response = await apiRequest("POST", "/api/admin/validate-url", { url });
      return response.json();
    }
  },

  dashboard: {
    getData: async (): Promise<DashboardData> => {
      const response = await apiRequest("GET", "/api/dashboard/data");
      return response.json();
    }
  }
};
