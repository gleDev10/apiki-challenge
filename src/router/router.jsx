import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import SinglePost from "../pages/SinglePost";
import Archieves from "../pages/Archieves";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/:slug",
    element: <SinglePost />,
    errorElement: <NotFound />,
  },
  {
    path: "/:term/:term_slug",
    element: <Archieves />,
    errorElement: <NotFound />,
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
