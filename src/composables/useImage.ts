export default function useImage(url: string, width: number, height: number): string {
    return `https://${url?.replace('%%', `${width}x${height}`)}`;
}
