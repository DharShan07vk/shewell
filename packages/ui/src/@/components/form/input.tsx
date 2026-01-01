import { cn } from "../../../lib/utils";

interface IUIFormInput extends React.InputHTMLAttributes<HTMLInputElement> {}

const UIFormInput = ({
  className,
  type,
  placeholder,
  ...props
}: IUIFormInput) => {
  return (
    <>
      <input
        style={{ border: "1px solid rgba(233,233,233, 1)" }}
        className={cn(
          " rounded-md placeholder:text-placeholder-color placeholder:font-inter placeholder:font-normal placeholder:text-sm  w-full py-3 pl-4 outline-primary ",
          className
        )}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
};

export default UIFormInput;
