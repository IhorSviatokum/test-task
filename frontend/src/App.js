import React from "react";
import "./styles.css";

import Layout from "./components/Layout/Layout";
import Calendar from "./containers/Calendar/Calendar";
export default function App() {
  return (
    <div className="App">
      <Layout>
        <Calendar />
      </Layout>
    </div>
  );
}
