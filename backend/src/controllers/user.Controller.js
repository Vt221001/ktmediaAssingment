import { User } from "../models/user.Model.js";
import { asyncHandler } from "../utils/wrapAsync.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { validateUser } from "../validation/user.Validation.js";
import { generateAccessToken } from "../utils/generateAcessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  const accessToken = generateAccessToken(user);

  let refreshToken = user.refreshToken || generateRefreshToken(user);

  if (!user.refreshToken) {
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
  }

  return { accessToken, refreshToken };
};

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const { error } = validateUser(req.body);

  if (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, error.details[0].message));
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User already exists"));
  }

  const user = new User({ name, email, password, phoneNumber });
  await user.save();

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user, accessToken, refreshToken },
        "User registered & logged in successfully"
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Email and password are required"));
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "User credential Wrong"));
  }

  const isValidPassword = await user.isValidPassword(password);

  if (!isValidPassword) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid email or password"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  user.refreshToken = "";
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, null, "User logged out"));
});

export const refreshToken = asyncHandler(async (req, res, next) => {
  try {
    const { incomingRefreshToken } = req.body;
    console.log("refer", incomingRefreshToken);

    if (!incomingRefreshToken) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "IncomingToken is required"));
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      console.log("desdfjkj", decodedToken);
    } catch (error) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "something went wrong"));
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    if (user.refreshToken !== incomingRefreshToken) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "refreshToken is not correct"));
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken, refreshToken: newRefreshToken },
          "Tokens refreshed successfully"
        )
      );
  } catch (error) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "something went wrong"));
  }
});
