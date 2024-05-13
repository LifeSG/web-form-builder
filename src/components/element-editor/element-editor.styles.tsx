import { Accordion } from "@lifesg/react-design-system/accordion";
import { Alert } from "@lifesg/react-design-system/alert";
import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

export const AccordionWrapper = styled(Accordion)`
    & > div:first-child {
        display: none;
    }
    border-top: 1px solid ${Color.Neutral[6]};
`;

export const SaveChangesAlert = styled(Alert)`
    height: 2.5rem;
    margin-bottom: 1rem;
`;
