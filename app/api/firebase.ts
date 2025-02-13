import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAit_BWmuTFJ3dns_yKh727nVSmcq3l0-U",
  authDomain: "ebuddy-recruitment.firebaseapp.com",
  projectId: "ebuddy-recruitment",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
