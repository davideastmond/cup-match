import Stage from "./components/stage/Stage";
import { CupElementsProvider } from "./context/cup-elements-context";

function App() {
  return (
    <div className="flex gap-4 p-4">
      <CupElementsProvider>
        <Stage />
      </CupElementsProvider>
    </div>
  );
}

export default App;
