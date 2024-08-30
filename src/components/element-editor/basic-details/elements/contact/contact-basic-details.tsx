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

export const ContactBasicDetails = () => {
    return (
        <div data-testid="contact-basic-details">
            <TypeField />
            <LabelField />
            <MandatoryField />
            <IdField />
            <EnableClearButton />
            <DefaultCountryCode />
            <DescriptionField />
            <PlaceholderField />
            <TextBasedPreselectedValueField />
        </div>
    );
};
