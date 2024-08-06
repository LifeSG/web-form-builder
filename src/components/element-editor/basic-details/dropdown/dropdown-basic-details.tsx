import {
    Description,
    Id,
    Label,
    MandatoryField,
    Placeholder,
    Type,
} from "../common";
import { DropdownItems } from "./dropdown-items";
import { DropdownPreselectedValue } from "./dropdown-preselected-value";

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
            <DropdownPreselectedValue />
        </>
    );
};
