import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    PlaceholderField,
    TypeField,
} from "../common";
import { DropdownItems } from "./dropdown-items";
import { DropdownPreselectedValue } from "./dropdown-preselected-value-field";

export const DropdownBasicDetails = () => {
    return (
        <>
            <TypeField />
            <LabelField />
            <MandatoryField />
            <IdField />
            <DropdownItems />
            <DescriptionField />
            <PlaceholderField />
            <DropdownPreselectedValue />
        </>
    );
};
