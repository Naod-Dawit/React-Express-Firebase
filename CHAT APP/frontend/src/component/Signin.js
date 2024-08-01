import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseconfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";



import "../styles/login.css";
const Auth = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => console.log(doc.id, doc.data()));
    };
    fetchUserData();
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/userpage");
    });

    return () => unSubscribe();
  }, [navigate]);

  return (
    <>
      <div className="signin">
        <h1>Welcome to login menu</h1>
        <div className="input-format">
          <input
            name="email"
            placeholder="Email"
            value={data.email}
            type="text"
            required
            onChange={handleInputs}
          />
          <input
            name="password"
            placeholder="Password"
            value={data.password}
            type="password"
            required
            onChange={handleInputs}
          />
        </div>

          <button className="button-create" onClick={() => navigate("/")}>JOIN NOW</button>
          <button className='button-signin' onClick={handleSignIn}>SIGN IN</button>
      </div>
    </>
  );
};

export default Auth;
