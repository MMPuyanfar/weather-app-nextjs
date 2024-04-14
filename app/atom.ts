//global state management using jotai lib

import { atom } from "jotai";

export const placeAtom = atom("Tehran");

export const loadingCityAtom = atom(false);
