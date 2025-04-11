import mongoose from "mongoose";

const softwareApplicationSchema = new mongoose.Schema({
  name: String,
  svg: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
});

export const SoftwareApplication = mongoose.model(
  "SoftwareApplication",
  softwareApplicationSchema
);
