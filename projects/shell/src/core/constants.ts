export const MICRO_FRONTS = {
    SHELL: {
        name: "shell",
        port: 4200,
        path: "", // Nombre carpeta en S3
    },
    AUTH: {
        name: "auth",
        port: 4201,
        path: "auth", // Nombre carpeta en S3
    },
    HOME: {
        name: "home",
        port: 4202,
        path: "home", // Nombre carpeta en S3
    },
};


export function getDomain(type: 'AUTH' | 'HOME'): string {
    const baseUrl = process.env["environmentUrl"];
    const isLocal = process.env["name"] === "local";
    const port = isLocal ? MICRO_FRONTS[type].port : MICRO_FRONTS[type].path;
    
    return isLocal ? `${baseUrl}:${port}` : `${baseUrl}/${port}`;
}