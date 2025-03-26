import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth/cordova";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB9teuc8qJsAG88bF38VSXHxPwJCiUod_k",
  authDomain: "netflix-clone-dea50.firebaseapp.com",
  projectId: "netflix-clone-dea50",
  storageBucket: "netflix-clone-dea50.appspot.com",
  messagingSenderId: "457429632766",
  appId: "1:457429632766:web:6c916f1ad252df75dc87af"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
  try{
      const res = await createUserWithEmailAndPassword(auth,email,password);
      const user = res.user;
      await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,

      });
  }catch(error){
     console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};