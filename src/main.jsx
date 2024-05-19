import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./components/route/Routes";
import "./index.css";
import AuthProvider from "./components/provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </DndProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
