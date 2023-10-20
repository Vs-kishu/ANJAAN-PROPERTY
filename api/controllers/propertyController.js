import Property from "../models/properties.js";
import { errorHandler } from "../utils/error.js";

export const fetchAllProp = async (req, res, next) => {
  try {
    const allProp = await Property.find();
    res.status(200).json(allProp);
  } catch (error) {
    next(error);
  }
};

export const fetchUserProp = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    const properties = await Property.find({ userRef: req.params.id });
    res.status(200).json(properties);
  } else {
    return next(errorHandler(401, "You can see your own properties only"));
  }
};

export const fetchProp = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
    }
    res.status(200).json(property);
  } catch (error) {
    return next(errorHandler(404, "Property Not Found!"));
  }
};

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

export const deleteProperty = async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  if (property) {
    if (req.user.id !== property.userRef) {
      next(errorHandler(401, "You can delete your own property"));
    }
    try {
      await Property.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted successfully");
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(404, "Property not found"));
  }
};

export const editProperty = async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (req.user.id !== property.userRef) {
    return next(errorHandler(401, "You can Update your account only"));
  }
  try {
    const newImageUrls = req.body.imageUrls;

    const updateprop = await Property.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { imageUrls: { $each: newImageUrls } } },
      { new: true }
    );

    res.status(200).json(updateprop);
  } catch (error) {
    next(error);
  }
};
