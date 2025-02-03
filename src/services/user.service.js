



exports.listUserService = (user_id, search, page, limit) => {
  return `http://localhost:8080/users/${user_id}?search=${search}&page=${page}&limit=${limit}`;
};
exports.getUserService = (user_id) => {
    return `http://localhost:8080/users/${user_id}`;
};

exports.deleteUserService = (user_id) => {
  return `http://localhost:8080/users/${user_id}`;
};

exports.updateUserService = (user_id) => {
  return `http://localhost:8080/users/${user_id}`;
};
