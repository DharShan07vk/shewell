const ProductDescription = ({ description }: { description: string }) => {
  return (
    <>
      <div id="1" className="  flex flex-col gap-[18px] md:gap-5 ">
        <p
          className="text-justify font-inter text-sm font-normal text-inactive xl:text-base"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      
       
      </div>
    </>
  );
};
export default ProductDescription;
