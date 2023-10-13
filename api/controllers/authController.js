import User from "../models/users.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

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
  console.log(req.body);
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
    res.status(200).json({ user: finduser });
  } catch (error) {
    next(error);
  }
};
