import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    PlaceholderField,
    TextBasedPreselectedValueField,
    TypeField,
} from "../../common";

export const EmailBasicDetails = () => {
    return (
        <div data-testid="email-basic-details">
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
