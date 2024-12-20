import { EyeIcon, EyeOff, Pen, Trash } from "lucide-react";

type ActionRowProps = {
  allowDisabled: boolean;
  allowDeleted: boolean;
  allowEdit: boolean;
  disabledRecord: boolean;
  handleOnEdit: () => void;
  handleOnDelete: () => void;
  handleOnDisabled: () => void;
  children: React.ReactNode;
};

export default function ActionRow({
  allowDisabled = true,
  allowDeleted = true,
  allowEdit = true,
  disabledRecord = false,
  handleOnDelete = () => {},
  handleOnDisabled = () => {},
  handleOnEdit = () => {},
  children,
}: Partial<ActionRowProps>) {
  return (
    <div className="flex gap-1">
      {children && children}
      {allowEdit && (
        <button
          className="bg-warning rounded-full p-[0.3rem]"
          onClick={handleOnEdit}
        >
          <Pen size={20} />
        </button>
      )}
      {allowDisabled && (
        <button
          className="bg-primary hover:bg-primary-dark rounded-full p-[0.3rem]"
          onClick={handleOnDisabled}
        >
          {disabledRecord ? (
            <EyeIcon size={20} color="white" />
          ) : (
            <EyeOff size={20} color="white" />
          )}
        </button>
      )}
      {allowDeleted && (
        <button
          className="bg-danger hover:bg-danger-dark rounded-full p-[0.3rem]"
          onClick={handleOnDelete}
        >
          <Trash size={20} color="white" />
        </button>
      )}
    </div>
  );
}
