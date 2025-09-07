import { useQuery } from "@tanstack/react-query";
import type { HeroContent, AboutContent, ServicesContent, ContactContent } from "@shared/schema";

export interface WebsiteContentData {
  hero?: HeroContent;
  about?: AboutContent;  
  services?: ServicesContent;
  contact?: ContactContent;
}

export function useWebsiteContent() {
  return useQuery({
    queryKey: ['website-content'],
    queryFn: async (): Promise<WebsiteContentData> => {
      const response = await fetch("/api/admin/content", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch website content');
      }
      
      return response.json();
    },
    // Cache for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Retry on failure
    retry: 2
  });
}

export function useHeroContent() {
  const { data, isLoading, error } = useWebsiteContent();
  return {
    heroContent: data?.hero,
    isLoading,
    error
  };
}

export function useAboutContent() {
  const { data, isLoading, error } = useWebsiteContent();
  return {
    aboutContent: data?.about,
    isLoading,
    error
  };
}

export function useServicesContent() {
  const { data, isLoading, error } = useWebsiteContent();
  return {
    servicesContent: data?.services,
    isLoading,
    error
  };
}

export function useContactContent() {
  const { data, isLoading, error } = useWebsiteContent();
  return {
    contactContent: data?.contact,
    isLoading,
    error
  };
}