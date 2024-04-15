import { Accordion } from "@lifesg/react-design-system/accordion";
import styled from "styled-components";

export const AccordionWrapper = styled(Accordion)`
    & > div:first-child {
        display: none;
    }
`;
