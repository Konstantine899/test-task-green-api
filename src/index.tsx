import React from "react";
import ReactDOM from "react-dom/client";
import { Counter } from "./Counter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Counter />);
