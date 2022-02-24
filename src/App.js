// import logo from './logo.png';
import { Logo } from './comp/Logo';
import './App.css';
// import Grid from './comp/UIkit/Grid';
import { Routes, Route } from 'react-router-dom';
// import { Link, NavLink } from 'react-router-dom';
import { GlobalNav } from './comp/GlobalNav';
import { GlobalFooter } from './comp/GlobalFooter';
// import { MainWrapper } from './comp/MainWrapper';
import { AboutPg } from './comp/AboutPg';
import { BlogGrid } from './comp/BlogGrid';
import { MusicHub } from './comp/MusicHub';

function App() {
  return (
    // <Grid>
    <div className="App">
      <header className="App-header">
        <Logo/>
        <GlobalNav/>
        <Routes>
          <Route path="/home" element={<div></div>} />
          <Route path="/about" element={<AboutPg/>} />
          <Route path="/music" element={<MusicHub/>} />
          <Route path="/blog" element={<BlogGrid/>} />
        </Routes>

      <GlobalFooter/>
      </header>
        {/* <MainWrapper/> */}
    </div>
          // </Grid>
  );
}

export default App;
