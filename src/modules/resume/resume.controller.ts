import { Request, Response } from "express";

export const uploadResume = async (req: Request, res: Response) => {
    try {
        const file = req.file;

        if (!file) return res.status(400).json({ message: "No file uploaded" })

        res.status(500).json({ 
            message: "Resume uploaded successfully",
            filepath: file.path,
        })

    } catch (error) {
        return res.status(500).json({ message: "Upload Failed" })
    }
}