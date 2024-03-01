import { FirebaseError } from "firebase/app";

export interface Error extends FirebaseError {
  message: string;
  code: string;
}
