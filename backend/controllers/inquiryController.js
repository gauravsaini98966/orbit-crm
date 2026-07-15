import mongoose from "mongoose";
import Inquiry from "../models/Inquiry.js";
import { isDBConnected } from "../config/db.js";

function dbGuard(res) {
  if (!isDBConnected()) {
    res.status(503).json({
      success: false,
      message: "Database is not connected. Please try again shortly.",
    });
    return false;
  }
  return true;
}

// POST /api/inquiry
export async function createInquiry(req, res) {
  if (!dbGuard(res)) return;
  try {
    const inquiry = await Inquiry.create(req.body);
    return res.status(201).json({ success: true, data: inquiry });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }
    console.error("[createInquiry]", err);
    return res.status(500).json({ success: false, message: "Server error while saving inquiry" });
  }
}

// GET /api/inquiry
export async function getInquiries(req, res) {
  if (!dbGuard(res)) return;
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      industry,
      companySize,
      status,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (industry) query.industry = industry;
    if (companySize) query.companySize = companySize;
    if (status) query.status = status;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
    const sortDir = order === "asc" ? 1 : -1;

    const [items, total] = await Promise.all([
      Inquiry.find(query)
        .sort({ [sortBy]: sortDir })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Inquiry.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (err) {
    console.error("[getInquiries]", err);
    return res.status(500).json({ success: false, message: "Server error while fetching inquiries" });
  }
}

// GET /api/inquiry/:id
export async function getInquiryById(req, res) {
  if (!dbGuard(res)) return;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid inquiry id" });
    }
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    return res.status(200).json({ success: true, data: inquiry });
  } catch (err) {
    console.error("[getInquiryById]", err);
    return res.status(500).json({ success: false, message: "Server error while fetching inquiry" });
  }
}

// PATCH /api/inquiry/:id
export async function updateInquiry(req, res) {
  if (!dbGuard(res)) return;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid inquiry id" });
    }
    const allowed = ["status"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    return res.status(200).json({ success: true, data: inquiry });
  } catch (err) {
    console.error("[updateInquiry]", err);
    return res.status(500).json({ success: false, message: "Server error while updating inquiry" });
  }
}

// DELETE /api/inquiry/:id
export async function deleteInquiry(req, res) {
  if (!dbGuard(res)) return;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid inquiry id" });
    }
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    return res.status(200).json({ success: true, data: inquiry, message: "Inquiry deleted" });
  } catch (err) {
    console.error("[deleteInquiry]", err);
    return res.status(500).json({ success: false, message: "Server error while deleting inquiry" });
  }
}
