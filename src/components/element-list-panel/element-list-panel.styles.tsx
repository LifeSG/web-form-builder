import { Text } from "@lifesg/react-design-system/text";
import { MediaQuery } from "@lifesg/react-design-system/media";
import styled, { css } from "styled-components";

// =============================================================================
// STLE INTERFACES
// =============================================================================
interface IWrapperStyleProps {
    $mode: "expanded" | "minimised";
}

// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div<IWrapperStyleProps>`
    position: relative;
    border: 1px dashed grey; // TODO: Remove when styled

    ${({ $mode }) => {
        switch ($mode) {
            case "expanded":
                return css`
                    ${MediaQuery.MaxWidth.desktop4k} {
                        grid-column: 4 / span 6;
                    }

                    ${MediaQuery.MaxWidth.desktopL} {
                        grid-column: 3 / span 8;
                    }

                    ${MediaQuery.MaxWidth.desktopM} {
                        grid-column: 3 / span 8;
                    }

                    /* To accommodate to desktops of 1024px */
                    ${MediaQuery.MaxWidth.tablet} {
                        grid-column: 2 / span 6;
                    }
                `;
            case "minimised":
                return css`
                    ${MediaQuery.MaxWidth.desktop4k} {
                        grid-column: 5 / span 6;
                    }

                    ${MediaQuery.MaxWidth.desktopL} {
                        grid-column: 6 / span 6;
                    }

                    ${MediaQuery.MaxWidth.desktopM} {
                        grid-column: 6 / span 6;
                    }

                    /* To accommodate to desktops of 1024px */
                    ${MediaQuery.MaxWidth.tablet} {
                        grid-column: 5 / span 4;
                    }
                `;
        }
    }}
`;

export const EmptyDisplay = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100%;
`;

export const EmptyDisplayTitle = styled(Text.H3)`
    margin-top: 2rem;
`;

export const EmptyDisplayDescription = styled(Text.Body)`
    margin-top: 1rem;
`;
