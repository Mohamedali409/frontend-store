import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router"; // تأكد من الـ r سمول هنا وهنا
import "flowbite";


function App() {
  return <RouterProvider router={router} />;
}

export default App;
