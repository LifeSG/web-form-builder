import { Color } from "@lifesg/react-design-system/color";
import { Form } from "@lifesg/react-design-system/form";
import styled from "styled-components";

interface IDeleteButtonProps {
    $disable: boolean;
}

export const PillFieldsWrapper = styled.div`
    display: flex;
    width: 100%;
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
        margin-right: 0.468rem;
    }
`;

export const PrefillItemInput = styled(Form.Input)`
    margin: 0;
`;

export const DeleteButton = styled.div<IDeleteButtonProps>`
    align-self: center;
    width: auto;
    margin-left: 0.937rem;
    margin-bottom: 0.6rem;
    svg {
        color: ${({ $disable }) =>
            $disable ? Color.Neutral[3] : Color.Accent.Light[1]};
        width: 1.522rem;
        height: 1.625rem;
        cursor: pointer;
    }
`;
