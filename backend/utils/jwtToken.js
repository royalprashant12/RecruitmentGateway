export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  // Ensure COOKIE_EXPIRE is a number and has a default value (e.g., 7 days)
  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 7;

  // Set cookie expiration time in milliseconds
  const options = {
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
    httpOnly: true, // Ensure the cookie is only accessible by the web server
  };

  // Send the token in a cookie
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
