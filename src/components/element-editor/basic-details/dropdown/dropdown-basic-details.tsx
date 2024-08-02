import {
    Description,
    Id,
    Label,
    MandatoryField,
    Placeholder,
    Type,
} from "../common";
import { DropdownItems } from "./dropdown-items";
import { PreselectedValueDropdown } from "./preselected-value-dropdown";

export const DropdownBasicDetails = () => {
    return (
        <>
            <Type />
            <Label />
            <MandatoryField />
            <Id />
            <DropdownItems />
            <Description />
            <Placeholder />
            <PreselectedValueDropdown />
        </>
    );
};
