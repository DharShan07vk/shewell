"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/src/@/components/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import DoctorCommentUserAction from "./doctor-comment-user-action";
import React from "react";

const schema = z.object({
  comment: z.string({ required_error: "Please enter the comment" }),
});

const DoctorCommentForm = ({
  bookAppointmentId,
}: {
  bookAppointmentId: string;
}) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("data", data);
    const comments = data.comment;
    DoctorCommentUserAction({ comments, bookAppointmentId })
      .then(() => {
        reset({ comment: "" });
      })
      .catch((err) => console.log("error", err));
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="font-inter text-sm font-medium text-active">
            Add Comment
          </div>
          <div>
            <Controller
              control={control}
              name="comment"
              render={({ field }) => {
                return (
                  <>
                    <textarea
                      value={field.value}
                      onChange={field.onChange}
                      className=" w-full rounded-[5px] border border-border-color p-[17px] font-inter text-sm font-medium text-inactive outline-border-color placeholder:font-inter placeholder:text-sm placeholder:font-medium placeholder:text-inactive"
                      placeholder="eg: Patient has improvement from previous appointment"
                    />
                    {errors && errors.comment && (
                      <p className="text-red-500">{errors.comment?.message}</p>
                    )}
                  </>
                );
              }}
            />
          </div>
          <div className="flex gap-[29px] self-end">
           
            <Button className="bg-primary px-4 py-2 font-inter text-base  font-medium text-white hover:bg-secondary">
              Comment
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
export default DoctorCommentForm;
