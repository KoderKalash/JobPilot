//refined implementation

export const matchSkills = (expected: string[], extracted: string[]) => {
    const extractedSet = new Set(extracted);
    let matchedSkills: string[] = [];
    let missingSkills: string[] = [];

    for (const skill of expected) {
        if (extractedSet.has(skill)) {
            matchedSkills.push(skill);
        } else {
            missingSkills.push(skill);
        }

    }

    let matchScore = expected.length === 0 ? 0 : Math.round((matchedSkills.length / expected.length) * 100);

    //returning structured data;
    return {
        matchScore,
        matchedSkills,
        missingSkills,
    };
}