import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { Casino } from "./pages/Casino";
import { About } from "./pages/About";
import { Blackjack } from "./pages/Blackjack";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
  return (
    <Router>
      <Routes>

        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/casino" element={<Casino/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/Blackjack" element={<Blackjack/>}/>
        </Route>

      </Routes>
    </Router>
  )
}