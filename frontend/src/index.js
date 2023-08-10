import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/style.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Test from "./components/Test";

import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home socket={socket} />} />
      <Route path="/chat/:room/:username/" element={<Chat socket={socket} />} />
      {/* <Route path="/test" element={<Test />} /> */}
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
