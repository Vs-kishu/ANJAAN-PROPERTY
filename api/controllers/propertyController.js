import Property from "../models/properties.js";
import { errorHandler } from "../utils/error.js";

export const createPoperty = async (req, res, next) => {
  const { imageUrls } = req.body;
  if (imageUrls.length === 0) {
    return next(errorHandler(401, "select at least 1 image"));
  }
  try {
    const property = await Property.create(req.body);
    console.log("done");
    return res.status(201).json(property);
  } catch (error) {
    console.log("nodtdone");
    next(error);
  }
};

export const fetchAllProp = async (req, res, next) => {
  try {
    const allProp = await Property.find();
    res.status(200).json(allProp);
  } catch (error) {
    next(error);
  }
};
