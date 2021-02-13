// App.js

import "./App.css";
import { GlobalStyles } from "./global";

import React, { useState, useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";

import { ContentLoader, PageLoader } from "./components/loader";
import Navbar from "./components/navbar";
import { lightTheme, darkTheme } from "./theme";
import { fetchAllMemes, fetchAMeme } from "./utils/api";

const InfiniteScroll = lazy(() => import("react-infinite-scroll-component"));
const Drawer = lazy(() => import("react-drag-drawer"));
const MemeGallery = lazy(() => import('./components/memeGallery'));
const MemeForm = lazy(() => import('./components/memeForm'));

require("dotenv").config();

function App() {
  //Toggles form display
  const [formVisible, setFormVisibility] = useState(false);
  
  //Switches theme
  const [theme, setTheme] = useState("dark");

  //Array of objects of memes
  const [globalMemes, setGlobalMemesData] = useState([]);

  //Data used for sending data to form in order to update a meme
  const [propMeme, setMemeProp] = useState(null);

  //Sets the skip value to get the data from the backend after a certain limit
  const [skipValue, setSkip] = useState(0);

  //Checks if more memes are available
  const [moreDataAvailable, setDataAvailability] = useState(true);

  //Limits the number of memes we get from the backend
  const limit = 100;

  // The function that toggles between themes
  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === "light") {
      setTheme("dark");
      // otherwise, it should be light
    } else {
      setTheme("light");
    }
  };

  /** 
   * This function fetches the meme from the backend, then
   * If no more memes are available then sets the value of moreDataAvailable to false,
   * updates the value of globalMemes 
   * And updates the value of skip
   * */
  const fetchData = async () => {
    const result = await fetchAllMemes(skipValue, limit);

    if (result.length === 0) {
      setDataAvailability(false);
    }

    setGlobalMemesData([...globalMemes, ...result]);
    setSkip(skipValue + limit);
  };


  // The first function which gets called when the componentIsMounted
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * This function changes the value of toggle form to true
   * And also update propMeme value to contain the updated meme info
   * */
  const setMemeData = (props) => {
    toggleForm();
    setMemeProp(props);
  };

  /**
   * This function handles the submission of memes
   * Displays a toast message on successful submission
   * Add the meme in the beginning of the globalMemes array to show it on top
   * And in the end sets the value of toggle form to false to hide it
   * */

  const addTheMeme = async ({ id }) => {
    const result = await fetchAMeme(id);
    toast.success("Meme added !!");
    let tempMemes = globalMemes;
    tempMemes.unshift(result);
    setGlobalMemesData(tempMemes);
    toggleForm();
  };

  /**
   * This function handles the updation of memes
   * Displays a toast message on successful submission
   * Add the meme in the beginning of the globalMemes array to show it on top
   * And in the end sets the value of toggle form to false to hide it
   * */

  const updateTheMeme = async ({ id, index }) => {
    const result = await fetchAMeme(id);
    toast.success("Meme updated 😁");
    let tempMemes = globalMemes;
    tempMemes.splice(index, 1);
    tempMemes.unshift(result);
    setGlobalMemesData(tempMemes);
    toggleForm();
  };

  /**
   * This function toggles the visible of form
   * And also sets the memeProp to false when we hide the form
   * */

  const toggleForm = () => {
    setFormVisibility(!formVisible);

    if (formVisible === false) {
      setMemeProp(null);
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <ToastContainer
          closeOnClick
          pauseOnFocusLoss
          limit={2}
        />
        <GlobalStyles />
        <Navbar
          toggleForm={toggleForm}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        {/* Lazy loading of components and using the loader as a fallback */}
        <Suspense fallback={<PageLoader />}>
          {globalMemes.length ? (
            <InfiniteScroll
              dataLength={globalMemes.length}
              next={fetchData}
              hasMore={moreDataAvailable}
              loader={<ContentLoader />}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <MemeGallery
                theme={theme}
                setMemeData={setMemeData}
                memes={globalMemes}
                formVisible={formVisible}
                toggleForm={toggleForm}
              />
            </InfiniteScroll>
          ) : (
              <PageLoader />
            )}

          <Suspense fallback={<PageLoader />}>
            <Drawer open={formVisible}>
              <MemeForm
                toast={toast}
                props={propMeme}
                addTheMeme={addTheMeme}
                updateTheMeme={updateTheMeme}
                toggleForm={toggleForm}
              />
            </Drawer>
          </Suspense>
        </Suspense>
      </>
    </ThemeProvider>
  );
}

export default App;
