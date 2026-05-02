//basic implementation

export const matchSkills = (expected: string[], extracted: string[]) => {
    let count = 0;
    for(const i in expected){
        for(const j in extracted){
            if (i == j) count++;
        }
    }

    let percentMatch = (count/expected.length) * 100;

    return percentMatch + "%";
}