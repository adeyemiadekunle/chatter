import { ParagraphOutput } from 'editorjs-react-renderer'

interface TextTrimmingWithEllipsisProps {
    text: string;
    maxLength: number;
    
}

interface TextTrimmingWithEllipsisProps {
    text: string;
    maxLength: number;
}

const TextTrimmingWithEllipsis = ({ text, maxLength }: TextTrimmingWithEllipsisProps) => {
    const trimTextWithEllipsis = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        } else {
            let trimmedText = text.slice(0, maxLength);
            const lastSpaceIndex = trimmedText.lastIndexOf(' ');
            if (lastSpaceIndex !== -1) {
                trimmedText = trimmedText.slice(0, lastSpaceIndex);
            }
            return trimmedText + '...';
        }
    };

    const trimmedText = trimTextWithEllipsis(text, maxLength);

    return <ParagraphOutput data={{ text: trimmedText }} />;
};

export default TextTrimmingWithEllipsis;
