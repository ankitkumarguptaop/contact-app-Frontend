import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
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
const Body = () => {
  // const error = useSelector((state) => state.contact.error);
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contact.contacts);
  const totalContacts = useSelector((state) => state.contact.totalContacts);

  const relations = useSelector((state) => state.relation.relations);
  const [relation, setRelation] = useState();
  const isLoading = useSelector((state) => state.contact.isLoading);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user_id = currentUser.data.user._id;

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState();
  const [limit, setLimit] = useState(5);
  const [contactId, setContactId] = useState(5);

  const [openModal, setOpenModal] = useState(false);
  const [favourite, setfavourite] = useState(false);
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    phone_no: "",
    relation: null,
    favourite: false,
  });
  const [editState, setEditState] = useState(false);

  const [error, setError] = useState({
    first_name: false,
    last_name: false,
    phone_no: false,
    relation: false,
  });

  console.log(user_id, page);

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
    console.log("rerender useeffect");
  }, [search, limit, page, user_id, relation, favourite]);

  useEffect(() => {
    dispatch(listRelation());
  }, []);

  const style = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 450,
    bgcolor: "rgb(255, 255, 255)",
    color: "black",
    p: 6,
  };

  function handleChangeRelation(e) {
    if (e.target.value !== "None") {
      setRelation(e.target.value);
    } else {
      setRelation();
    }
  }

  function handleSearch(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
    setPage(0);
  }

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
        relation: null,
        favourite: null,
      });
      setOpenModal(false);
    }
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleSelectFavourite(e) {
    setInput({ ...input, favourite: e.target.value });
  }
  function handleEditState(contact) {
    setEditState(true);
    setOpenModal(true);
    setContactId(contact._id);
    console.log(contact._id);
    setInput({
      first_name: contact.first_name,
      last_name: contact.last_name,
      phone_no: contact.phone_no,
      relation: contact.relation_id,
      favourite: contact.favourite,
    });
  }

  function handleDelete(id) {
    console.log("delete", id);
    dispatch(deleteContact(id));
  }

  function clearFilters() {
    setPage(0);
    setRelation(undefined);
    setSearch("");
    setfavourite(false);
  }
  function filterFavourite() {
    setfavourite(!favourite);
  }
  return (
    <Box className="body">
      <Box className="filters">
        <TextField
          label="search"
          onChange={(e) => handleSearch(e)}
          value={search}
          size="small"
          floatingLabelStyle={{ color: "black" }}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Relations</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={relation ? relation : "None"}
            label="Relations"
            onChange={handleChangeRelation}
            sx={{ width: "240px", height: "40px" }}
          >
            <MenuItem value="None">
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
          control={<Checkbox checked={favourite} onChange={filterFavourite} />}
          label="Favourite"
        />
        <Button
          sx={{ height: "40px" }}
          variant="contained"
          onClick={() => clearFilters()}
        >
          Clear
        </Button>
        <Button
          sx={{ height: "40px" }}
          variant="contained"
          onClick={() => setOpenModal(true)}
        >
          Add
        </Button>
      </Box>

      <FormControl className="form">
        <Modal sx={style} open={openModal} onClose={handleCloseModal}>
          <Box className="modal-background">
            <CloseIcon
              onClick={handleCloseModal}
              sx={{
                cursor: "pointer",
                backgroundColor: "#1976d2",
                height: "30px",
                width: "30px",
              }}
            ></CloseIcon>

            <Box className="add-functionality">
              <Box className="add-text">Add Contact</Box>
              <Box className="form">
                <CustomInput
                  className="input"
                  errorState={error.first_name}
                  value={input.first_name}
                  handlerState={(e) =>
                    setInput({ ...input, first_name: e.target.value  })
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
                  sx={{ marginTop: "5px", minWidth: 120 }}
                  size="small"
                  error={input.relation}
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
                    sx={{ width: "380px", height: "40px" }}
                    label="Relations"
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
                      // marginTop: "-14px",
                      marginBottom: "10px",
                    }}
                  >
                    Enter correct relation
                  </Box>
                )}
                <Box className="select-favourite">
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Favourite
                  </FormLabel>
                  <RadioGroup
                    className="radio-button"
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={input.favourite}
                    onChange={handleSelectFavourite}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Box>
                <Button
                  disableRipple
                  disableElevation
                  className="add-contacts"
                  onClick={() => addOrEditContacts()}
                  variant="contained"
                >
                  {editState ? "Edit" : "Add"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </FormControl>
      <Paper sx={{ width: "90%", overflow: "hidden" }}>
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
              {contacts.map((contact) => {
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
    </Box>
  );
};

export default Body;
