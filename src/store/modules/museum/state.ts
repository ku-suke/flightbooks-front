import { IMuseum } from "@/entities/Museum";

export interface MuseumState {
  items: IMuseum[];
  item: IMuseum | null;
}

export const initialState = (): MuseumState => ({
  items: [],
  item: null
});
