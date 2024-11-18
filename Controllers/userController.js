const multer = require("multer");

const sharp = require("sharp");

const AppError = require("./../utils/appErrors");

const catchAsync = require("./../utils/catchAsync");

const User = require("./../models/userModel");

exports.getdetails = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    res.status(200).json({
      status: "fail",
      user: "no user",
    });
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);

  res.status(200).json({
    status: "success",
    user: freshUser,
  });
});

exports.getalluser = catchAsync(async (req, res, next) => {
  const doc = await User.find();

  if (!doc) {
    return next(new AppError("sorry there are no user for ur website", 404));
  }

  res.status(200).json({
    status: "success",
    users: {
      data: doc,
    },
  });
});
const filterObj = (obj, ...AllowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (AllowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.updateme = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(JSON.stringify(req.body));

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "do not insert the password here this is not the correct route please go on updatePassword route !! Thankuuuuuu",
        400
      )
    );
  }
  const filterObject = filterObj(req.body, "name", "email");
  if (req.file) filterObject.photo = req.body.photo;

  const updateUser = await User.findByIdAndUpdate(req.user.id, filterObject, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});
