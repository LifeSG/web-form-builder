import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    OptionPreselectedValue,
    Options,
    PlaceholderField,
    TypeField,
} from "../../common";

export const RadioButtonBasicDetails = () => {
    return (
        <div data-testid="dropdown-basic-details">
            <TypeField />
            <LabelField />
            <MandatoryField />
            <Options
                label="List items"
                description="Label is the item displayed to the users in the dropdown menu. Value is used to differentiate the dropdown items in the backend."
                fieldName="radioItems"
            />
            <IdField />
            <DescriptionField />
            <PlaceholderField />
            <OptionPreselectedValue fieldName="radioItems" />
        </div>
    );
};
