import Property from "../models/properties.js";

export const createPoperty = async (req, res, next) => {
  try {
    const property = await Property.create(req.body);
    return res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};
