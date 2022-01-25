import { useContext, Fragment } from "react";
import BigDataContext from "../providers/BigDataContext";

const Layout = () => {
  let data = useContext(BigDataContext);
  if (!data) {
    return <h1>Loading...</h1>;
  }
  // Adds a class to section
  function classToggle(element) {
    element = document.getElementById("detail");
    element.classList.remove("open");
  }

  return (
    <>
      <article className= "header">
        <div>
          <span id="wrapper">
            <h1 className= "naam"></h1>
            <span onClick={classToggle} className="streep"></span>
            <span onClick={classToggle} className="streeptwee"></span>
          </span>
          <span>
            <p>Bekijk overeenkomsten met andere tot-slaaf-gemaakten. Klik op een <img src="/oog-wit.svg" alt="" /></p>
          </span>
        </div>
      </article>
      <article className= "info">

      </article>
    </>
  );
};

export default Layout;
