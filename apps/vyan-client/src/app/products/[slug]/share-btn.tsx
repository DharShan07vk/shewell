import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/src/@/components/popover";
import {
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
    EmailShareButton,
    EmailIcon,
    TelegramShareButton,
    TelegramIcon
  } from "react-share";
export function ShareIcons({url}: {url:string}){
  const shareUrl = process.env.NEXT_PUBLIC_URL + url
    return(
        <>
        <div className="flex flex-col gap-2 -z-10">
            <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={35} round={true}/>
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={35} round={true}/>
            </WhatsappShareButton >
            <EmailShareButton url={shareUrl}>
              <EmailIcon size={35} round={true}/>
            </EmailShareButton>
            <TelegramShareButton url={shareUrl}>
              <TelegramIcon size={35} round={true}/>
            </TelegramShareButton>
        </div>
        </>
    )
}
export default function ShareButton({pathname}:{pathname: string}) {
  return(
    <>
    <Popover>
    <PopoverTrigger>
      {" "}
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5 7.33325C18.0188 7.33325 19.25 6.10204 19.25 4.58325C19.25 3.06447 18.0188 1.83325 16.5 1.83325C14.9812 1.83325 13.75 3.06447 13.75 4.58325C13.75 6.10204 14.9812 7.33325 16.5 7.33325Z"
          stroke="black"
          stroke-width="0.916667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.5 13.75C7.01878 13.75 8.25 12.5188 8.25 11C8.25 9.48122 7.01878 8.25 5.5 8.25C3.98122 8.25 2.75 9.48122 2.75 11C2.75 12.5188 3.98122 13.75 5.5 13.75Z"
          stroke="black"
          stroke-width="0.916667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.5 20.1667C18.0188 20.1667 19.25 18.9355 19.25 17.4167C19.25 15.898 18.0188 14.6667 16.5 14.6667C14.9812 14.6667 13.75 15.898 13.75 17.4167C13.75 18.9355 14.9812 20.1667 16.5 20.1667Z"
          stroke="black"
          stroke-width="0.916667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.87402 12.3843L14.1349 16.0326"
          stroke="black"
          stroke-width="0.916667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.1257 5.96753L7.87402 9.61586"
          stroke="black"
          stroke-width="0.916667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </PopoverTrigger>
    <PopoverContent className="w-full">
        <ShareIcons url={pathname}/>
    </PopoverContent>
  </Popover>
    </>
  )
}
