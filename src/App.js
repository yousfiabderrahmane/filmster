import { useAppContext } from "./context/useAppContext";
import Search from "./components/Search";
import MoviesList from "./components/MoviesList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SingleMovieDetails from "./pages/SingleMovieDetails";
import TrendingMovies from "./components/TrendingMovies";
import FavoriteMovies from "./components/FavoriteMovies";
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
