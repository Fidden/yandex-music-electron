export default function useImage(url: string | undefined | null, width: number, height: number): string {
    if (!url || !url.length) {
        return require('../assets/img/track-placeholder.svg');
    }

    return `https://${url?.replace('%%', `${width}x${height}`)}`;
}
