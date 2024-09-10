import { Pills } from "src/components/common/pills";
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
import { ResizableInput } from "./resizable-input";

const FIELDS = [
    { name: "type", component: TypeField },
    { name: "label", component: LabelField },
    { name: "required", component: MandatoryField },
    { name: "id", component: IdField },
    { name: "description", component: DescriptionField },
    { name: "resizable", component: ResizableInput },
    { name: "pills", component: Pills },
    { name: "placeholder", component: PlaceholderField },
    { name: "preselectedValue", component: TextBasedPreselectedValueField },
];

export const LongTextBasicDetails = () => {
    return (
        <div data-testid="long-text-basic-details">
            {FIELDS.map(({ name, component: Component }) => {
                const shouldShow = useShouldShowField(
                    name,
                    EElementLabel.TEXTAREA
                );
                return shouldShow && <Component key={name} />;
            })}
        </div>
    );
};
