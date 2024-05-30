import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface IProps {
  handleQtyChange: (qty: number) => void;
  children: React.ReactNode;
  disabled: boolean;
}

const QtyChanger = ({ children, handleQtyChange, disabled }: IProps) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => {
          handleQtyChange(-1);
        }}
        className="rounded-full"
      >
        <Minus size={16} />
      </Button>
      <div>{children}</div>
      <Button
        onClick={() => {
          handleQtyChange(1);
        }}
        variant={"outline"}
        size={"icon"}
        disabled={disabled}
        className="rounded-full"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default QtyChanger;
