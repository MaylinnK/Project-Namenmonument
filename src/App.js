import Hemel from "./components/Hemel";
import "./App.css";
import { BigDataProvider } from "./providers/BigDataContext";
import Person from "./components/Person";

function App() {
  return (
    <BigDataProvider>
      <div className="App">
        <main>
          <Hemel/>
        </main>
      </div>
    </BigDataProvider>
  );
}

export default App;
