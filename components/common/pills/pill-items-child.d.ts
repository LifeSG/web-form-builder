/// <reference types="react" />
interface IProps {
    id: string;
    index: number;
    onDelete: () => void;
    disableDelete: boolean;
}
export declare const PillItemsChild: ({ id, index, onDelete, disableDelete, }: IProps) => JSX.Element;
export {};
