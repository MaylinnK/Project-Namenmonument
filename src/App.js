import Hemel from "./components/Hemel";
import "./App.css";
import { BigDataProvider } from "./providers/BigDataContext";
import { SmallDataProvider } from "./providers/SmallDataContext";
import Overlay from "./components/Overlay";

function App() {
  return (
    <SmallDataProvider>
      <BigDataProvider>
        <div className="App">
          <main>
            <Hemel />
            <Overlay />
          </main>
        </div>
      </BigDataProvider>
    </SmallDataProvider>
  );
}

export default App;
