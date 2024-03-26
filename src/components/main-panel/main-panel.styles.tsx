import { Text } from "@lifesg/react-design-system/text";
import { MediaQuery } from "@lifesg/react-design-system/media";
import styled, { css } from "styled-components";

// =============================================================================
// STLE INTERFACES
// =============================================================================
interface IWrapperStyleProps {
    $mode: "expanded" | "minimised";
}

interface IElementItemWrapperProps extends IWrapperStyleProps {
    $size: "full" | "half";
}

// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div<IWrapperStyleProps>`
    position: relative;
    padding-bottom: 2rem;

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

export const EmptyDisplayWrapper = styled.div<IWrapperStyleProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100%;

    ${({ $mode }) => {
        switch ($mode) {
            case "expanded":
                return css`
                    ${MediaQuery.MaxWidth.desktop4k} {
                        grid-column: 4 / span 6;
                    }

                    ${MediaQuery.MaxWidth.desktopL} {
                        grid-column: 3 / span 9;
                    }

                    ${MediaQuery.MaxWidth.desktopM} {
                        grid-column: 3 / span 9;
                    }

                    /* To accommodate to desktops of 1024px */
                    ${MediaQuery.MaxWidth.tablet} {
                        grid-column: 2 / span 7;
                    }
                `;
            case "minimised":
                return css`
                    ${MediaQuery.MaxWidth.desktop4k} {
                        grid-column: 5 / span 7;
                    }

                    ${MediaQuery.MaxWidth.desktopL} {
                        grid-column: 6 / span 7;
                    }

                    ${MediaQuery.MaxWidth.desktopM} {
                        grid-column: 6 / span 7;
                    }

                    /* To accommodate to desktops of 1024px */
                    ${MediaQuery.MaxWidth.tablet} {
                        grid-column: 5 / span 4;
                    }
                `;
        }
    }}
`;

export const EmptyDisplayTitle = styled(Text.H3)`
    margin-top: 2rem;
`;

export const EmptyDisplayDescription = styled(Text.Body)`
    margin-top: 1rem;
`;

export const ElementsWrapper = styled.ul<IWrapperStyleProps>`
    list-style-type: none;
    display: grid;
    row-gap: 2rem;

    ${({ $mode }) => {
        switch ($mode) {
            case "expanded":
                return css`
                    ${MediaQuery.MaxWidth.desktop4k} {
                        grid-template-columns: repeat(6, minmax(0, 1fr));
                        column-gap: 2rem;
                    }

                    ${MediaQuery.MaxWidth.desktopL} {
                        grid-template-columns: repeat(8, minmax(0, 1fr));
                        column-gap: 2rem;
                    }

                    ${MediaQuery.MaxWidth.tablet} {
                        grid-template-columns: repeat(6, minmax(0, 1fr));
                        column-gap: 1.5rem;
                    }
                `;
            case "minimised":
                return css`
                    ${MediaQuery.MaxWidth.desktop4k} {
                        grid-template-columns: repeat(6, minmax(0, 1fr));
                        column-gap: 2rem;
                    }

                    ${MediaQuery.MaxWidth.tablet} {
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                        column-gap: 1.5rem;
                    }
                `;
        }
    }}
`;

export const ElementItemWrapper = styled.li<IElementItemWrapperProps>`
    ${({ $mode, $size }) => {
        switch ($mode) {
            case "expanded":
                return css`
                    ${MediaQuery.MaxWidth.desktop4k} {
                        grid-column: auto / span ${$size === "full" ? 6 : 3};
                    }

                    ${MediaQuery.MaxWidth.desktopL} {
                        grid-column: auto / span ${$size === "full" ? 8 : 4};
                    }

                    ${MediaQuery.MaxWidth.tablet} {
                        grid-column: auto / span ${$size === "full" ? 6 : 3};
                    }
                `;
            case "minimised":
                return css`
                    ${MediaQuery.MaxWidth.desktop4k} {
                        grid-column: auto / span ${$size === "full" ? 6 : 3};
                    }

                    ${MediaQuery.MaxWidth.tablet} {
                        grid-column: auto / span ${$size === "full" ? 4 : 2};
                    }
                `;
        }
    }}
`;
