export function formatDecimalsRounded(value: number, roundDown: boolean = false): number {
    const roundedValue = roundDown ? Math.floor(value) : Math.round(value * 10) / 10;
    return roundedValue;
}