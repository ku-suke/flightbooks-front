import { IMuseum } from "@/entities/Museum";
import MuseumRepository from "@/repositories/MuseumRepository";
import { timestampToFormattedDate } from "@/utils/translator";

export interface IPresenter {
  museumRepository: MuseumRepository;
}

interface IDisplayMuseum {
  identifier: string;
  name: string;
  address: string;
  updatedAt: string;
  entry: string;
  img: string;
  lat: number;
  lng: number;
  siteUrl: string;
}

export interface IPresenterState {
  item: IDisplayMuseum | null;
}

const formatItem = (item: IMuseum): IDisplayMuseum => {
  const {
    identifier,
    name,
    address,
    updatedAt,
    entry,
    img,
    lat,
    lng,
    siteUrl
  } = item;

  const formattedDate = timestampToFormattedDate(updatedAt, "MM/DD HH:mm");

  return {
    identifier,
    name,
    address,
    updatedAt: formattedDate,
    entry,
    img,
    lat,
    lng,
    siteUrl
  };
};

export default ({ museumRepository }: IPresenter): IPresenterState => {
  const item = museumRepository.getItem();
  return {
    item: item ? formatItem(item) : null
  };
};
