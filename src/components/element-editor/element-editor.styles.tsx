import { Accordion } from "@lifesg/react-design-system/accordion";
import { Alert } from "@lifesg/react-design-system/alert";
import styled from "styled-components";

export const AccordionWrapper = styled(Accordion)`
    margin-top: 1rem;
    & > div:first-child {
        display: none;
    }
`;

export const SaveChangesAlert = styled(Alert)`
    margin: 1rem;
`;
