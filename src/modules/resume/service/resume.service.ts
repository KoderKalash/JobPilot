import { extractTextFromPDF } from "../resume.parser";
import { extractSkills } from "../skillExtractor";
import { ROLE_SKILLS, Role } from "../role.skills";
import { matchSkills } from "../matcher.engine";
import { generateRecommendations } from "../recommendation.engine";
import prisma from "../../../config/db";

export const processResume = async (filePath: string, role: Role) => {
    const text = await extractTextFromPDF(filePath);

    //saving resume before analysis
    const savedResume = await prisma.resume.create({
        data: {
            fileUrl: filePath,
            rawText: text
        },
    });

    const skills = extractSkills(text);

    const expectedSkills = ROLE_SKILLS[role];
    if (!expectedSkills) throw new Error("Invalid role");

    const skillMatch = matchSkills(expectedSkills, skills);

    const recommendations = generateRecommendations(skillMatch.missingSkills, role);

    //saving analysis
    const savedAnalysis = await prisma.analysis.create({
        data: {
            resumeId: savedResume.id, //Foreign key -> relationship
            role,
            matchScore: skillMatch.matchScore,
            matchedSkills: skillMatch.matchedSkills,
            missingSkills: skillMatch.missingSkills,
            recommendations,
        },
    });

    return {
        resumeId : savedResume.id,
        analysisId: savedAnalysis.id,
        text,
        skills,
        expectedSkills,
        skillMatch,
        recommendations,
    };
}

/*Currently persistence operations are not wrapped in a DB transaction, so partial writes are possible if downstream persistence fails. */