/// <reference types="react" />
interface IOptionsProps {
    label: string;
    description: string;
    fieldName: "radioItems" | "dropdownItems";
}
export declare const Options: ({ label, description, fieldName }: IOptionsProps) => JSX.Element;
export {};
