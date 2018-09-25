import { IPageContent } from "@/entities/PageContent";

export interface IPageContentState {
  items: {
    [identifier: string]: IPageContent
  }
  item: IPageContent | null
}

export const initialState = (): IPageContentState => ({
  items: {},
  item: null
});
