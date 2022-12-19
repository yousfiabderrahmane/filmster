import { useAppContext } from "./context/useAppContext";
import Search from "./components/Search";

function App() {
  const { name } = useAppContext();
  return <Search />;
}

export default App;
