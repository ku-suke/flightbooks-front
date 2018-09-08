import { IChapter } from "@/entities/Chapter";

export interface IChapterState {
  items: IChapter[];
  item: IChapter | null;
}

export const initialState = (): IChapterState => ({
  items: [],
  item: null
});
