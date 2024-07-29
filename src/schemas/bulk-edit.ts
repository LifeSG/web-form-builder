import isEmpty from "lodash/isEmpty";
import * as Yup from "yup";
import { getNonEmptyLines, getValidDropdownItem } from "./bulk-edit-helper";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const validateFormat = (value: string): boolean => {
    /** Allow bulk edit form to be left empty */
    if (isEmpty(value)) return true;

    const lines = getNonEmptyLines(value);
    return lines.every((line) => getValidDropdownItem(line));
};
// =============================================================================
// SCHEMA
// =============================================================================

export const BULK_EDIT_SCHEMA = Yup.object().shape({
    items: Yup.string().test(
        "validate-format",
        'Incorrect format. Check that all labels and values are filled and separated with "|".',
        validateFormat
    ),
});

export type TBulkEditData = Yup.InferType<typeof BULK_EDIT_SCHEMA>;
