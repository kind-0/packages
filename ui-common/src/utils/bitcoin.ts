export function nicelyFormattedMilliSatNumber(amount: number) {
    return nicelyFormattedSatNumber(
        Math.floor(amount / 1000)
    );
}

export function nicelyFormattedSatNumber(amount: number) {
    // if the number is less than 1000, just return it
    if (amount < 1000) return amount;

    // if the number is less than 1 million, return it with a k, if the comma is not needed remove it
    if (amount < 1000000) return `${(amount / 1000).toFixed(0)}k`;

    // if the number is less than 1 billion, return it with an m
    if (amount < 1000000000) return `${(amount / 1000000).toFixed(1)}m`;

    return `${(amount / 100_000_000).toFixed(2)} btc`;
}