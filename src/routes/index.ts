import express from "express";
import { upload } from "../utils/fileHandler";
import { uploadResume } from "../modules/resume/resume.controller";

const router = express.Router();

router.post("/resume/upload",upload.single("resume"),uploadResume);

export default router;