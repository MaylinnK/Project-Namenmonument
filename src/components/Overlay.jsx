import { useContext, Fragment } from "react";
import BigDataContext from "../providers/BigDataContext";
import Layout from "./Layout";

const Overlay = () => {
  let data = useContext(BigDataContext);
  if (!data) {
    return <h1>Loading...</h1>;
  }
  
  return (
    <>
      <section id= "detail" >
        <Layout />
      </section>
    </>
  );
};

export default Overlay;
