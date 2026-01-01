interface IText{
    text : string
}
const SectionTitle = ({text}: IText) => {
    return(
        <>
        <h2  className="text-center font-poppins text-[22px] leading-[32px] font-bold lg:text-[30px] mb-6 md:mb-[30px] xl:mb-9 2xl:mb-[40px]
          lg:leading-[48px] xl:text-[36px] xl:leading-[45px] 2xl:text-[40px] 2xl:leading-[52px]">
            {text}
        </h2>
        </>
    )
}

export default SectionTitle