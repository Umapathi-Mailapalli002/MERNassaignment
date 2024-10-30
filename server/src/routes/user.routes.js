import { Router } from "express";
import { authorizedRole, verifyJWT } from "../middlewares/auth.middleware.js";
import {
  logInUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
  getCurrentUser,
  getAllUsers,
  changeRoleOFUser,
  updateUserDetails,
  deleteUser
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(logInUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT,updateAccountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

  // Admin-only route
router.route("/all-users").get( verifyJWT,authorizedRole(["Admin"]), getAllUsers);
router.route("/change-role/:userId").patch( verifyJWT,authorizedRole(["Admin"]), changeRoleOFUser);
router.route("/create-user").post(upload.single("avatar"),verifyJWT,authorizedRole(["Admin"]), registerUser);
router.route("/update-user/:userId").patch(verifyJWT,authorizedRole(["Admin"]), updateUserDetails);
router.route("/delete-user/:userId").delete(verifyJWT,authorizedRole(["Admin"]), deleteUser);

export default router;
