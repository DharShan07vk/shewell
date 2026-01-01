"use server";

import { db } from "~/server/db";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "~/app/lib/utils";
import { Button } from "@repo/ui/src/@/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@repo/ui/src/@/components/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/src/@/components/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/src/@/components/popover";
import { toast } from "@repo/ui/src/@/components/use-toast";
import SpecializationForm from "./specialization-form";
import { getServerSession } from "next-auth";
const Specialization = async () => {
  const session = await getServerSession();
  const preSpecialisations = await db.professionalUser.findUnique({
    select: {
      ProfessionalSpecializations: true,
    },
    where: {
      email: session?.user.email!,
    },
  });

  const specializations = await db.professionalSpecializations.findMany({
    select: {
      id: true,
      specialization: true,
    },
  });

  return (
    <>
      <SpecializationForm
        preSpecialisations={preSpecialisations?.ProfessionalSpecializations?.map(
          (a) => ({
            value: a.id,
            label: a.specialization,
          }),
        )}
        specializations={specializations.map((a) => ({
          value: a.id,
          label: a.specialization,
        }))}
      />
    </>
  );
};
export default Specialization;
