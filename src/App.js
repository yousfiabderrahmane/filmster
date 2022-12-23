import { useAppContext } from "./context/useAppContext";
import Search from "./components/Search";
import MoviesList from "./components/MoviesList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SingleMovieDetails from "./pages/SingleMovie/SingleMovieDetails";
import TrendingMovies from "./pages/Trending/TrendingMovies";
import FavoriteMovies from "./pages/Favorite/FavoriteMovies";
import Similar from "./components/Similar";

import "./App.css";
import Header from "./components/Header";

function App() {
  const { mode } = useAppContext();
  return (
    <div className={`App ${mode === "light" && "light"}`}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Search />
                <MoviesList />
              </>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <>
                <SingleMovieDetails />
              </>
            }
          />
          <Route path="/trending" element={<TrendingMovies />} />
          <Route path="/favorite" element={<FavoriteMovies />} />
          <Route
            path="*"
            element={
              <>
                <Search />
                <MoviesList />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
