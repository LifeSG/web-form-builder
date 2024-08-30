/// <reference types="react" />
import { ModalBoxProps } from "@lifesg/react-design-system/modal";
import { EModalType } from "src/context-providers";
interface IProps extends ModalBoxProps {
    type?: EModalType;
    onClose?: () => void;
}
export declare const GenericModal: ({ type, onClose, children, ...otherProps }: IProps) => JSX.Element;
export {};
