import styled, { css } from "styled-components";

export const Spacer = styled.div<{ $width?: string }>`
    ${({ $width }) =>
        $width
            ? css`
                  width: ${$width};
              `
            : css`
                  flex: 1;
              `}
`;
