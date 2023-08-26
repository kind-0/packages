export function formatZapAmount(n: number): string {
  if (n >= 1000) {
    if (n % 1000 === 0) {
      return (n / 1000) + 'K';
    } else {
      return (n / 1000).toFixed(1) + 'K';
    }
  } else {
    return n.toString();
  }
}