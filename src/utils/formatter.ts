import format from "date-fns/format";
import firebase from "firebase";

export const formatDate = (timestamp: firebase.firestore.Timestamp): string => {
  const dateTime = timestamp.toDate();
  return format(dateTime, "YYYY/MM/DD");
};
