export function prettifyKey(key: string) {
    switch (key.toLowerCase()) {
        case 'meta':
            return '⌘';
        case 'ctrl':
        case 'control':
            return '^';
        case 'shift':
            return '⇧';
        case 'alt':
            return '⌥';
        case 'enter':
            return '↵';
        default:
            return key.toUpperCase();
    }
}