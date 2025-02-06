import axios from "axios";

export const listContactService = async (payload) => {
  const { user_id, search, page, limit, relation, favourite } = payload;
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}contacts/${user_id}?search=${search}&page=${page}&limit=${limit}&relation=${relation}&favourite=${favourite}`,
  );
};

export const deleteContactService = async (contact_id) => {
  return axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}contacts/${contact_id}`,
  );
};

export const updateContactService = async (payload) => {
  const { contact_id, updatedData } = payload;
  return await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}contacts/${contact_id}`,
    updatedData,
  );
};

export const createContactService = async (contactData) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}contacts`,
    contactData,
  );
};

export const recoverContactService = async () => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}contacts/recover`,
  );
};
