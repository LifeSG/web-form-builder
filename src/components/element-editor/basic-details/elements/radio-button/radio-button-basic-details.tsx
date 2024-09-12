import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    OptionPreselectedValue,
    PlaceholderField,
    TypeField,
} from "../../common";
import { RadioButtonItems } from "./radio-button-items";

export const RadioButtonBasicDetails = () => {
    return (
        <div data-testid="dropdown-basic-details">
            <TypeField />
            <LabelField />
            <MandatoryField />
            <RadioButtonItems />
            <IdField />
            <DescriptionField />
            <PlaceholderField />
            <OptionPreselectedValue fieldName="radioItems" />
        </div>
    );
};
