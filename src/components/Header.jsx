import React from "react";

function Header(props) {
  return (
    <header className="header">
      <a className="header__a" href="/index.html">
        Back to homepage
      </a>
      <h1 className="header__h1">Quakr</h1>
      <h2 className="header__h2">live earthquake data visualisation</h2>
    </header>
  );
}

export default Header;
