import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./pages/home";
import About from "./pages/about";

export default function App() {
  return (
    <main className="App">
      <Router basename="/">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </main>
  );
}