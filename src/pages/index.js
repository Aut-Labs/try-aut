import React from "react";
import TryAut from "containers/TryAut";
import { ContentWrapper } from "containers/app.style";
import Footer from "containers/Footer";

const Main = () => {
  return (
    <ContentWrapper>
      <TryAut />
      <Footer />
    </ContentWrapper>
  );
};
export default Main;
