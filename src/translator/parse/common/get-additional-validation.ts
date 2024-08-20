import { IYupValidationRule } from "@lifesg/web-frontend-engine";

export const getAdditionalValidation = (validation: IYupValidationRule[]) => {
    return (
        validation?.filter(
            (rule) => !Object.prototype.hasOwnProperty.call(rule, "required")
        ) || []
    );
};
