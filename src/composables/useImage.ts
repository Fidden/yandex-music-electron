export default function useImage(url: string | undefined | null, width: number, height: number): string {
    return `https://${url?.replace('%%', `${width}x${height}`)}`;
}
