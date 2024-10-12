import Navbar from "./components/navbar.jsx";
import Main from "./pages/main.jsx";
import Home from "./pages/home.jsx";
import Services from "./pages/services.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Interior from "./pages/interior.jsx";
import ArchitectPlan from "./pages/architectPlan.jsx";
import HouseDetails from "./pages/houseDetails.jsx";
import Footer from "./components/footer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/interior/:index" element={<Interior />} />
          <Route
            exact
            path="/architecturePlan/:index"
            element={<ArchitectPlan />}
          />
          <Route exact path="/houseDetails/:index" element={<HouseDetails />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
