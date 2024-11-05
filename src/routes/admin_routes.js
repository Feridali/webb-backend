const express = require("express");
const adminController = require("../controllers/admin_controller");
const router = express.Router();

router.post("/users", adminController.createUser);

router.get("users", adminController.getAllUsers);

router.get("/users/:id", adminController.getUser);

router.put("/users/:id", adminController.updateUser);

router.delete("/users/:id", adminController.deleteUser);

router.post("/groups", adminController.createGroup);

router.get("/groups", adminController.getGroups);

router.delete("/groups/:name", adminController.deleteGroup);

router.post("users/:id/grouos", adminController.addUserToGroup);

router.delete(
  "/users/:id/groups/:groupName",
  adminController.removeUserFromGroup
);
