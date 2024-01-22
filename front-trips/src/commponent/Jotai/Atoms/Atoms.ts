// atoms.ts
import { atom } from 'jotai';
import { TripInterFace } from 'front-trips/src/interfaces/interface';

export const typedTextAtom = atom("");
export const tripByCategoryAtom = atom("");
export const tripByCityAtom = atom("");
export const tripDataAtom = atom<TripInterFace[]>([]);
export const loadingAtom = atom(false) 
export const tripByIdAtom = atom("")
export const tripBiIdDataAtom = atom<TripInterFace | null>(null);
export const editTripByIdAtom = atom<TripInterFace | null>(null);
export const token = atom<string | null>('')

