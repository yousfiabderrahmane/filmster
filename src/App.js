import { useAppContext } from "./context/useAppContext";
import Search from "./components/Search";
import MoviesList from "./components/MoviesList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SingleMovieDetails from "./pages/SingleMovieDetails";
import TrendingMovies from "./components/TrendingMovies";
import FavoriteMovies from "./components/FavoriteMovies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Search /> <MoviesList />
            </>
          }
        />
        <Route path="/movie/:id" element={<SingleMovieDetails />} />
        <Route path="/trending" element={<TrendingMovies />} />
        <Route path="/favorite" element={<FavoriteMovies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
