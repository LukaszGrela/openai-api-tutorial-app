export type TChatFormData = {
  prompt: string;
  isSilly?: boolean;
};

export interface IProps {
  disable?: boolean;
  onSubmit: (data: TChatFormData) => void;
  onSetSystem: (data: TChatFormData) => void;
  onReset?: () => void;
}
