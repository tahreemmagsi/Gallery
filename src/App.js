import * as React from "react";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";
import MyCollection from "./collection/collection";
import Main from "./main/main";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/mycollection",
    element: <MyCollection />,
  },
]);
function App() {
  return (
    <>

        <RouterProvider router={router} />

    </>
  );
}

export default App;
