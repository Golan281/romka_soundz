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
          <Route path="/subscribe" element={<Sub/>} />
        </Routes>

      <GlobalFooter/>
      </header>
    </div>
  );
}

export default App;
