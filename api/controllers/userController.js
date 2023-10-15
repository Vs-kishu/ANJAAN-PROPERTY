import { errorHandler } from "../utils/error.js";
import User from "../models/users.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {
  console.log(req.body);
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const findUserName = await User.findOne({ userName: req.body.userName });
    if (findUserName) {
      return next(errorHandler(401, "try differnt userName it already taken"));
    }
    const findEmail = await User.findOne({ email: req.body.email });
    if (findEmail) {
      return next(errorHandler(401, "try differnt email it already taken"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          photoURL: req.body.photoURL,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
