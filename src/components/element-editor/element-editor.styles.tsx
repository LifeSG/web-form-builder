import { Accordion } from "@lifesg/react-design-system/accordion";
import { Alert } from "@lifesg/react-design-system/alert";
import styled from "styled-components";

export const AccordionWrapper = styled(Accordion)`
    & > div:first-child {
        display: none;
    }
`;

export const SaveChangesAlert = styled(Alert)`
    height: 2.5rem;
    margin-bottom: 1rem;
`;
