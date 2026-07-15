import mongoose from "mongoose";

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Retail & E-commerce",
  "Manufacturing",
  "Education",
  "Real Estate",
  "Hospitality",
  "Logistics & Supply Chain",
  "Other",
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const inquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [150, "Company name cannot exceed 150 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[+]?[\d\s\-().]{7,20}$/, "Enter a valid phone number"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
      enum: { values: INDUSTRIES, message: "Select a valid industry" },
    },
    companySize: {
      type: String,
      required: [true, "Company size is required"],
      enum: { values: COMPANY_SIZES, message: "Select a valid company size" },
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

inquirySchema.index({ email: 1, createdAt: -1 });
inquirySchema.index({ fullName: "text", companyName: "text", email: "text" });

export const INQUIRY_INDUSTRIES = INDUSTRIES;
export const INQUIRY_COMPANY_SIZES = COMPANY_SIZES;

export default mongoose.model("Inquiry", inquirySchema);
