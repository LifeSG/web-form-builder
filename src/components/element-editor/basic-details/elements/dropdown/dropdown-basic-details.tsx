import { useShouldShowField } from "src/context-providers";
import { EElementLabel } from "src/data";
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

const FIELDS = [
    { name: "type", component: TypeField },
    { name: "label", component: LabelField },
    { name: "required", component: MandatoryField },
    { name: "id", component: IdField },
    { name: "dropdownItems", component: DropdownItems },
    { name: "description", component: DescriptionField },
    { name: "placeholder", component: PlaceholderField },
    {
        name: "preselectedValue",
        component: DropdownPreselectedValue,
    },
];

export const DropdownBasicDetails = () => {
    return (
        <div data-testid="dropdown-basic-details">
            {FIELDS.map(({ name, component: Component }) => {
                const shouldShow = useShouldShowField(
                    name,
                    EElementLabel.DROPDOWN
                );
                return shouldShow && <Component key={name} />;
            })}
        </div>
    );
};
