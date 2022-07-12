import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Nav;
