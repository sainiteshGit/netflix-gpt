import { useState,useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
    const[isSignInForm, setIsSignInForm] = useState(true); 
    const[errorMessage,setErrorMessage]=useState(null);       
    const email = useRef(null);
    const password = useRef(null);
    const name=useRef(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleButtonClick = () =>{
      //Validate the form data
      console.log(email.current.value);
      console.log(password.current.value);
      const message=checkValidData(email.current.value,password.current.value);
      console.log(message);
      setErrorMessage(message);

      if(message){
        return;
      }

      // Sign In Sign Up Logic
      if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: "https://avatars.githubusercontent.com/u/38476470?v=4",
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
              navigate("/browse");
          }).catch((error) => {
              setErrorMessage(error.message);
          });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+'-'+errorMessage);
          // ..
        });
      }
      else{
          // Sign In Logic
          signInWithEmailAndPassword(auth, email.current.value,password.current.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate("/browse");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+'-'+errorMessage);
          });

      }


    }

    const toggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm);
    };

  return (
    <div>
      <Header />
      <div className=" absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/4f0437a7-333c-42f9-801e-dce7a032c30c/CA-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form onSubmit={(e)=>(e.preventDefault())} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm?"Sign In":"Sign up"}</h1>
        {!isSignInForm&&(<input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full  bg-gray-700"/>)}
        <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700"/>
        <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full  bg-gray-700"/>
        <p className="text-red-500 font-bold text-lg py-3">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm?"Sign In":"Sign up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm?"New To Netflix? Sign up Now":"Already registered? Sign In Now"}</p>
      </form>
    </div>
  );
};

export default Login;