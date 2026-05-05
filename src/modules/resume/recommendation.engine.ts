type Role = "backend" | "frontend";

const SKILLS_RECOMMENDATIONS: Record<Role, Record<string, string>> = {
    //ddefault messages, later add proper.
    backend: {
        "redis": "Learn Redis for caching and improving backend performance",
        "docker": "Learn Docker to containerize applications and improve deployment consistency",
        "aws": "Gain familiarity with AWS for cloud deployment and scalability",
        "postgresql": "Strengthen your PostgreSQL knowledge including indexing and query optimization",
        "node.js": "Deepen Node.js understanding including event loop and async patterns",
        "express": "Build REST APIs with Express and understand middleware patterns"
    },
    frontend: {
        "react": "Learn React for building dynamic user interfaces and component-based architecture",
        "next.js": "Explore Next.js for server-side rendering and static site generation",
        "html": "Master HTML5 semantics and accessibility best practices",
        "css": "Enhance CSS skills with Flexbox, Grid, and responsive design techniques",
        "javascript": "Deepen JavaScript knowledge including ES6+ features and asynchronous programming",
        "typescript": "Gain proficiency in TypeScript for type safety and improved code maintainability"
    }

};

export const generateRecommendations = (missingSkills: string[], role: Role) => {
    const recommendations: string[] = [];

    const skillsRecommended = SKILLS_RECOMMENDATIONS[role];

    for(const skill of missingSkills){
        if(skillsRecommended[skill]){
            recommendations.push(skillsRecommended[skill]);
        }else{
            recommendations.push(`Consider Learning ${skill}`)
        }
    }

    return recommendations;
}