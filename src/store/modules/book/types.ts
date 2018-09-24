import { IBook } from "@/entities/Book";

export enum Types {
  STORE_ITEMS = "book/store_items",
  RESET_ITEMS = "book/reset_items",
  STORE_ITEM = "book/store_item",
  RESET_ITEM = "book/reset_item",
  REMOVE_ITEM = "book/remove_item"
}

export class StoreItems implements FluxStandardAction {
  type = Types.STORE_ITEMS;
  constructor(public payload: IBook[]) {}
}

export class ResetItems implements FluxStandardAction {
  type = Types.RESET_ITEMS;
  payload = null;
}

export class StoreItem implements FluxStandardAction {
  type = Types.STORE_ITEM;
  constructor(public payload: IBook) {}
}

export class ResetItem implements FluxStandardAction {
  type = Types.RESET_ITEM;
  payload = null;
}

export class RemoveItem implements FluxStandardAction {
  type = Types.REMOVE_ITEM;
  constructor(public payload: string) {} // should be identifier
}
