import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Body from "../../components/home-body/body";
import RecoverContact from "../../components/recover-contacts/recover-contacts";
import "./home.css";

const Home = () => {
  const [page, setPage] = useState(0);
  const [openRecoverModal, setOpenRecoverModal] = useState(false);
  return (
    <>
      <Navbar
        page={page}
        setPage={setPage}
        openRecoverModal={openRecoverModal}
        setOpenRecoverModal={setOpenRecoverModal}
      ></Navbar>
      <Body page={page} setPage={setPage}></Body>
      <RecoverContact
        page={page}
        setPage={setPage}
        openRecoverModal={openRecoverModal}
        setOpenRecoverModal={setOpenRecoverModal}
      ></RecoverContact>
    </>
  );
};

export default Home;
