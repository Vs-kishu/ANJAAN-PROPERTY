import Property from "../models/properties.js";
import { errorHandler } from "../utils/error.js";

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

    const otherFieldUpdates = { ...req.body };
    delete otherFieldUpdates.imageUrls;

    const updateprop = await Property.findByIdAndUpdate(
      { _id: req.params.id },
      otherFieldUpdates,
      { new: true }
    );
    updateprop.imageUrls.push(...newImageUrls);

    await updateprop.save();

    res.status(200).json(updateprop);
  } catch (error) {
    next(error);
  }
};

export const fetchProperties = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Property.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
