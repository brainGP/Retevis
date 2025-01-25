export interface Product {
  _id: string;
  name: string;
  brand: string;
  type: string;
  style: string;
  price: number;
  priceN: number;
  description: string;
  battery: string;
  power: string;
  hertz: string;
  status: boolean;
  size: string;
  images: { image: string }[];
  quantity: number;
  sort: string;
  rating: number;
}
