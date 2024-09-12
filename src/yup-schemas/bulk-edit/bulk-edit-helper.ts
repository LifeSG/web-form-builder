import isEmpty from "lodash/isEmpty";

export const getNonEmptyLines = (value: string): string[] => {
    return value.split("\n").filter((line) => !isEmpty(line));
};

export const getValidOption = (
    line: string
): { label: string; value: string } | null => {
    const parts = line.split("|").map((part) => part.trim());
    if (parts.length !== 2 || isEmpty(parts[0]) || isEmpty(parts[1])) {
        return null;
    }
    return { label: parts[0], value: parts[1] };
};
