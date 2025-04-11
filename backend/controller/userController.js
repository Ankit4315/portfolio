import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import { sendEamil } from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar And Resume Are Requried!", 400));
  }
  const { avatar } = req.files;
  console.log("avatar", avatar);

  const cloudinaryResponseAvtar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "AVATARS" }
  );
  if (!cloudinaryResponseAvtar || cloudinaryResponseAvtar.error) {
    console.error(
      "cloudinary Error",
      cloudinaryResponseAvtar.error || "Unlnow cloudinary error"
    );
  }

  const { resume } = req.files;
  console.log("resume", resume);

  const cloudinaryResponseResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "RESUME" }
  );
  if (!cloudinaryResponseResume || cloudinaryResponseResume.error) {
    console.error(
      "cloudinary Error",
      cloudinaryResponseResume.error || "Unlnow cloudinary error"
    );
  }

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    insatgramURL,
    facebookURL,
    twitterURL,
    linkedinURL,
  } = req.body;

  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    insatgramURL,
    facebookURL,
    twitterURL,
    linkedinURL,
    avatar: {
      public_id: cloudinaryResponseAvtar.public_id,
      url: cloudinaryResponseAvtar.url,
    },
    resume: {
      public_id: cloudinaryResponseResume.public_id,
      url: cloudinaryResponseResume.url,
    },
  });

  // generateToken(user, "user registerd", 201, res);
  res.status(201).json({
    success: true,
    message: "user registred",
    user,
  });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Login attempt with:", email);
  if (!email || !password) {
    console.log("Missing email or password");
    return next(new ErrorHandler("email and password are required", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    console.log("User not found:", email);
    return next(new ErrorHandler("invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    console.log("Password mismatch for user:", email);
    return next(new ErrorHandler("invalid email or password", 401));
  }
  console.log("Login successful for:", user.email);
  generateToken(user, "logged in", 200, res);
});
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "loged out",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    message: "my desk",
    user,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserdata = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
    insatgramURL: req.body.insatgramURL,
    facebookURL: req.body.facebookURL,
    twitterURL: req.body.twitterURL,
    linkedinURL: req.body.linkedinURL,
    facebookURLURL: req.body.facebookURL,
  };
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(profileImageId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "AVATARS" }
    );
    newUserdata.avatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeId = user.resume.public_id;
    await cloudinary.uploader.destroy(resumeId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: "RESUME" }
    );
    newUserdata.resume = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserdata, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "profile updated",
    user,
  });
});

export const updatePasssword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("please fill the filds", 400));
  }
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("incorrect current password", 400));
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("new password and confirm password does not match", 400)
    );
  }
  user.password = newPassword;
  await user.save();
  res.json({
    success: true,
    message: "password updated",
  });
});

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return next(new ErrorHandler("No users found", 404));
    }

    // Get the first user from the collection
    const user = users[0];
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("Error fetching user data", 500));
  }
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 400));
  }
  const resetToken = user.getResetPasswordToken();
  console.log(resetToken);
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
  const message = `your reset password token is:-\n\n${resetPasswordUrl}\n\n if you've not request for this please ignor it`;

  try {
    await sendEamil({
      email: user.email,
      subject: "persnal portfolio dashboard recovery password",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email set to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordTokenExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("reset password is invallid or has been expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmpassword) {
    return next(new ErrorHandler("password & confirm password do not match"));
  }
  user.password = req.body.password;
  user.resetPasswordTokenExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  generateToken(user, "reset password successfully", 200, res);
});
