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

const fields = [
    { name: "type", component: TypeField },
    { name: "label", component: LabelField },
    { name: "required", component: MandatoryField },
    { name: "id", component: IdField },
    { name: "description", component: DescriptionField },
    { name: "placeholder", component: PlaceholderField },
    {
        name: "preselectedValue",
        component: TextBasedPreselectedValueField,
    },
];

export const NumericBasicDetails = () => {
    return (
        <div data-testid="numeric-basic-details">
            {fields.map(({ name, component: Component }) => {
                const shouldShow = useShouldShowField(
                    name,
                    EElementLabel.NUMERIC
                );
                return shouldShow && <Component key={name} />;
            })}
        </div>
    );
};
