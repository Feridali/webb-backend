const {
  addUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUsers,
  addGroup,
  listGroups,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup,
  getUserByUsername,
} = require("../domain/user_handler");

exports.createUser = (req, res) => {
  console.log(req.body);
  const user = req.body;
  addUser(user);
  res.status(201).send(user);
};

exports.getAllUsers = (req, res) => {
  try {
    const users = getUsers();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "no users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  const user = getUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const newUserDetails = req.body;
  if (updateUserById(id, newUserDetails)) {
    res.send("User updated successfully");
  } else {
    res.status(404).send("User not found");
  }
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  if (deleteUserById(id)) {
    res.send("User deleted succesfully");
  } else {
    res.status(404).send("User not found");
  }
};

exports.removeUserFromGroup = (req, res) => {
  const userId = req.params.id;
  const groupName = req.params.groupName;
  if (removeUserFromGroup(userId, groupName)) {
    res.send(`User removed from ${groupName} successfully.`);
  } else {
    res.status(404).send("User or group not found");
  }
};

exports.createGroup = (req, res) => {
  const groupName = req.body.name;
  addGroup(groupName);
  res.status(201).send(`Group ´${groupName}´ created successfully`);
};

exports.getGroups = (req, res) => {
  try {
    const group = listGroups();
    if (!groups || groups.length === 0) {
      return res.status(404).json({ message: "No groups found" });
    }
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Error fetching groups" });
  }
};

exports.deleteGroup = (req, res) => {
  const groupName = req.params.name;
  if (deleteGroup(groupName)) {
    res.send(`Group ´${groupName}´ deleted succesfully. `);
  } else {
    res.status(404).send("Group not found");
  }
};

exports.findUserByUsername = (username) => {
  const user = getUserByUsername(username);
  if (!user) {
    return null;
  }
  return user;
};

exports.findUserByUsername = (req, res) => {
  const username = req.params.username;
  const user = getUserByUsername(username);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.status(200).json(user);
};
