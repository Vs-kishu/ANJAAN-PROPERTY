import User from "../models/users.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);

  const newUser = new User({ userName, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User Created succesfully" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const finduser = await User.findOne({ email });
    if (!finduser) {
      return next(errorHandler(404, "user Not Found"));
    }
    const isPassMatched = bcrypt.compareSync(password, finduser.password);
    if (!isPassMatched) {
      return next(errorHandler(401, "Invalid Credentials"));
    }
    const token = jwt.sign({ id: finduser._id }, process.env.SECRET_KEY);
    const { password: pass, ...rest } = finduser._doc;
    res.cookie("user_token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { userName, email, photoURL } = req.body;
  try {
    const finduser = await User.findOne({ email });
    if (finduser) {
      const token = jwt.sign({ id: finduser._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = finduser._doc;
      res
        .cookie("user_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 12);
      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
        photoURL,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("user_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
