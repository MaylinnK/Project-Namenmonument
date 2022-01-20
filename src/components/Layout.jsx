import { useContext, Fragment } from "react";
import BigDataContext from "../providers/BigDataContext";

const Layout = () => {
  let data = useContext(BigDataContext);
  if (!data) {
    return <h1>Loading...</h1>;
  }
  // Adds a class to section
  function classToggle(element) {
    element = document.querySelector("section");
    element.classList.toggle("open");
  }
  
  return (
    <>
        <div>
          <span onClick={classToggle} id="wrapper">
            <span className="pijl"></span>
          </span>
        </div>
        <article></article>
    </>
  );
};

export default Layout;
