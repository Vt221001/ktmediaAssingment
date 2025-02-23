import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    logoUrl: {
      type: String,
      trim: true,
    },
    jobPosition: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    monthlySalary: {
      type: Number,
      required: true,
      min: [1, "Salary must be at least 1"],
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship"],
      default: "Full-time",
    },
    jobLocation: {
      type: String,
      enum: ["Remote", "Office", "Hybrid"],
      default: "Office",
    },
    companyLocation: {
      type: String,
      required: true,
      trim: true,
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },
    aboutCompany: {
      type: String,
      required: true,
      trim: true,
    },

    skillRequired: {
      type: [String],
      required: true,
      lowercase: true,
    },
    additionalInfo: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export { Job };
