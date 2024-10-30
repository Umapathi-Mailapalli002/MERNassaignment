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
  getAllUsers
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(logInUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT,authorizedRole(["Customer","Admin"]), changeCurrentPassword);
router.route("/current-user").get(verifyJWT, authorizedRole(["Customer","CustomerServiceAgent","Admin"]), getCurrentUser);
router.route("/update-account").patch(verifyJWT,authorizedRole(["Customer","Admin"]), updateAccountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

  // Admin-only route
router.route("/all-users").get( verifyJWT,authorizedRole(["Admin"]), getAllUsers);
export default router;
