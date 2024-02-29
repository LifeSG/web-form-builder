import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

export const BasePanelWrapper = styled.div<{ $isCollapsed: boolean }>`
    height: 100%;
    width: 589px;
    min-width: 20vw;
    transform: ${({ $isCollapsed }) => $isCollapsed && "translateX(85%)"};
    background: ${Color.Neutral[8]};
    border-left: 1px solid ${Color.Neutral[5]};
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0px 2px 12px 0px rgba(104, 104, 104, 0.25);
`;

export const BasePanelHeaderWrapper = styled.div`
    grid-column: 2 / span 1;
    max-height: 5.75rem;
    display: flex;
    align-items: center;
    width: auto;
    gap: 2rem;
    padding: 2rem;
    border-bottom: 1px solid ${Color.Neutral[5]};
`;

export const BasePanelBody = styled.div`
    padding: 2rem 2rem 0 0;
    flex: 1;
`;

export const BasePanelContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: scroll;
`;
