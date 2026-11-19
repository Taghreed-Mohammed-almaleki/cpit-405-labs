import {
  useEffect,
  useState
} from "react";

import {
  HashRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import "./App.css";


const API_BASE =
  "https://api.spoonacular.com";

const API_KEY_STORAGE =
  "spoonacularApiKey";


function getStoredApiKey() {
  return (
    sessionStorage.getItem(
      API_KEY_STORAGE
    ) || ""
  );
}


// ==========================================
// Recipe Search Page
// ==========================================

function RecipeSearch() {

  const [apiKey, setApiKey] =
    useState(getStoredApiKey);

  const [keyInput, setKeyInput] =
    useState("");

  const [query, setQuery] =
    useState("");

  const [recipes, setRecipes] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");


  function saveApiKey(event) {

    event.preventDefault();

    const key =
      keyInput.trim();


    if (!key) {

      setMessage(
        "Please enter your Spoonacular API Key."
      );

      return;
    }


    sessionStorage.setItem(
      API_KEY_STORAGE,
      key
    );

    setApiKey(key);

    setKeyInput("");

    setMessage(
      "API Key saved for this browser session."
    );
  }


  function clearApiKey() {

    sessionStorage.removeItem(
      API_KEY_STORAGE
    );

    setApiKey("");

    setRecipes([]);

    setMessage(
      "API Key removed."
    );
  }


  // ========================================
  // useEffect Fetch
  // Runs after API key is available
  // ========================================

  useEffect(() => {

    if (!apiKey) {

      setMessage(
        "Enter your Spoonacular API Key to load recipes."
      );

      return;
    }


    async function loadInitialRecipes() {

      setLoading(true);

      setMessage(
        "Loading recommended recipes..."
      );


      try {

        const response =
          await fetch(
            `${API_BASE}/recipes/complexSearch?query=pasta&number=6&apiKey=${encodeURIComponent(apiKey)}`
          );


        if (!response.ok) {

          const data =
            await response
              .json()
              .catch(() => null);


          throw new Error(
            data?.message ||
            `HTTP ${response.status}`
          );
        }


        const data =
          await response.json();


        setRecipes(
          data.results || []
        );


        setMessage(
          "Recommended recipes loaded."
        );

      } catch (error) {

        setRecipes([]);

        setMessage(
          "Could not load recipes: " +
          error.message
        );

      } finally {

        setLoading(false);
      }
    }


    loadInitialRecipes();

  }, [apiKey]);


  async function handleSearch(event) {

    event.preventDefault();


    if (!apiKey) {

      setMessage(
        "Please enter your Spoonacular API Key first."
      );

      return;
    }


    const searchTerm =
      query.trim();


    if (!searchTerm) {

      setMessage(
        "Please enter a recipe name."
      );

      return;
    }


    setLoading(true);

    setMessage(
      `Searching for "${searchTerm}"...`
    );


    try {

      const response =
        await fetch(
          `${API_BASE}/recipes/complexSearch?query=${encodeURIComponent(searchTerm)}&number=9&apiKey=${encodeURIComponent(apiKey)}`
        );


      if (!response.ok) {

        const data =
          await response
            .json()
            .catch(() => null);


        throw new Error(
          data?.message ||
          `HTTP ${response.status}`
        );
      }


      const data =
        await response.json();


      setRecipes(
        data.results || []
      );


      setMessage(
        data.results?.length
          ? `${data.results.length} recipes found.`
          : "No recipes found."
      );

    } catch (error) {

      setRecipes([]);

      setMessage(
        "Search failed: " +
        error.message
      );

    } finally {

      setLoading(false);
    }
  }


  return (

    <main>

      <section className="hero">

        <span className="eyebrow">
          CPIT-405 // LAB 09
        </span>

        <h1>
          Recipe Explorer
        </h1>

        <p>
          Search recipes using the Spoonacular
          API and explore ingredients,
          instructions and recipe details.
        </p>

      </section>


      {!apiKey && (

        <section className="search-panel">

          <form
            className="recipe-search"
            onSubmit={saveApiKey}
          >

            <label htmlFor="api-key">
              SPOONACULAR API KEY
            </label>


            <div className="search-row">

              <input
                id="api-key"
                type="password"
                placeholder="Paste your API Key here..."
                value={keyInput}
                onChange={(event) =>
                  setKeyInput(
                    event.target.value
                  )
                }
              />


              <button type="submit">
                SAVE KEY
              </button>

            </div>

          </form>


          <p className="status-message">
            Your key is stored only in
            sessionStorage for this browser session.
          </p>

        </section>

      )}


      {apiKey && (

        <>

          <section className="search-panel">

            <form
              onSubmit={handleSearch}
              className="recipe-search"
            >

              <label htmlFor="recipe-search">
                SEARCH RECIPES
              </label>


              <div className="search-row">

                <input
                  id="recipe-search"
                  type="text"
                  placeholder="Try pasta, pizza, chicken..."
                  value={query}
                  onChange={(event) =>
                    setQuery(
                      event.target.value
                    )
                  }
                />


                <button
                  type="submit"
                  disabled={loading}
                >
                  {
                    loading
                      ? "LOADING..."
                      : "SEARCH"
                  }
                </button>

              </div>

            </form>


            <p className="status-message">
              {message}
            </p>


            <button
              type="button"
              className="clear"
              onClick={clearApiKey}
            >
              CHANGE API KEY
            </button>

          </section>


          <section className="recipes-section">

            <div className="section-title">

              <span className="eyebrow">
                RECIPE DATABASE
              </span>

              <h2>
                Results
              </h2>

            </div>


            {
              recipes.length === 0 &&
              !loading
                ? (

                  <div className="empty-state">
                    No recipes to display.
                  </div>

                )
                : (

                  <div className="recipe-grid">

                    {
                      recipes.map(
                        (recipe) => (

                          <article
                            className="recipe-card"
                            key={recipe.id}
                          >

                            {
                              recipe.image
                                ? (

                                  <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                  />

                                )
                                : (

                                  <div className="image-placeholder">
                                    NO IMAGE
                                  </div>

                                )
                            }


                            <div className="recipe-card-content">

                              <span className="recipe-id">
                                ID // {recipe.id}
                              </span>


                              <h3>
                                {recipe.title}
                              </h3>


                              <Link
                                className="details-link"
                                to={`/recipe/${recipe.id}`}
                              >
                                VIEW DETAILS →
                              </Link>

                            </div>

                          </article>

                        )
                      )
                    }

                  </div>

                )
            }

          </section>

        </>

      )}

    </main>
  );
}


// ==========================================
// Recipe Details
// ==========================================

function RecipeDetails() {

  const { id } =
    useParams();


  const [recipe, setRecipe] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const apiKey =
      getStoredApiKey();


    async function loadRecipe() {

      if (!apiKey) {

        setError(
          "API Key is missing. Return to Home and enter it again."
        );

        setLoading(false);

        return;
      }


      try {

        const response =
          await fetch(
            `${API_BASE}/recipes/${id}/information?includeNutrition=false&apiKey=${encodeURIComponent(apiKey)}`
          );


        if (!response.ok) {

          const data =
            await response
              .json()
              .catch(() => null);


          throw new Error(
            data?.message ||
            `HTTP ${response.status}`
          );
        }


        const data =
          await response.json();


        setRecipe(data);

      } catch (error) {

        setError(
          "Could not load recipe details: " +
          error.message
        );

      } finally {

        setLoading(false);
      }
    }


    loadRecipe();

  }, [id]);


  if (loading) {

    return (

      <main className="details-page">

        <h1>
          Loading recipe...
        </h1>

      </main>
    );
  }


  if (error) {

    return (

      <main className="details-page">

        <span className="eyebrow">
          ERROR
        </span>

        <h1>
          Recipe unavailable
        </h1>

        <p>
          {error}
        </p>

        <Link
          className="back-link"
          to="/"
        >
          ← BACK TO RECIPES
        </Link>

      </main>
    );
  }


  return (

    <main className="details-page">

      <Link
        className="back-link"
        to="/"
      >
        ← BACK TO RECIPES
      </Link>


      <section className="details-hero">

        <div>

          <span className="eyebrow">
            RECIPE // {recipe.id}
          </span>


          <h1>
            {recipe.title}
          </h1>


          <div className="recipe-meta">

            <span>
              READY IN //
              {" "}
              {recipe.readyInMinutes || "N/A"}
              {" "}
              MIN
            </span>


            <span>
              SERVINGS //
              {" "}
              {recipe.servings || "N/A"}
            </span>

          </div>

        </div>


        {
          recipe.image && (

            <img
              src={recipe.image}
              alt={recipe.title}
            />

          )
        }

      </section>


      <section className="details-grid">

        <article className="details-card">

          <span className="eyebrow">
            01 // INGREDIENTS
          </span>

          <h2>
            Ingredients
          </h2>


          {
            recipe.extendedIngredients?.length
              ? (

                <ul>

                  {
                    recipe.extendedIngredients.map(
                      (ingredient) => (

                        <li
                          key={
                            ingredient.id +
                            ingredient.original
                          }
                        >
                          {ingredient.original}
                        </li>

                      )
                    )
                  }

                </ul>

              )
              : (

                <p>
                  Ingredients unavailable.
                </p>

              )
          }

        </article>


        <article className="details-card">

          <span className="eyebrow">
            02 // INSTRUCTIONS
          </span>

          <h2>
            Instructions
          </h2>


          {
            recipe.instructions
              ? (

                <div
                  className="instructions"
                  dangerouslySetInnerHTML={{
                    __html:
                      recipe.instructions
                  }}
                />

              )
              : (

                <p>
                  Instructions unavailable.
                </p>

              )
          }

        </article>

      </section>

    </main>
  );
}


