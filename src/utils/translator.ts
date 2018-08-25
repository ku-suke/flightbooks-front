import { firestore } from "firebase";
import moment from "moment";

export const pascalToCamelTranslator = (str: string) => {
  return str.replace(/^[A-Z]/, match => match.toLowerCase());
};

export const camelToPascalTranslator = (str: string) => {
  return str.replace(/^[a-z]/, match => match.toUpperCase());
};

export const timestampToFormattedDate = (
  timestamp: firestore.Timestamp,
  format: string
): string => {
  return timestamp && timestamp.nanoseconds
    ? moment(timestamp.toDate()).format(format)
    : "";
};
