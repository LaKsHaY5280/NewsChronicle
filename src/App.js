import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Newsbox from "./components/Newsbox";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const newskey = process.env.REACT_APP_NEWSKEY;

  const [progress, setProgress] = useState(0);


  return (
    <Router>
      <div>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar />
        <Routes>
          <Route
            exact
            path="/NewsChronicle"
            key="general"
            element={
              <Newsbox
                setprog={setProgress}
                newskey={newskey}
                category="general"
              />
            }
          />
          <Route
            exact
            path="/general"
            key="general"
            element={
              <Newsbox
                setprog={setProgress}
                newskey={newskey}
                category="general"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            key="entertainment"
            element={
              <Newsbox
                setprog={setProgress}
                newskey={newskey}
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/sports"
            key="sports"
            element={
              <Newsbox
                setprog={setProgress}
                newskey={newskey}
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            key="technology"
            element={
              <Newsbox
                setprog={setProgress}
                newskey={newskey}
                category="technology"
              />
            }
          />
          <Route
            exact
            path="/business"
            key="business"
            element={
              <Newsbox
                setprog={setProgress}
                newskey={newskey}
                category="business"
              />
            }
          />
          <Route
            exact
            path="/health"
            key="health"
            element={
              <Newsbox
                setprog={setProgress}
                newskey={newskey}
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            key="science"
            element={
              <Newsbox
                setprog={setProgress}
                newskey={newskey}
                category="science"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
