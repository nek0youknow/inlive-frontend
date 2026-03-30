import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/auth/register',
                    '/client/search',
                ],
                disallow: [
                    '/api/',
                    '/auth/login',
                    '/client/',
                    '/manager/',
                    '/admin/',
                    '/auth/client/',
                    '/auth/manager/',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}

