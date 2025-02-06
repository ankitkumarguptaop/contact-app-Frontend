



exports.listUserService = (user_id, search, page, limit) => {
  return `${process.env.REACT_APP_BACKEND_URL}users/${user_id}?search=${search}&page=${page}&limit=${limit}`;
};
exports.getUserService = (user_id) => {
    return `${process.env.REACT_APP_BACKEND_URL}users/${user_id}`;
};

exports.deleteUserService = (user_id) => {
  return `${process.env.REACT_APP_BACKEND_URL}users/${user_id}`;
};

exports.updateUserService = (user_id) => {
  return `${process.env.REACT_APP_BACKEND_URL}users/${user_id}`;
};
