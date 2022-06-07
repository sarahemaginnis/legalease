import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Brief = () => {
  const [brief, set] = useState({}); // State variable for current brief object
  const { briefId } = useParams(); // Variable storing the route parameter

  useEffect(() => {
    //This function runs when the value of briefId changes
    fetch(`http://localhost:8088/briefs/${briefId}?_expand=class`) //will need to figure out subjects later. Maybe do find method again? (See Dashboard.js)
      .then((res) => res.json())
      .then(set);
  }, [briefId]);

  return (
    <>
      <h1>The Brief Page</h1>
      <section className="brief">
        <h2 className="brief__name">{brief.name}</h2>
      </section>
    </>
  );
};

export default Brief;
