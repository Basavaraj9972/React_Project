import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// / Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWt9qdxxCC8POb7nYdSL5HDgTU5jGycQk",
  authDomain: "otpphone-133fd.firebaseapp.com",
  projectId: "otpphone-133fd",
  storageBucket: "otpphone-133fd.firebasestorage.app",
  messagingSenderId: "448779353265",
  appId: "1:448779353265:web:594e5f1cdf13ea079af690"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };
