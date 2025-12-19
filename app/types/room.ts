export interface Room {
  id: number;
  name: string;
  price: number;
  image: string;
  features: string[];
}

export interface Amenity {
  icon: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
}
