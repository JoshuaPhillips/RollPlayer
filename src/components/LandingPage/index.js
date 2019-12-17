import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main>
      <h1>Welcome to APP_TITLE</h1>
      <p>
        Here you can create a new character for Dungeons and Dragons, 5th Edition. You'll be able to generate everything
        you need to fill out your character sheet and get playing!
      </p>

      <p>
        At the moment, you can only choose from content in the original <em>Player's Handbook</em>, but we'll be adding
        new content from official expansions like the <em>Sword Coast Adventurer's Guide</em> and{" "}
        <em>Xanathar's Guide to Everything</em> very soon.
      </p>

      <Link to='/build'>
        <button>Get Started</button>
      </Link>
    </main>
  );
};

export default LandingPage;
