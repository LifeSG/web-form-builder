import { Color } from "@lifesg/react-design-system/color";
import { Form } from "@lifesg/react-design-system/form";
import styled from "styled-components";

interface IDeleteButtonProps {
    $disable: boolean;
}

export const PillFieldsWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 0.5rem;

    & > * {
        width: 100%;
        margin-bottom: 1rem;
    }
    svg {
        color: ${Color.Accent.Light[1]};
        height: 1.625rem;
        width: 1.522rem;
        cursor: pointer;
        align-self: center;
    }
`;

export const PrefillItemInput = styled(Form.Input)`
    margin: 0;
`;

export const DeleteButton = styled.div<IDeleteButtonProps>`
    align-self: center;
    svg {
        color: ${({ $disable }) =>
            $disable ? Color.Neutral[3] : Color.Accent.Light[1]};
        width: 1.522rem;
        height: 1.625rem;
        cursor: ${({ $disable }) => ($disable ? "not-allowed" : "pointer")};
    }
`;

// export const DropdownItemsChildWrapper = styled.div`
//     display: flex;
//     align-items: start;
//     justify-content: center;
//     margin-bottom: 1rem;
//     & > *:nth-child(1) {
//         margin-right: 0.5rem;
//     }
//     & > *:nth-child(2) {
//         margin-right: 1rem;
//     }
//     & > *:nth-child(3) {
//         margin-right: 1rem;
//     }
//     & > * {
//         margin-bottom: 0 !important;
//     }
// `;

// export const DropdownItemsDragHandleButton = styled.div`
//     margin-top: 0.875rem;
//     svg {
//         color: ${Color.Accent.Light[1]};
//         width: 1.25rem;
//         height: 1.25rem;
//         align-items: center;
//         cursor: grab;
//     }
// `;
