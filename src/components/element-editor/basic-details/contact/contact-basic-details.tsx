import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    PlaceholderField,
    TextBasedPreselectedValueField,
    TypeField,
} from "../common";

export const ContactBasicDetails = () => {
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
