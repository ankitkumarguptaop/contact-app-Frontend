import axios from "axios";

export const listRelationService =  async() => {
    return await axios.get(`${process.env.REACT_APP_BACKEND_URL}relations`);
  };