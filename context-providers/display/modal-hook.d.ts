import { EModalType, TModalProps } from "./types";
export declare const useModal: () => {
    modals: TModalProps[];
    showModal: (modal: TModalProps) => void;
    hideModal: (type?: EModalType) => void;
    discardChanges: () => void;
};
