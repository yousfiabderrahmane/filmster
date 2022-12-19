import { useAppContext } from "./context/useAppContext";

function App() {
  const { name } = useAppContext();
  return <div className="App">yo {name}</div>;
}

export default App;
