import { IPageContent } from "@/entities/PageContent";

export enum Types {
  ADD_ITEM = "pageContent/add_item",
  RESET_ITEMS = "pageContent/reset_items",
  STORE_ITEM = "pageContent/store_item",
  RESET_ITEM = "pageContent/reset_item"
}

export class AddItem implements FluxStandardAction {
  type = Types.ADD_ITEM;
  constructor(public payload: IPageContent) {}
}

export class ResetItems implements FluxStandardAction {
  type = Types.RESET_ITEMS;
  payload = null;
}

export class StoreItem implements FluxStandardAction {
  type = Types.STORE_ITEM;
  constructor(public payload: IPageContent) {}
}

export class ResetItem implements FluxStandardAction {
  type = Types.RESET_ITEM;
  payload = null;
}
