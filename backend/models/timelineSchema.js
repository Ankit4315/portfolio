import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "title requrired"],
  },
  description: {
    type: String,
    require: [true, "description requrired"],
  },
  timeline: {
    from: {
      type: String,
      require: [true, "Timeline starting date is required"],
    },
    to: String,
  },
});

export const Timeline = mongoose.model("timeline", timelineSchema);
