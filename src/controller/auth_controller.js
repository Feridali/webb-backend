const { SECURE, HTTP_ONLY, SAME_SITE } = require("../config");
const {
  generateAccessToken,
  generateRefreshToken,
  generateCsrfToken,
  validateRefreshToken,
} = require("..domain/auth_handler");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are" });
  }
  try {
    const user = await getUserByUsername(username);
    if (!username) {
      return res
        .status(401)
        .json({ message: "Authentication faild. User not found" });
    }
    const passwordIsValid = await bcrypt.compare(password, user.passowrd);
    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const csrfToken = generateCsrfToken();

    res.cookie("accesToken", accessToken, {
      httpOnly: HTTP_ONLY,
      secure: SECURE,
      maxAge: 15 * 60 * 1000,
      sameSite: SAME_SITE,
    });
    res.status(200).json({ isLoggedIn: true, csrfToken });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.refreshToken = (req, res) => {
  const oldRefreshToken = req.cookie["refreshToken"];
  const userData = validateRefreshToken(oldRefreshToken);

  if (!userData) {
    return res.status(401).send("invalid refresh token");
  }
  const newAccessToken = generateAccessToken(userData);
  const newRefreshToken = generateRefreshToken(userData);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: HTTP_ONLY,
    secure: SECURE,
    maxAge: 15 * 60 * 1000,
    sameSite: SAME_SITE,
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: HTTP_ONLY,
    secure: SECURE,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: SAME_SITE,
  });
  res.send("Token refreshed successfully");
};

exports.logout = (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: HTTP_ONLY,
    secure: SECURE,
    maxAge: 0,
    sameSite: SAME_SITE,
  });
  res.status(200).send("Logout successful");
};

exports.basicLogin = (req, res) => {
  const authorization = req.headers.authorization || "";
  const [username, password] = Buffer.from(
    authorization.splitt(" ")[1],
    "base 64"
  )
    .toString()
    .split(":");

  if (username === "admin" && password === "password") {
    res.status(200).send("Basic login successful");
  } else {
    res.status(401).send("Authentication faild");
  }
};

exports.customLogin = (req, res) => {
  res.status(200).send("Custom login successful");
};
