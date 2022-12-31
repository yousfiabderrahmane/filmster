import React, { Suspense } from "react";
import { useAppContext } from "./context/useAppContext";
import Search from "./components/Search";
import MoviesList from "./components/MoviesList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoadingGif from "./assets/loading-gif.gif";
import { ErrorBoundary } from "./components/ErrorBoundary";

// import SingleMovieDetails from "./pages/SingleMovie/SingleMovieDetails";
// import TrendingMovies from "./pages/Trending/TrendingMovies";
// import FavoriteMovies from "./pages/Favorite/FavoriteMovies";

const LazySingleMovieDetails = React.lazy(() =>
  import("./pages/SingleMovie/SingleMovieDetails")
);
const LazyTrendingMovies = React.lazy(() =>
  import("./pages/Trending/TrendingMovies")
);
const LazyFavoriteMovies = React.lazy(() =>
  import("./pages/Favorite/FavoriteMovies")
);
function App() {
  const { mode } = useAppContext();
  return (
    <div className={`App ${mode === "light" && "light"}`}>
      <ErrorBoundary>
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
                <Suspense
                  fallback={
                    <div className="center-me">
                      <h1>Loading . . .</h1>
                    </div>
                  }
                >
                  <LazySingleMovieDetails />
                </Suspense>
              }
            />
            <Route
              path="/trending"
              element={
                <Suspense
                  fallback={
                    <div className="center-me">
                      <h1>Loading . . .</h1>
                    </div>
                  }
                >
                  <LazyTrendingMovies />
                </Suspense>
              }
            />
            <Route
              path="/favorite"
              element={
                <Suspense
                  fallback={
                    <div className="center-me">
                      <h1>Loading . . .</h1>
                    </div>
                  }
                >
                  <LazyFavoriteMovies />
                </Suspense>
              }
            />
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
      </ErrorBoundary>
    </div>
  );
}

export default App;
