import React from "react";
import { authentication } from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { log } from "console";

export default function App() {
  const firebaseAuth = authentication;
  const getVerify: any = authentication.currentUser;

  const [sEmail, setSEmail] = React.useState("");
  const [sPassword, setSPassword] = React.useState("");
  const [isLogged, setLogged] = React.useState(false);
  const [isLoggedData, setLoggedData] = React.useState<string | null>("");

  class CreateUser {
    public email: string;
    public password: string;
    public create: () => Promise<any>;
    public authenticate: () => Promise<any>;

    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
      this.create = async function creation() {
        try {
          const data = await signInWithEmailAndPassword(
            firebaseAuth,
            this.email,
            this.password
          );
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      this.authenticate = async function authentication() {
        try {
          const data = await createUserWithEmailAndPassword(
            firebaseAuth,
            this.email,
            this.password
          );
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
    }
  }

  const auth = new CreateUser(sEmail, sPassword);

  function creteMe(e: { preventDefault: () => void }) {
    e.preventDefault();
    auth.create();
  }
  function authMe(e: { preventDefault: () => void }) {
    e.preventDefault();
    auth.authenticate();
  }

  function logoutMe() {
    signOut(firebaseAuth)
      .then(() => {
        setLogged(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setLogged(true);
        setLoggedData(user.email);
        console.log(user.emailVerified);
      } else {
        setLogged(false);
      }
    });
  }, []);

  const get_verifed = () => {
    sendEmailVerification(getVerify)
      .then(() => {
        console.log("Send");
      })
      .catch((errr) => {
        console.error(errr);
      });
  };

  return (
    <div>
      <form onSubmit={creteMe}>
        <label htmlFor="email">Login</label>
        <label htmlFor="email">Email Address</label>
        <input
          placeholder="Email Address"
          name="email_address"
          value={sEmail}
          onChange={(e) => setSEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          name="pass_word"
          value={sPassword}
          onChange={(e) => setSPassword(e.target.value)}
        />
        <input type="submit" title="Create" />
      </form>
      <button onClick={logoutMe}>logut</button>
      <button onClick={get_verifed}>Get verified</button>

      <hr />
      <form onSubmit={authMe}>
        <label htmlFor="email">Create</label>
        <label htmlFor="email">Email Address</label>
        <input
          placeholder="Email Address"
          name="email_address"
          value={sEmail}
          onChange={(e) => setSEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          name="pass_word"
          value={sPassword}
          onChange={(e) => setSPassword(e.target.value)}
        />
        <input type="submit" title="Login" />
      </form>

      <hr />

      <div>{isLogged && <h1>Logged {isLoggedData}</h1>}</div>
    </div>
  );
}
