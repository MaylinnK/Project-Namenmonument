import Hemel from "./components/Hemel";
import "./App.css";
import { BigDataProvider } from "./providers/BigDataContext";
import { SmallDataProvider } from "./providers/SmallDataContext";
import Overlay from "./components/Overlay";
import Filter from "./components/Filter";

function App() {
  // Adds a class to section
  function classToggle(element) {
    element = document.getElementById("filter");
    element.classList.add("open");
    document.getElementById("detail").classList.remove("open")
  }
  return (
    <SmallDataProvider>
      <BigDataProvider>
        <div className="App">
          <main>
            <span onClick={classToggle} className= "knop"><img src="/search.svg"></img> Gericht zoeken</span>
            <Filter/>
            <Hemel />
            <Overlay />
          </main>
        </div>
      </BigDataProvider>
    </SmallDataProvider>
  );
}

export default App;
