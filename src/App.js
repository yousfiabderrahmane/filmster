import { useAppContext } from "./context/useAppContext";
import Search from "./components/Search";
import MoviesList from "./components/MoviesList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SingleMovieDetails from "./pages/SingleMovie/SingleMovieDetails";
import TrendingMovies from "./pages/Trending/TrendingMovies";
import FavoriteMovies from "./pages/Favorite/FavoriteMovies";
import "./index.css";

function App() {
  return (
    <div className="app">
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
    </div>
  );
}

export default App;
