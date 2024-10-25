import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = `https://${process.env.NEXT_PUBLIC_API}`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar o token de autenticação
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento global de erros
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirecionar para página de login ou limpar o token
      Cookies.remove('authToken');
      window.location.href = '/'    
    }
    return Promise.reject(error);
  }
);

export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
    axiosInstance.get<T>(url, config),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
    axiosInstance.post<T>(url, data, config),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
    axiosInstance.put<T>(url, data, config),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => 
    axiosInstance.delete<T>(url, config),
};

export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.message || "Ocorreu um erro. Por favor, tente novamente.";
  }
  return "Ocorreu um erro ao se conectar ao servidor.";
};