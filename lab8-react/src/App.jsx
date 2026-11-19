import { useEffect, useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import "./App.css";

const STORAGE_KEY = "lab8Links";

function loadLinks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function Home() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [links, setLinks] = useState(loadLinks);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!url.trim()) {
      setMessage("Please enter a URL.");
      return;
    }

    let finalUrl = url.trim();

    if (
      !finalUrl.startsWith("http://") &&
      !finalUrl.startsWith("https://")
    ) {
      finalUrl = "https://" + finalUrl;
    }

    try {
      new URL(finalUrl);
    } catch {
      setMessage("Please enter a valid URL.");
      return;
    }

    let shortCode = alias.trim();

    if (!shortCode) {
      shortCode = Math.random()
        .toString(36)
        .substring(2, 8);
    }

    if (!/^[A-Za-z0-9_-]{3,20}$/.test(shortCode)) {
      setMessage(
        "Alias must be 3-20 letters, numbers, _ or -."
      );
      return;
    }

    const exists = links.some(
      (item) =>
        item.alias.toLowerCase() ===
        shortCode.toLowerCase()
    );

    if (exists) {
      setMessage("This alias is already used.");
      return;
    }

    const newLink = {
      id: Date.now(),
      alias: shortCode,
      originalUrl: finalUrl
    };

    const updated = [newLink, ...links];

    setLinks(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    setUrl("");
    setAlias("");

    setMessage("Short URL created successfully.");
  }

  function clearLinks() {
    setLinks([]);
    localStorage.removeItem(STORAGE_KEY);
    setMessage("All URLs cleared.");
  }

  return (
    <main>
      <section className="hero">
        <span>CPIT-405 // LAB 08</span>

        <h1>React URL Shortener</h1>

        <p>
          Create short URLs using React useState,
          event handling and React Router.
        </p>
      </section>

      <section className="panel">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="url">LONG URL</label>

            <input
              id="url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(event) =>
                setUrl(event.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="alias">
              CUSTOM SHORT URL
            </label>

            <input
              id="alias"
              type="text"
              placeholder="taghreed405"
              value={alias}
              onChange={(event) =>
                setAlias(event.target.value)
              }
            />
          </div>

          <button type="submit">
            SHORTEN URL
          </button>
        </form>

        <p className="message">{message}</p>
      </section>

      <section className="results">
        <div className="results-title">
          <h2>Shortened URLs</h2>

          {links.length > 0 && (
            <button
              className="clear"
              type="button"
              onClick={clearLinks}
            >
              CLEAR ALL
            </button>
          )}
        </div>

        {links.length === 0 ? (
          <div className="empty">
            No shortened URLs yet.
          </div>
        ) : (
          links.map((item) => (
            <article
              className="link-card"
              key={item.id}
            >
              <div>
                <strong>SHORT URL</strong>

                <Link
                  className="short-link"
                  to={`/go/${item.alias}`}
                >
                  {window.location.origin}
                  {window.location.pathname}
                  #/go/{item.alias}
                </Link>

                <strong>ORIGINAL URL</strong>

                <p>{item.originalUrl}</p>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

function About() {
  return (
    <main className="about">
      <span>CPIT-405 // LAB 08</span>

      <h1>About</h1>

      <p>
        This React application demonstrates
        useState, event handling, custom URL
        creation and client-side routing.
      </p>

      <div className="features">
        <article>
          <h2>useState</h2>
          <p>Manages inputs, messages and URLs.</p>
        </article>

        <article>
          <h2>Events</h2>
          <p>
            Handles input changes and form submission.
          </p>
        </article>

        <article>
          <h2>React Router</h2>
          <p>
            Provides Home, About and redirect routes.
          </p>
        </article>
      </div>
    </main>
  );
}

function RedirectPage() {
  const { alias } = useParams();

  const [error, setError] = useState(false);

  useEffect(() => {
    const links = loadLinks();

    const match = links.find(
      (item) => item.alias === alias
    );

    if (!match) {
      setError(true);
      return;
    }

    window.location.replace(
      match.originalUrl
    );
  }, [alias]);

  if (error) {
    return (
      <main className="about">
        <h1>Link Not Found</h1>

        <Link to="/">
          ← Return Home
        </Link>
      </main>
    );
  }

  return (
    <main className="about">
      <h1>Redirecting...</h1>
    </main>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="app">
        <header>
          <strong>LAB_08 // REACT</strong>

          <nav>
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/go/:alias"
            element={<RedirectPage />}
          />
        </Routes>

        <footer>
          <span>
            CPIT-405 // Student ID 2310505
          </span>

          <div className="footer-links">
            <a
              href="../../labs.html"
            >
              ← BACK TO LABS
            </a>

            <a
              href="../../index.html"
            >
              PORTFOLIO HOME
            </a>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;



