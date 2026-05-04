//updated implementation

export const matchSkills = (expected: string[], extracted: string[]) => {
    let matchedSkills = [];
    let missingSkills = [];
    
    for (const i of expected) {
        if (extracted.find(j => j === i)) {
            matchedSkills.push(i);
        } else {
            missingSkills.push(i);
        }

    }

    let percentMatch = (matchedSkills.length / expected.length) * 100;

    //returning structured data;
    return{
        matchScore: percentMatch,
        matchedSkills,
        missingSkills,
    }; 
}