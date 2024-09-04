import { useShouldShowField } from "src/context-providers";
import { EElementLabel } from "src/data";
import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    PlaceholderField,
    TextBasedPreselectedValueField,
    TypeField,
} from "../../common";
import { DefaultCountryCode } from "./default-country-code";
import { EnableClearButton } from "./enable-clear-button";

const fields = [
    { name: "type", component: TypeField },
    { name: "label", component: LabelField },
    { name: "required", component: MandatoryField },
    { name: "id", component: IdField },
    { name: "enableClearButton", component: EnableClearButton },
    { name: "defaultCountryCode", component: DefaultCountryCode },
    { name: "description", component: DescriptionField },
    { name: "placeholder", component: PlaceholderField },
    {
        name: "preselectedValue",
        component: TextBasedPreselectedValueField,
    },
];

export const ContactBasicDetails = () => {
    return (
        <div data-testid="contact-basic-details">
            {fields.map(({ name, component: Component }) => {
                const shouldShow = useShouldShowField(
                    name,
                    EElementLabel.CONTACT
                );
                return shouldShow && <Component key={name} />;
            })}
        </div>
    );
};
