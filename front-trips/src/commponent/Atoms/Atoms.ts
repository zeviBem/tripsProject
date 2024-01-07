// atoms.ts
import { atom } from 'jotai';
import { TripInterFace } from 'front-trips/src/interfaces/interface';

export const typedTextAtom = atom("");
export const tripByCategoryAtom = atom("");
export const tripDataAtom = atom<TripInterFace[]>([]);
export const loadingAtom = atom(false) 
