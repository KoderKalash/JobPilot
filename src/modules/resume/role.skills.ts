type Role = "backend" | "frontend";

export const ROLE_SKILLS: Record<Role, string[]> = {
    backend: [
        "node.js",
        "express",
        "postgresql",
        "mongodb",
        "redis",
        "docker",
        "aws"
    ],
    frontend: [
        "javascript",
        "typescript",
        "react",
        "next.js",
        "html",
        "css"
    ]
};
