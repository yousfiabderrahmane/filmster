import { UseMovieContext } from "./context/Context";
import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Search from "./components/Search";

const LazySingleMovieDetails = React.lazy(
  () => import("./pages/SingleMovie/SingleMovieDetails")
);
const LazyTrendingMovies = React.lazy(
  () => import("./pages/Trending/TrendingMovies")
);
const LazyFavoriteMovies = React.lazy(
  () => import("./pages/Favorite/FavoriteMovies")
);
const LazyMovieList = React.lazy(() => import("./components/MoviesList"));

function App() {
  const { mode } = UseMovieContext();
  return (
    <div className={`App ${mode === "light" && "light"}`}>
      <ErrorBoundary>
        <BrowserRouter>
          <Header />
          <Suspense
            fallback={
              <div className={`center-me`}>
                <h1 className={`${mode === "light" && "dark-color"}`}>
                  Loading . . .
                </h1>
              </div>
            }
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {" "}
                    <Search /> <LazyMovieList />
                  </>
                }
              />
              <Route path="/movie/:id" element={<LazySingleMovieDetails />} />
              <Route path="/trending" element={<LazyTrendingMovies />} />
              <Route path="/favorite" element={<LazyFavoriteMovies />} />
              <Route path="*" element={<LazyMovieList />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
