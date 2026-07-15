import { body, validationResult } from "express-validator";
import { INQUIRY_INDUSTRIES, INQUIRY_COMPANY_SIZES } from "../models/Inquiry.js";

export const inquiryValidationRules = [
  body("fullName").trim().isLength({ min: 2, max: 100 }).withMessage("Full name must be 2-100 characters"),
  body("companyName").trim().isLength({ min: 1, max: 150 }).withMessage("Company name is required"),
  body("email").trim().isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("phone")
    .trim()
    .matches(/^[+]?[\d\s\-().]{7,20}$/)
    .withMessage("Enter a valid phone number"),
  body("country").trim().notEmpty().withMessage("Country is required"),
  body("industry").isIn(INQUIRY_INDUSTRIES).withMessage("Select a valid industry"),
  body("companySize").isIn(INQUIRY_COMPANY_SIZES).withMessage("Select a valid company size"),
  body("message").trim().isLength({ min: 10, max: 2000 }).withMessage("Message must be 10-2000 characters"),
];

export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => e.msg),
    });
  }
  next();
}
