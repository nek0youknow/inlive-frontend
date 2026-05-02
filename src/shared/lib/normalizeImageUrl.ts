const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL || "http://63.178.189.113:8889";
const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_GET_FILES_URL || "http://inlive-file-manager:8888";

export function normalizeImageUrl(url?: string): string {
    if (!url) return "/placeholder.jpg";

    // Railway proxy form:
    // https://<host>/accommodation-images/retrieve/files/<originalUrl>
    // We want to return <originalUrl> (e.g. https://picsum.photos/...)
    const marker = "/accommodation-images/retrieve/files/";
    const markerIndex = url.indexOf(marker);
    if (markerIndex !== -1) {
        const original = url.slice(markerIndex + marker.length);
        try {
            return decodeURIComponent(original);
        } catch {
            return original;
        }
    }

    if (url.startsWith(INITIAL_URL) || url.startsWith(BUCKET_URL)) {
        return url.replace(/^http?:\/\/[^/]+/, BUCKET_URL);
    }

    return url;
}
