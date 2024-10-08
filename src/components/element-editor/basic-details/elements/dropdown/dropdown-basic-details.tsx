import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    OptionPreselectedValue,
    PlaceholderField,
    TypeField,
} from "../../common";
import { DropdownItems } from "./dropdown-items";

export const DropdownBasicDetails = () => {
    return (
        <div data-testid="dropdown-basic-details">
            <TypeField />
            <LabelField />
            <MandatoryField />
            <DropdownItems />
            <IdField />
            <DescriptionField />
            <PlaceholderField />
            <OptionPreselectedValue fieldName="dropdownItems" />
        </div>
    );
};
