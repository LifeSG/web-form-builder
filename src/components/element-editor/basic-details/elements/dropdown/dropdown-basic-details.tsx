import { useShouldShowField } from "src/context-providers";
import { EElementLabel } from "src/data";
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

const FIELDS = [
    { name: "type", component: TypeField },
    { name: "label", component: LabelField },
    { name: "required", component: MandatoryField },
    { name: "id", component: IdField },
    {
        name: "dropdownItems",
        fieldName: "dropdownItems",
        label: "Dropdown items",
        description:
            "Label is the item displayed to the users in the dropdown menu. Value is used to differentiate the dropdown items in the backend.",
        component: Options,
    },
    { name: "description", component: DescriptionField },
    { name: "placeholder", component: PlaceholderField },
    {
        name: "preselectedValue",
        fieldName: "dropdownItems",
        component: OptionPreselectedValue,
    },
];

export const DropdownBasicDetails = () => {
    return (
        <div data-testid="dropdown-basic-details">
            {FIELDS.map(({ name, component, ...remainingProps }) => {
                const shouldShow = useShouldShowField(
                    name,
                    EElementLabel.DROPDOWN
                );
                const Component: any = component;
                return (
                    shouldShow && <Component key={name} {...remainingProps} />
                );
            })}
        </div>
    );
};
