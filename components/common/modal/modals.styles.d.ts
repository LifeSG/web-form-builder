/// <reference types="react" />
export declare const ScrollableModal: import("styled-components").StyledComponent<(({ id, show, animationFrom, children, enableOverlayClick, rootComponentId, zIndex, onOverlayClick, dismissKeyboardOnShow, ...otherProps }: import("@lifesg/react-design-system/modal").ModalProps) => JSX.Element) & {
    Box: ({ id, children, onClose, showCloseButton, ...otherProps }: import("@lifesg/react-design-system/modal").ModalBoxProps) => any;
}, any, {}, never>;
export declare const ButtonWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ActionButton: import("styled-components").StyledComponent<(props: import("@lifesg/react-design-system/button").ButtonProps & import("react").RefAttributes<HTMLButtonElement>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, any, {}, never>;
export declare const ModalDisplayTitle: import("styled-components").StyledComponent<"h3", any, import("@lifesg/react-design-system/text").TextProps, never>;
