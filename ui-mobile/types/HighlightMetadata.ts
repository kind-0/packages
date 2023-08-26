export type HighlightMetadata = {
    id: string;
    author: string;
    dateCreated: number;
    title: string;
    preview: string;
    stars: number;
    zaps: number;
    marginNotes: string
    commentsList?: { author: string }[]
};