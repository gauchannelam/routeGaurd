import React, { useState } from "react";
import CustomModal from "../components/custom-modal";

const About = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  console.log("aboutr",isBlocked)

  return (
    <section>
      <article className="page-content">
        <h1>This is the about page </h1>
        <button onClick={() => setIsBlocked((blocked) => !blocked)}>
          {!isBlocked ? "Block Navigation" : "Unblock Navigation"}
        </button>
      </article>
      <CustomModal
        isBlocked={isBlocked}
        title="Leave Page?"
        content="You have unsaved changes. Are you sure you want to leave this page?"
      />
    </section>
  );
};

export default About;
