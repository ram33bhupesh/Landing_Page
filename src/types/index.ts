export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
}

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}