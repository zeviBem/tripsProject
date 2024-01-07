export interface TripInterFaceReade {
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
    createdAt?: Date;
    updatedAt?: Date;
    category: string;
    [key: number]: string; // Add an index signature for numeric keys
    [key: symbol]: string; // Index signature for symbol keys
  }



