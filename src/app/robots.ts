import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots{
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/privacy-policy", "/test-result", "/preview-test", "/api"]
            }
        ]
    }
}