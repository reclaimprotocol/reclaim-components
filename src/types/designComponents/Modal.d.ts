import { type ReactElement, type RefObject, type HTMLProps } from 'react';
export interface modalHeaderCustomConfig {
  text?: string;
  style?: object;
}

export interface ModalHeaderProps {
  heading: string;
  onClose?: () => void;
  modalHeaderCustomConfig?: modalHeaderCustomConfig;
}

export interface ModalProps extends HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
  id?: string;
  className?: string;
  modalHeaderCustomConfig?: modalHeaderCustomConfig;
}

export interface StyledModalRef {
  ref: RefObject<HTMLDivElement>;
}

export interface ModalHeaderRef {
  ref: RefObject<HTMLDivElement>;
}

export interface DefaultModalStyles {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
}
