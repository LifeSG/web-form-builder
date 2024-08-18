import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    PlaceholderField,
    TextBasedPreselectedValueField,
    TypeField,
} from "../../common";

export const ContactBasicDetails = () => {
    return (
        <div data-testid="contact-basic-details">
            <TypeField />
            <LabelField />
            <MandatoryField />
            <IdField />
            <DescriptionField />
            <PlaceholderField />
            <TextBasedPreselectedValueField />
        </div>
    );
};
