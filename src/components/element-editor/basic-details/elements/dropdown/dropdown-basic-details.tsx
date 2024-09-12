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

export const DropdownBasicDetails = () => {
    return (
        <div data-testid="dropdown-basic-details">
            <TypeField />
            <LabelField />
            <MandatoryField />
            <Options
                label="Dropdown items"
                description="Label is the item displayed to the users in the dropdown menu. Value is used to differentiate the dropdown items in the backend."
                fieldName="dropdownItems"
            />
            <IdField />
            <DescriptionField />
            <PlaceholderField />
            <OptionPreselectedValue fieldName="dropdownItems" />
        </div>
    );
};
