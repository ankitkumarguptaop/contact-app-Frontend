import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Body from "../../components/home-body/body";
import "./home.css";

const Home = () => {
  const [page, setPage] = useState(0);
  return (
    <>
      <Navbar page={page} setPage={setPage}>
        {" "}
      </Navbar>
      <Body page={page} setPage={setPage}></Body>
    </>
  );
};

export default Home;
