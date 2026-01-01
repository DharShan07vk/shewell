"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/src/@/components/dialog";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";

const SearchDialog = ({
  openSearchDialog,
  setOpenSearchDialog,
}: {
  openSearchDialog: boolean;
  setOpenSearchDialog: (value: boolean) => void;
}) => {
  const [inputSearch, setInputSearch] = useState<string>("");
  console.log("input search", inputSearch);

  const { data, refetch } =
    api.findDoctorsBasedOnSearch.findDoctorsBasedOnSearch.useQuery({
      inputSearch: inputSearch,
    });
  console.log("doctors from search", data);

  return (
    <>
      <Dialog onOpenChange={setOpenSearchDialog} open={openSearchDialog}>
        <DialogContent className="w-[90%] max-w-[700px] pt-10">
          <div className="relative">
            <input
              value={inputSearch}
              onChange={(e) => {
                setInputSearch(e.target.value);
                refetch();
              }}
              className="w-full rounded-lg border-[1px] border-black  py-2 pl-[38px] font-inter text-sm font-normal leading-[20px] placeholder:text-black lg:gap-[25px]"
              placeholder="Search"
            />
            <div className="absolute left-2 top-2">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="8.70263"
                  cy="9.20869"
                  rx="7.59325"
                  ry="7.53022"
                  stroke="black"
                  strokeWidth="1.20637"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.9922 15.7063L17.7736 19.4563"
                  stroke="black"
                  strokeWidth="1.20637"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {data && data.doctors.length > 0 ? (
            <div className="flex flex-col gap-2">
              {data.doctors.map((item) => (
                <Link
                  key={item.id}
                  href={`/doctor-profile/${item.userName}`}
                  onClick={() => {
                    setOpenSearchDialog(false);
                    setInputSearch("");
                  }}
                >
                  <div className="flex cursor-pointer gap-1 rounded-md bg-slate-200 px-5 py-1 text-sm text-inactive">
                    {item.firstName}
                  </div>
                </Link>
              ))}
            </div>
          ) : inputSearch.length < 0 || inputSearch === "" ? (
            <div className="pl-5 text-sm text-inactive">
              Please type something to fetch the doctors...
            </div>
          ) : (
            <div className="pl-5 text-sm text-inactive">No results found</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SearchDialog;
