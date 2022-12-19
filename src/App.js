import { useAppContext } from "./context/useAppContext";
import Search from "./components/Search";
import MoviesList from "./components/MoviesList";

function App() {
  return (
    <>
      <Search />
      <MoviesList />
    </>
  );
}

export default App;
