import { Request, Response } from "express";
import { processResume } from "./service/resume.service";

export const uploadResume = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const role = req.body.role;

        if (!["backend", "frontend"].includes(role)) return res.status(400).json({ message: "Invalid Role" });

        if (!file) return res.status(400).json({ message: "No file uploaded" });

        const result = await processResume(file.path,role)

        return res.status(200).json({
            message: "Resume uploaded successfully",
            filePath: file.path,
            textPreview: result.text.slice(0, 300),
            foundSkills: result.skills,
            skillsExpected: result.expectedSkills,
            report: result.skillMatch,
            recommendations: result.recommendations
        })

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "Internal Server Error" })
    }
}