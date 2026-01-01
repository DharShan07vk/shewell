export default function Description({ description }: { description: string }) {
   
    return (
      <div id="description">
        <p
          className="mb-3 font-noto text-xs text-[#383842cc]  lg:text-base lg:leading-7"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    );
  }
  