// ==========================================
// About
// ==========================================

function About() {

  return (

    <main className="about-page">

      <span className="eyebrow">
        ABOUT // LAB 09
      </span>

      <h1>
        Recipe Explorer
      </h1>

      <p>
        React application using useState,
        useEffect, Fetch API,
        Spoonacular and React Router.
      </p>

    </main>
  );
}


// ==========================================
// Layout
// ==========================================

function Layout() {

  return (

    <div className="app-shell">

      <header className="app-header">

        <strong>
          LAB_09 // REACT
        </strong>


        <nav>

          <Link to="/">
            HOME
          </Link>

          <Link to="/about">
            ABOUT
          </Link>

        </nav>

      </header>


      <Routes>

        <Route
          path="/"
          element={<RecipeSearch />}
        />

        <Route
          path="/recipe/:id"
          element={<RecipeDetails />}
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Routes>


      <footer className="app-footer">

        <span>
          CPIT-405 // 2310505
        </span>


        <div className="footer-links">

          <a
            href={
              import.meta.env.DEV
                ? "http://localhost:8000/labs.html"
                : "../../labs.html"
            }
          >
            ← BACK TO LABS
          </a>


          <a
            href={
              import.meta.env.DEV
                ? "http://localhost:8000/index.html"
                : "../../index.html"
            }
          >
            PORTFOLIO HOME
          </a>

        </div>

      </footer>

    </div>
  );
}


function App() {

  return (

    <HashRouter>
      <Layout />
    </HashRouter>

  );
}


export default App;
