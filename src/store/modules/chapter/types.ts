import { IChapter } from "@/entities/Chapter";

export enum Types {
  STORE_ITEMS = "chapter/store_items",
  RESET_ITEMS = "chapter/reset_items",
  STORE_ITEM = "chapter/store_item",
  RESET_ITEM = "chapter/reset_item",
  REMOVE_ITEM = "chapter/remove_item"
}

export class StoreItems implements FluxStandardAction {
  type = Types.STORE_ITEMS;
  constructor(public payload: IChapter[]) {}
}

export class ResetItems implements FluxStandardAction {
  type = Types.RESET_ITEMS;
  payload = null;
}

export class StoreItem implements FluxStandardAction {
  type = Types.STORE_ITEM;
  constructor(public payload: IChapter) {}
}

export class ResetItem implements FluxStandardAction {
  type = Types.RESET_ITEM;
  payload = null;
}

export class RemoveItem implements FluxStandardAction {
  type = Types.REMOVE_ITEM;
  constructor(public payload: string) {} // should be identifier
}
