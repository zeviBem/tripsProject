export interface TripInterFace {
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
    price: string;
    activitytime: string;
    category: string;
    [key: string]: string | number; // Allow string keys with string or number values
}
