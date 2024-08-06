import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    PlaceholderField,
    TextBasedPreselectedValueField,
    TypeField,
} from "../common";

export const TextBasicDetails = () => {
    return (
        <>
            <TypeField />
            <LabelField />
            <MandatoryField />
            <IdField />
            <DescriptionField />
            <PlaceholderField />
            <TextBasedPreselectedValueField />
        </>
    );
};
