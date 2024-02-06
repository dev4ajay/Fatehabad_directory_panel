import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme as customTheme } from "./theme";
import ColorModeContext from "./components/ColorModeContext";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import CreateCategory from "./pages/Category/SubCategoryList";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import CategoryList from "./pages/Category/CategoryList";
import Business from "./pages/Category/Business"
import { ToastContainer } from "react-toastify";
import Listing from "./pages/Category/Listing";
import Login from "./pages/Login";

const App = () => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      // The theme mode switch will invoke this method
      toggleColorMode: () => {
        window.localStorage.setItem(
          "themeMode",
          mode === "light" ? "dark" : "light"
        );
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  useEffect(() => {
    try {
      const localTheme = window.localStorage.getItem("themeMode");
      localTheme ? setMode(localTheme) : setMode("light");
    } catch {
      setMode("light");
    }
  }, []);

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Digital Fatehabad"
        defaultTitle="Digital Fatehabad"
      />
      <ToastContainer />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={customTheme[mode]}>
          <CssBaseline />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route exact path="/" element={<Login />} />{" "}
                
                <Route exact path="/Dashboard" element={<Dashboard />} />{" "}
                <Route exact path="/CategoryList" element={<CategoryList />} />
                <Route exact path="/business" element={<Business />} />
                <Route exact path="/ListingList/:id" element={<Listing />} />
                <Route
                  exact
                  path="/sub-Category-list/:id"
                  element={<CreateCategory />}
                />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </HelmetProvider>
  );
};

export default App;
