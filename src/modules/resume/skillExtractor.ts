const SKILL_KEYWORDS = [
    "javascript",
    "mongodb",
    "nodejs",
    "expressjs",
    "postgresql",
    "typescript",
    "react",
    "nextjs",
    "docker",
    "redis",
    "aws",
];

export const extractSkills = (text: string): string[] =>{
    const lowerText = text.toLowerCase();

    const foundSkills = SKILL_KEYWORDS.filter(skill => lowerText.includes(skill));

    return foundSkills;
};