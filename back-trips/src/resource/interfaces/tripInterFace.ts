export interface TripInterFaceRead {
    id: number;
    title: string;
    city: string;
    land: string;
    street: string;
    coordinatesx: string;
    coordinatesy: string;
    imageurl: string;
    imagealt: string;
    description: string;
    price: string
    activitytime: string;
    category: string;

  }

export interface TripInterFaceCreate {
  title: string;
  city: string;
  land: string;
  street: string;
  coordinatesx: string;
  coordinatesy: string;
  imageurl: string;
  imagealt: string;
  description: string;
  price: string;
  activitytime: string;
  category: string;
}

export interface MessageInterFaceReade {
  id: number
  trip_id: number;
  name: string;
  massage: string;
}

export interface MessageInterFaceCreate {
  trip_id: number;
  name: string;
  massage: string;
}


