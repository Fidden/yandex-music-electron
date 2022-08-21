export default function useConvertDuration(milliseconds: number): string {
    const date = new Date(0, 0, 0, 0, 0, 0, milliseconds);
    if (date.getHours() > 0) {
        return `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;
    } else {
        return `${date.getMinutes()}:${date.getSeconds() < 10
            ? `0${date.getSeconds()}`
            : date.getSeconds()}`;
    }
};
