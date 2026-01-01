import React from "react";
import { cn } from "../../../../../../packages/ui/src/lib/utils";
import "quill/dist/quill.snow.css";

const QuillHtml = ({
  body,
  className,
}: {
  body: string;
  className?: string | undefined;
}) => {
  return (
    <div
      className={cn(" ", className)}
      dangerouslySetInnerHTML={{ __html: body }}
    ></div>
  );
};

export default QuillHtml;
