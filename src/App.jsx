import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router"; // تأكد من الـ r سمول هنا وهنا
import "flowbite";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
