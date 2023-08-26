import { DateTime } from "luxon";
import { formatDecimalsRounded } from "./formatDecimalsRounded";

export function formatDateCreated(millisBefore: number): string {
    const millisNow = DateTime.now().toMillis();
    const millisDiff = millisNow - millisBefore;

    const years = millisDiff / (365 * 24 * 60 * 60 * 1000);
    if (years >= 1) {
        return `${formatDecimalsRounded(years, true)}y`;
    }

    const months = millisDiff / (30 * 24 * 60 * 60 * 1000);
    if (months >= 1) {
        return `${formatDecimalsRounded(months, true)}mo`;
    }

    const days = millisDiff / (24 * 60 * 60 * 1000);
    if (days >= 1) {
        return `${formatDecimalsRounded(days, true)}d`;
    }

    const hours = millisDiff / (60 * 60 * 1000);
    if (hours >= 1) {
        return `${formatDecimalsRounded(hours, true)}h`;
    }

    const minutes = millisDiff / (60 * 1000);
    if (minutes >= 1) {
        return `${formatDecimalsRounded(minutes, true)}m`;
    }

    return 'just now';
}