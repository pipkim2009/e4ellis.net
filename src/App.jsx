import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
  return (
    <Router>
      <Routes>

        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/projects" element={<Projects/>}/>
        </Route>

      </Routes>
    </Router>
  )
}