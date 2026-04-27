import { Request, Response } from "express";
import { extractTextFromPDF } from "./resume.parser";
import { extractSkills } from "./skillExtractor";
import { ROLE_SKILLS } from "./role.skills";

export const uploadResume = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const role = req.body.role as "backend" | "frontend"

        if (!file) return res.status(400).json({ message: "No file uploaded" })

        const text = await extractTextFromPDF(file.path);

        const skills = extractSkills(text);

        const expectedSkills = ROLE_SKILLS[role];

        res.status(200).json({ 
            message: "Resume uploaded successfully",
            filePath: file.path,
            textPreview: text.slice(0,300),
            foundSkills: skills,
            skillsExpected: expectedSkills
        })

    } catch (error) {
        return res.status(500).json({ message: "Upload Failed" })
    }
}