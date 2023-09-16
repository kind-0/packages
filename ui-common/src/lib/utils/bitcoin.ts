export function nicelyFormattedMilliSatNumber(amount: number) {
    return nicelyFormattedSatNumber(
        Math.floor(amount / 1000)
    );
}

export function nicelyFormattedSatNumber(amount: number) {
    // if the number is less than 1000, just return it
    if (amount < 1000) return amount;

    // if the number is less than 1 million, return it with a k, if the comma is not needed remove it
    if (amount < 1_000_000) return `${(amount / 1000).toFixed(0)}k`;

    // if the number is less than 10 million, return it with an m
    if (amount < 10_000_000) {
        let val =`${(amount / 1000000).toFixed(1)}M`;
        if (val.endsWith('.0M')) val = `${(amount / 1000000).toFixed(0)}M`;
        return val;
    }

    return `${(amount / 100_000_000).toFixed(2)} btc`;
}