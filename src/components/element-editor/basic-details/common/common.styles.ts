import { Form } from "@lifesg/react-design-system/form";
import styled from "styled-components";

export const MandatoryFieldBox = styled.div`
    background: rgba(248, 248, 248, 1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

export const StyledTextarea = styled(Form.Textarea)`
    min-height: 40px;
    overflow: hidden;
`;
