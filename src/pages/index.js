import React from "react";
import TryAut from "containers/TryAut";
import Footer from "containers/Footer";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

const Main = () => {
  return (
    <PerfectScrollbar
      options={{
        suppressScrollX: true,
        useBothWheelAxes: false,
      }}
      style={{
        height: "100vh",
      }}
    >
      <TryAut />
      <Footer />
    </PerfectScrollbar>
  );
};
export default Main;
