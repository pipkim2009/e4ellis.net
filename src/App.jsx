import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Blackjack } from "./pages/Blackjack";
import { MusicTools } from "./pages/MusicTools";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
  return (
    <Router>
      <Routes>

        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/blackjack" element={<Blackjack/>}/>
          <Route path="/music-tools" element={<MusicTools/>}/>
        </Route>

      </Routes>
    </Router>
  )
}