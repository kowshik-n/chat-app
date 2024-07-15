import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import NotFound from "./pages/NotFound";

const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const Login = lazy(() => import("./pages/Login"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/chat/:chatId",
    element: <Chat />,
  },
  {
    path: "/groups",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Groups />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export const App = () => {
  return (
    <>
      <div>Header</div>
      <RouterProvider router={router} />;
    </>
  );
};
