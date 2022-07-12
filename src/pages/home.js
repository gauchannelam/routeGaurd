import { useState } from "react";
import CustomModal from "../components/custom-modal";

const Home = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  console.log("home",isBlocked)
  return (
    <section>
      <article className="page-content">
        <h1>This is the home page </h1>
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

export default Home;
