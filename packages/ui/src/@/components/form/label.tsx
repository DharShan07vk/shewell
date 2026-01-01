import { cn } from "../../../lib/utils";

interface IUILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const UIFormLabel = ({ children, className, ...props }: IUILabelProps) => {
  return (
    <>
      <label
        className={cn(
          "font-poppins font-normal text-base text-black-300  mb-2 block",
          className
        )}
        {...props}
      >
        {children}
      </label>
    </>
  );
};
export default UIFormLabel;
