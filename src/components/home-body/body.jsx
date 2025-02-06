import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listContact,
  createContact,
  deleteContact,
  updateContact,
} from "../../features/contact/contact.action";
import { listRelation } from "../../features/relation/relation.action";
import "./body.css";
import CustomInput from "../input/input";
import ContactCard from "../contact-card/card";

const Body = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contacts);
  const allContacts = useSelector((state) => state.contact.allContacts);
  console.log("allContacts", allContacts, "contacts", contacts);
  const totalContacts = useSelector((state) => state.contact.totalContacts);
  const relations = useSelector((state) => state.relation.relations);
  const [relation, setRelation] = useState();
  const isLoading = useSelector((state) => state.contact.isLoading);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user_id = currentUser.user._id;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [contactId, setContactId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openChildAddModal, setOpenChildAddModal] = useState(false);
  const [favourite, setfavourite] = useState(false);
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    phone_no: "",
    relation: "",
    favourite: false,
  });
  const [editState, setEditState] = useState(false);
  const [error, setError] = useState({
    first_name: false,
    last_name: false,
    phone_no: false,
    relation: false,
  });

  function handleChangeRelation(e) {
    if (e.target.value) {
      setRelation(e.target.value);
      setPage(0);
    } else {
      setRelation();
      setPage(0);
    }
  }

  const useDebouncedValue = (inputValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(inputValue);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [inputValue, delay]);

    return debouncedValue;
  };

  const debouncedSearchTerm = useDebouncedValue(search, 500);

  useEffect(() => {
    dispatch(listRelation());
  }, []);

  useEffect(() => {
   
      dispatch(
        listContact({
          user_id,
          search,
          page,
          limit,
          relation,
          favourite,
        })
      );

    


   
  }, [limit, page, user_id, relation, favourite, debouncedSearchTerm]);

  const parentStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "26vw",
    minWidth: "250px",
    minHeight: 380,
    maxHeight: "auto",
    bgcolor: "rgb(255, 255, 255)",
    color: "black",
    p: 6,
    zIndex: 2,
  };

  const childModalstyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 100,
    bgcolor: "rgb(255, 255, 255)",
    color: "black",
    p: 6,
    zIndex: 3,
  };

  const columns = [
    { id: "first_name", last_name: "last_name", label: "Name", minWidth: 170 },
    { id: "phone_no", label: "Phone No", minWidth: 100 },
    {
      id: "relation_id",
      label: "Relation",
      minWidth: 170,
    },
    {
      id: "favourite",
      label: "Favourite",
      minWidth: 170,
    },
    {
      id: "Actions",
      label: "Actions",
      minWidth: 170,
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  function addOrEditContacts() {
    if (!editState) {
      dispatch(
        createContact({
          relation_id: input.relation,
          first_name: input.first_name,
          last_name: input.last_name,
          phone_no: input.phone_no,
          user_id: user_id,
          favourite: input.favourite,
        })
      );
    } else {
      dispatch(
        updateContact({
          updatedData: {
            relation_id: input.relation,
            first_name: input.first_name,
            last_name: input.last_name,
            phone_no: input.phone_no,
            user_id: user_id,
            favourite: input.favourite,
          },
          contact_id: contactId,
        })
      );
    }
    setInput({
      first_name: "",
      last_name: "",
      phone_no: "",
      relation: "",
      favourite: false,
    });
    setOpenModal(false);
    setEditState(false);
    setOpenChildAddModal(false);
  }

  function handleCloseModal() {
    setInput({
      first_name: "",
      last_name: "",
      phone_no: "",
      relation: "",
      favourite: "",
    });
    setError({
      first_name: false,
      last_name: false,
      phone_no: false,
      relation: false,
    });
    setOpenModal(false);
    setEditState(false);
    setOpenChildAddModal(false);
  }

  function handleSelectFavourite(e) {
    setInput({ ...input, favourite: !input.favourite });
  }

  function handleEditState(contact) {
    setEditState(true);
    setOpenModal(true);
    setContactId(contact._id);
    setInput({
      first_name: contact.first_name,
      last_name: contact.last_name,
      phone_no: contact.phone_no,
      relation: contact.relation_id._id,
      favourite: contact.favourite,
    });
  }

  function handleDelete(id) {
    console.log("delete", id);
    dispatch(deleteContact(id));
  }

  function clearFilters() {
    setPage(0);
    setRelation("");
    setSearch("");
    setfavourite(false);
  }

  function filterFavourite() {
    setPage(0);
    setfavourite(!favourite);
  }

  function handleErrorHandling() {
    let firstNameError = false;
    let lastNameError = false;
    let phone_noError = false;
    let relationError = false;

    if (
      input.first_name.replace(/\s+/g, " ").trim().length <= 0 ||
      input.first_name <= 0
    ) {
      firstNameError = true;
    }
    if (
      input.last_name.replace(/\s+/g, " ").trim().length <= 0 ||
      input.last_name <= 0
    ) {
      lastNameError = true;
    }

    const phoneRegularExpression = /^([+]\d{2})?\d{10}$/;
    if (!phoneRegularExpression.test(input.phone_no)) {
      phone_noError = true;
    }

    if (!input.relation) {
      relationError = true;
    }

    setError({
      first_name: firstNameError,
      last_name: lastNameError,
      phone_no: phone_noError,
      relation: relationError,
    });

    if (!firstNameError && !lastNameError && !relationError && !phone_noError) {
      setOpenChildAddModal(true);
    }
  }
 

  
  function handleScroll() {
    if (isLoading || ((totalContacts/limit ) && page >= (totalContacts/limit )+1)) return;
  
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {  
      setPage((prevPage) => prevPage + 1);
    }
  }
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, limit,totalContacts]); 
  
  

  return (
    <Box className="body">
      <Box className="filters">
        <TextField
          sx={{ margin: "8px", minWidth: 90, width: "300px" }}
          label="search"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          value={search}
          size="small"
        />
        <FormControl sx={{ m: 1, minWidth: 90, width: "300px" }} size="small">
          <InputLabel id="demo-select-small-label">Relations</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={relation ? relation : ""}
            label="Relations"
            onChange={handleChangeRelation}
            sx={{ height: "40px" }}
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>

            {relations &&
              relations.map((relation) => (
                <MenuItem key={relation._id} value={relation._id}>
                  {relation.relation_type}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              sx={{ margin: "4px", marginLeft: "8px" }}
              checked={favourite}
              onChange={filterFavourite}
            />
          }
          label="Favourite"
        />
        <Box className="add-clear-button">
          <Button
            sx={{ height: "40px", marginRight: "5px" }}
            variant="contained"
            onClick={() => clearFilters()}
          >
            Clear
          </Button>
          <Button
            sx={{ height: "40px", marginLeft: "5px" }}
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            Add
          </Button>
        </Box>
      </Box>
      <FormControl className="form">
        <Modal sx={parentStyle} open={openModal} onClose={handleCloseModal}>
          <Box className="modal-background">
            <Box className="add-functionality">
              <Box className="add-text">Add Contact</Box>
              <Box className="form">
                <CustomInput
                  className="input"
                  errorState={error.first_name}
                  value={input.first_name}
                  handlerState={(e) =>
                    setInput({ ...input, first_name: e.target.value })
                  }
                  label="First Name"
                />
                {error.first_name && (
                  <Box
                    style={{
                      color: "red",
                      marginTop: "-14px",
                      marginBottom: "10px",
                    }}
                  >
                    Enter correct first name
                  </Box>
                )}
                <CustomInput
                  className="input"
                  errorState={error.last_name}
                  value={input.last_name}
                  handlerState={(e) =>
                    setInput({ ...input, last_name: e.target.value })
                  }
                  label="Last Name"
                />
                {error.last_name && (
                  <Box
                    style={{
                      color: "red",
                      marginTop: "-14px",
                      marginBottom: "10px",
                    }}
                  >
                    Enter correct last name
                  </Box>
                )}
                <CustomInput
                  className="input"
                  errorState={error.phone_no}
                  value={input.phone_no}
                  handlerState={(e) =>
                    setInput({ ...input, phone_no: e.target.value })
                  }
                  label="Phone No"
                />
                {error.phone_no && (
                  <Box
                    style={{
                      color: "red",
                      marginTop: "-14px",
                      marginBottom: "10px",
                    }}
                  >
                    Enter correct phone number
                  </Box>
                )}
                <FormControl
                  sx={{ marginTop: "5px", minWidth: 120, width: "95%" }}
                  size="small"
                  error={error.relation}
                >
                  <InputLabel id="demo-simple-select-label">
                    Relations
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={input.relation}
                    onChange={(e) =>
                      setInput({ ...input, relation: e.target.value })
                    }
                    sx={{ width: "100%", height: "40px", minWidth: "150px" }}
                    label={"Relation"}
                  >
                    {relations &&
                      relations.map((relation) => (
                        <MenuItem key={relation._id} value={relation._id}>
                          {relation.relation_type}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {error.relation && (
                  <Box
                    style={{
                      color: "red",
                      marginBottom: "10px",
                    }}
                  >
                    Enter correct relation
                  </Box>
                )}
                <Box className="select-favourite">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={input.favourite}
                        onChange={handleSelectFavourite}
                      />
                    }
                    label="Favourite"
                  />
                </Box>
                <Box className="Add-edit-close-button">
                  <Button
                    disableRipple
                    disableElevation
                    className="add-contacts"
                    onClick={handleErrorHandling}
                    variant="contained"
                  >
                    {editState ? "Edit" : "Add"}
                  </Button>
                  <Button
                    disableRipple
                    disableElevation
                    className="close-modal"
                    onClick={handleCloseModal}
                    variant="contained"
                  >
                    {"Close"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Modal
          sx={childModalstyle}
          keepMounted
          open={openChildAddModal}
          onClose={handleCloseModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box>
            <Typography
              id="keep-mounted-modal-title"
              variant="body2"
              component="h4"
            >
              {editState
                ? "Do you want to Edit Contact? "
                : "Do you want to Add Contact ?"}
            </Typography>
            <Box className="child-modal-buttons">
              <Button onClick={() => addOrEditContacts()} variant="contained">
                {" "}
                Yes
              </Button>
              <Button
                onClick={() => setOpenChildAddModal(false)}
                variant="contained"
              >
                No
              </Button>
            </Box>
          </Box>
        </Modal>
      </FormControl>
      {isLoading ? (
        <Box className="loader"></Box>
      ) : (
        <Paper
          className="contact-table"
          sx={{ width: "90%", overflow: "hidden" }}
        >
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts &&
                  contacts.map((contact) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={contact._id}
                      >
                        {columns.map((column) => {
                          let value = null;
                          if (column.last_name) {
                            value = `${contact[column.id]} ${
                              contact[column.last_name]
                            }`;
                          } else if (column.id === "relation_id") {
                            value = contact[column.id].relation_type;
                          } else if (column.id === "favourite") {
                            if (contact[column.id]) {
                              value = (
                                <StarBorderIcon
                                  sx={{ color: "yellow" }}
                                ></StarBorderIcon>
                              );
                            } else {
                              value = (
                                <StarBorderIcon color="primary"></StarBorderIcon>
                              );
                            }
                          } else if (column.id === "Actions") {
                            value = (
                              <>
                                <ModeEditOutlineIcon
                                  sx={{ padding: "5px", cursor: "pointer" }}
                                  onClick={() => handleEditState(contact)}
                                >
                                  {" "}
                                </ModeEditOutlineIcon>{" "}
                                <DeleteForeverIcon
                                  sx={{ padding: "5px", cursor: "pointer" }}
                                  onClick={() => handleDelete(contact._id)}
                                ></DeleteForeverIcon>
                              </>
                            );
                          } else {
                            value = contact[column.id];
                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 30]}
            component="div"
            count={totalContacts}
            rowsPerPage={limit}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
   <Box className="contact-card">
        {contacts &&
          contacts.map((contact) => (
            <ContactCard
              name={`${contact.first_name} ${contact.last_name}`}
              relation={contact.relation_id.relation_type}
              favourite={contact.favourite}
              phone_no={contact.phone_no}
              handleDelete={() => handleDelete(contact._id)}
              handleEdit={() => handleEditState(contact)}
            ></ContactCard>
          ))}
      </Box>
    
    </Box>
  );
};

export default Body;
