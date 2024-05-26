import { Button } from "./button";

interface OpenSheetButtonProps {
  onOpen: () => void;
  btnLabel: string;
}

export const OpenSheetButton: React.FC<OpenSheetButtonProps> = ({
  btnLabel,
  onOpen,
}) => {
  return (
    <Button onClick={() => onOpen()} className="mt-4">
      {btnLabel}
    </Button>
  );
};
