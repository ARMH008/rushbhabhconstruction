const mongoose = require("mongoose");
const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const Site = require("./../Models/siteReportModel");
const AppError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");

exports.getsitesinglereport = catchAsync(async (req, res, next) => {
  const doc = await Site.findById(req.params.id);
  if (!doc) {
    return next(new AppError("No doc found by thaat id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.searchreport = catchAsync(async (req, res, next) => {
  const searchQuery = req.query.name;

  // Perform a case-insensitive search for users with names containing the query
  const site = await Site.find({
    $or: [
      { architectName: { $regex: new RegExp(searchQuery, "i") } },
      { clientName: { $regex: new RegExp(searchQuery, "i") } },
    ],
  });
  res.status(200).json({
    status: "success",
    data: {
      site: site,
    },
  });
});

exports.getsitereports = catchAsync(async (req, res, next) => {
  const doc = await Site.find().sort({ createdAt: -1 });

  if (!doc) {
    return next(new AppError("no reports found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createSiteReport = catchAsync(async (req, res, next) => {
  // Create the sitereport without setting the image URL
  const doc = await Site.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

//for employees
exports.deletereport = catchAsync(async (req, res, next) => {
  await Site.findByIdAndUpdate(req.params.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updatereport = catchAsync(async (req, res, next) => {
  const doc = await Site.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("no doc found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
