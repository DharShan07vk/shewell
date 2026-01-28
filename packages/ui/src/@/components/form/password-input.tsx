"use client    ";
import { useState, MouseEvent, useRef, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

interface IUIInputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const UIFormPasswordInput = ({
  placeholder,
  className,
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
    <div className="relative w-full">
      <input
        ref={inputRef}
        className={`w-full rounded-md border border-gray-200 px-4 py-3 placeholder:font-inter placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary ${className}`}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        {...props}
      />
      {isVisible ? (
        <EyeOff
          className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary"
          onClick={onEyeIconClick}
        />
      ) : (
        <Eye
          className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary"
          onClick={onEyeIconClick}
        />
      )}
    </div>
  );
};

export default UIFormPasswordInput;
