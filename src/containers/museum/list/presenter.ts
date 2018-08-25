import moment from "moment";
import { IMuseum } from "@/entities/Museum";
import MuseumRepository from "@/repositories/MuseumRepository";
import { timestampToFormattedDate } from "@/utils/translator";

export interface IPresenter {
  museumRepository: MuseumRepository;
}

export interface IDisplayMuseum {
  identifier: string;
  name: string;
  address: string;
  updatedAt: string;
}

export interface IPresenterState {
  items: IDisplayMuseum[];
}

const formatItem = (item: IMuseum): IDisplayMuseum => {
  const { identifier, name, address, updatedAt } = item;

  const formattedDate = timestampToFormattedDate(updatedAt, "MM/DD HH:mm");

  return {
    identifier,
    name,
    address,
    updatedAt: formattedDate
  };
};

export default ({ museumRepository }: IPresenter): IPresenterState => {
  return {
    items: museumRepository.getItems().map(formatItem)
  };
};
