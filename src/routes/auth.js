const authControllers = require("../controllers/auth");
const { authorizedLoggedInUser, sessionAuthorizeLoggedInUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/login", authControllers.loginUser)
router.post("/register", authControllers.registerUser)

router.get("/refresh-token", authorizedLoggedInUser, authControllers.keepLogin)

// Verifikasi cara JWT
router.get("/verify/:token", authControllers.verifyUser)
router.post(
  "/resend-verification",
  authorizedLoggedInUser,
  authControllers.resendVerificationEmail
)

// Verifikasi cara store token di database
router.post("/v2/register", authControllers.registerUserV2)
router.get("/v2/verify/:token", authControllers.verifyUserV2)
router.post(
  "/v2/resend-verification",
  authorizedLoggedInUser,
  authControllers.resendVerificationEmailV2
)

router.post("/forgot-password-email", authControllers.sendForgotPasswordEmail)
router.patch("/change-password-forgot", authControllers.changeUserForgotPassword)

router.post("/session/login", authControllers.sessionLoginUser)
router.get("/session/refresh-token", sessionAuthorizeLoggedInUser, authControllers.sessionKeepLogin)

router.post("/otp/request", authControllers.sendOTP)
router.get("/otp/login/:otpToken/:userId", authControllers.otpLoginUser)

module.exports = router;