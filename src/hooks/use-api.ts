import axios from "axios";
import { useState } from "react";

export default function useApi() {
    const [isLoading, setIsLoading] = useState(false);
    
  const axiosInstance = axios.create({
    baseURL: "https://api.example.com",
    timeout: 5000,
  });
    
    const get = async <T>(
        url: string,
        args?: {
            onSuccessMessage?: string;
            onErrorMessage?: string;
            isSilent?: boolean;
            signal?: AbortSignal;
        }): Promise<T | undefined> => { 
        
        try {
            setIsLoading(true);
            const response = await axiosInstance.get<T>(url, {
                signal: args?.signal,
            });
            if (response.status === 200) {
                args?.onSuccessMessage && alert(args.onSuccessMessage);
                return response.data;
            }
        } catch (error) {
            args?.onErrorMessage && alert(args.onErrorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        get,
    };
}


