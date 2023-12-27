export type TChatFormData = {
  prompt: string;
};

export interface IProps {
  disable?: boolean;
  onSubmit: (data: TChatFormData) => void;
  onSetSystem: (data: TChatFormData) => void;
  onReset?: () => void;
}
