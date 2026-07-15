import { Router } from "express";
import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
} from "../controllers/inquiryController.js";
import { inquiryValidationRules, handleValidation } from "../middleware/validateInquiry.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = Router();

// Public: submit an inquiry from the landing page
router.post("/", inquiryValidationRules, handleValidation, createInquiry);

// Admin dashboard endpoints
router.get("/", adminAuth, getInquiries);
router.get("/:id", adminAuth, getInquiryById);
router.patch("/:id", adminAuth, updateInquiry);
router.delete("/:id", adminAuth, deleteInquiry);

export default router;
