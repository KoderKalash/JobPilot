import { extractTextFromPDF } from "../resume.parser";
import { extractSkills } from "../skillExtractor";
import { ROLE_SKILLS, Role } from "../role.skills";
import { matchSkills } from "../matcher.engine";
import { generateRecommendations } from "../recommendation.engine";

export const processResume = async (filePath: string, role: Role) => {
    const text = await extractTextFromPDF(filePath);

    const skills = extractSkills(text);

    const expectedSkills = ROLE_SKILLS[role];
    if (!expectedSkills) throw new Error("Invalid role");

    const skillMatch = matchSkills(expectedSkills, skills);
    const recommendations = generateRecommendations(skillMatch.missingSkills, role);

    return {
        text,
        skills,
        expectedSkills,
        skillMatch,
        recommendations,
    };
}