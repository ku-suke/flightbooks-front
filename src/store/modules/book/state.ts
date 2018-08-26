import { IBook } from "@/entities/Book";

export interface IBookState {
  items: IBook[];
  item: IBook | null;
}

export const initialState = (): IBookState => ({
  items: [],
  item: null
});
