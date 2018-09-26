import PageEntity, { IPage } from "@/entities/Page";

export interface IChapter {
  identifier?: Identifier;
  name: any;
  isRenaming?: boolean;
  owner: string;
  chapters?: IChapter[];
  pages?: IPage[];
}

export default class ChapterEntity {
  private _props: IChapter;

  constructor(params: IChapter) {
    this._props = {
      chapters: [],
      pages: [],
      ...params
    };
  }

  get props(): IChapter {
    return this._props;
  }

  get chapters(): ChapterEntity[] {
    return this._props.chapters.map(chapter => new ChapterEntity(chapter));
  }

  get pages(): PageEntity[] {
    return this._props.pages.map(page => new PageEntity(page));
  }
}
