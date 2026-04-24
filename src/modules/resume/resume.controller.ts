import { Request, Response } from "express";
import { extractTextFromPDF } from "./resume.parser";

export const uploadResume = async (req: Request, res: Response) => {
    try {
        const file = req.file;

        if (!file) return res.status(400).json({ message: "No file uploaded" })

        const text = await extractTextFromPDF(file.path);

        res.status(500).json({ 
            message: "Resume uploaded successfully",
            filePath: file.path,
            textPreview: text.slice(0,300)
        })

    } catch (error) {
        return res.status(500).json({ message: "Upload Failed" })
    }
}