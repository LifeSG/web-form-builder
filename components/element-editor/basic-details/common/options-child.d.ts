interface IProps {
    onDelete: () => void;
    id: string;
    index: number;
    fieldName: "radioItems" | "dropdownItems";
}
export declare const OptionsChild: ({ onDelete, id, index, fieldName }: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
