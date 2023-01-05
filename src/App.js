import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { setUser } from "./features/auth/authSlice";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";

function App() {
  const disptch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        disptch(setUser(user.email));
      }
    });
  }, [disptch]);
  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
