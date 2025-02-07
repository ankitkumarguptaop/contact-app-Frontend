import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recoverContacts } from "../../features/contact/contact.action";

const RecoverContact = ({
  openRecoverModal,
  setOpenRecoverModal,
  setPage,
  page,
}) => {
  const dispatch = useDispatch();
  const deletedContacts = useSelector((state) => state.contact.deletedContacts);
  const [selectedRows, setSelectedRows] = useState([]);

  console.log("delete", deletedContacts);
  console.log("select", selectedRows);

  const style = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "26vw",
    minWidth: "500px",
    minHeight: 410,
    maxHeight: "auto",
    bgcolor: "rgb(255, 255, 255)",
    color: "black",
    p: 6,
    zIndex: 2,
  };
  const columns = [
    {
      field: "first_name",
      headerName: "First name",
      width: 130,
      editable: true,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 130,
      editable: true,
    },
    {
      field: "phone_no",
      headerName: "Phone No",
      type: "number",
      width: 150,
      editable: true,
    },
  ];

  function handleRecoverContacts() {
    const recoverIds = selectedRows.map((ids) => ({ _id: ids }));
    dispatch(recoverContacts({ recoverIds: recoverIds }));
    setPage(0);
    setOpenRecoverModal(false);
  }

  return (
    <Modal
      sx={style}
      open={openRecoverModal}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="recover-data-grid">
        <Box sx={{ height: 400 }}>
          <DataGrid
            rows={deletedContacts}
            getRowId={(deletedContact) => {
              return deletedContact._id;
            }}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            onStateChange={(event) => {
              setSelectedRows(event.rowSelection);
            }}
          />
        </Box>
        <Box className="recover-close-button">
          <Button variant="contained" onClick={handleRecoverContacts}>
            Recover
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenRecoverModal(false)}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RecoverContact;
