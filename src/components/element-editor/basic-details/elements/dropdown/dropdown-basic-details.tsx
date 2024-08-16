import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    PlaceholderField,
    TypeField,
} from "../../common";
import { DropdownItems } from "./dropdown-items";
import { DropdownPreselectedValue } from "./dropdown-preselected-value-field";

export const DropdownBasicDetails = () => {
    return (
        <div data-testid="dropdown-basic-details">
            <TypeField />
            <LabelField />
            <MandatoryField />
            <IdField />
            <DropdownItems />
            <DescriptionField />
            <PlaceholderField />
            <DropdownPreselectedValue />
        </div>
    );
};
