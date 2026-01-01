"use client    ";
import { useState, MouseEvent, useRef, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

interface IUIInputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const UIFormPasswordInput = ({
  placeholder,
  ...props
}: IUIInputPasswordProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onEyeIconClick = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    setIsVisible(!isVisible);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        style={{ border: "1px solid rgba(233,233,233, 1)" }}
        className="rounded-md placeholder:text-placeholder-color placeholder:font-inter placeholder:font-normal placeholder:text-sm  w-full py-3 pl-4 outline-primary  "
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        {...props}
      />
      {!isVisible && (
        <Eye
          className="absolute top-3 right-4 text-primary lg:bottom-5"
          onClick={onEyeIconClick}
        />
      )}
      {isVisible && (
        <EyeOff
          className="absolute top-3  right-4 text-primary lg:bottom-5"
          onClick={onEyeIconClick}
        />
      )}
    </div>
  );
};

export default UIFormPasswordInput;
