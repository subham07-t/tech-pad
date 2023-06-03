import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Note Post App</span>
        </h1>
      </header>
      <main className="public-main">
        <p>
          Owner: <a href="https://github.com/subham07-t">Subham07-t</a>{" "}
        </p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
};
export default Public;
