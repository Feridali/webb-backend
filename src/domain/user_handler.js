const { v4: uuidv4 } = require("uuid");
const authHandler = require("./auth_handler");

let users = [
  {
    id: "543d719e-da91-429d-bbaa-8010a9556381",
    username: "admin",
    password: "$2b$10$H3fuKg7oVfRIAHfGhP.riOiAJ1buARooRUU61wD1FxT0eVoLWIKJG",
  },
  {
    id: "543d719e-da91-429d-bbaa-8010a9556382",
    username: "user",
    password: "$2b$10$G.oUiUVQFOgLejSiV0uALeu4e72zvizj6FOOtdyXFk1HgDS1lDtSO",
  },
  {
    id: "543d719e-da91-429d-bbaa-8010a9556383",
    username: "gdpr",
    password: "$2b$10$AgA8W4RDTASLM7H877.lvOWrzLLnC6s866iNMMVODNddfasMOK2S6",
  },
];

let groups = {
  admin: ["543d719e-da91-429d-bbaa-8010a9556381"],
  user: [
    "543d719e-da91-429d-bbaa-8010a9556381",
    "543d719e-da91-429d-bbaa-8010a9556382",
    "543d719e-da91-429d-bbaa-8010a9556383",
  ],
  gdpr: ["543d719e-da91-429d-bbaa-8010a9556383"],
};

exports.addUser = (user) => {
  user.id = uuidv4();
  user.password = authHandler.cryptPassword(user.password);
  user.push(user);
  return user;
};

exports.getUser = (id) => {
  return users.find((user) => user.id === id);
};

exports.updateUser = (id, newUserDetails) => {
  let userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...newUserDetails };
    return true;
  }
  return false;
};

exports.addGroup = (groupName) => {
  if (!groups[groupName]) {
    groups[groupname] = [];
    return true;
  }
  return false;
};

exports.listGroups = () => {
  return Object.keys(groups).map((groupName) => ({
    name: groupName,
    members: groups[groupName].map((userId) => this.getUser(userId)),
  }));
};
