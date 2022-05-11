// import logo from './logo.png';
import { Logo } from './comp/Logo';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { GlobalNav } from './comp/GlobalNav';
import { GlobalFooter } from './comp/GlobalFooter';
import { AboutPg } from './comp/AboutPg';
import { BlogGrid } from './comp/BlogGrid';
import { MusicHub } from './comp/MusicHub';
import { Sub } from './comp/Sub';
import { Admin } from './comp/Admin';
import { ParticlesComp } from './comp/ParticlesComp';
import { NotFound } from './comp/NotFound';
import { SinglePostView } from './comp/SinglePostView';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
import React from 'react';

import { BlogContext } from "./contexts/BlogContext";
import { useBlog } from "./hooks/useBlog";

function App() {
  const blogContext = useBlog();
  return (
    // <HelmetProvider>
      <div className="App">
        {/* <Helmet>
          <title>Romka Soundz</title>
          <meta name="description" content="Romka Soundz" />
          <meta name="theme-color" content="#008f68" />
          <meta itemprop="name" content="Romka Soundz" />
          <meta itemprop="description" content="Romka Soundz" />
          <meta itemprop="image" content="" />
        </Helmet>*/}
        <header className="App-header"> 
          <ParticlesComp />
          <Logo />
          <GlobalNav />
          <BlogContext.Provider value={blogContext}>

            <Routes>
              {/* || "/home" */}
              <Route path={"/*"} element={<React.Fragment />} />
              <Route path="/about" element={<AboutPg />} />
              <Route path="/music" element={<MusicHub />} />
              <Route path="/blog/:postID" element={<SinglePostView />} />
              <Route path="/blog/undefined" element={<NotFound />} />
              <Route path="/blog" element={<BlogGrid />} />
              <Route path="/subscribe" element={<Sub />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </BlogContext.Provider>
          <GlobalFooter />
        </header>
      </div>
    // </HelmetProvider>
  );
}

export default App;
