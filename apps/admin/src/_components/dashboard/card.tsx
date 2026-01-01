// import { Image } from "primereact/image";

// type ICardProps = {
//     title: string;
//     value: string;
//     valueStat: string;
//     repeated: string;
//     customerStats: string;
//     icon: React.JSX.Element;
//     borderColor: string;
//     iconBg:string;
//     svg?:boolean
// }
// const Card = ({item}:{item:ICardProps}) => {
//   return (
//     <div className={`bg-white px-3 py-5 mb-0 ${item.borderColor} border-1 border-round-xl`}>
//       <div className="flex justify-content-between mb-3 ">
//         <div>
//           <span className="block text-900 font-semibold mb-3 text-base">{item.title}</span>
//           <div className="text-900 font-medium text-lg flex gap-3">
//             <span className="text-base">$ {item.value}</span> <span className="text-green-500 text-sm">{item.valueStat}</span>
//           </div>
//         </div>
//         <div className={`flex align-items-center justify-content-center ${item.iconBg} border-round`} style={{ width: '2.5rem', height: '2.5rem' }}>
//           {!item.svg ?item.icon: <Image src="/layout/images/membership-icon.png" alt="icon" width="17" height="17"/>}
//         </div>
//       </div>
//       <div className="flex gap-2 align-items-center">
//         <span className="text-green-500 font-medium text-sm ">{item.repeated}</span>
//         <span className="text-500 text-xs">Repeated customer</span>
//         <span className="text-green-500 text-sm">{item.customerStats}</span>
//       </div>
//     </div>
//   );
// };

// export default Card;


import { Image } from 'primereact/image';

type ICardProps = {
  title: string;
  value: string;
  icon?: React.JSX.Element;
  borderColor: string;
  iconBg?: string;
  svg?: boolean;
  anotherTitle? : string
  anotherValue? : string;
};
const Card = ({ item }: { item: ICardProps }) => {
  return (
    <div className={`bg-white px-3 py-5 mb-0 ${item.borderColor} border-1 border-round-xl`}>
      <div className="flex justify-content-between">
        <div className='w-full'>
          <div className='flex justify-content-between w-full'>
          <span className="block text-900 font-semibold mb-3 text-base">{item.title}</span>
          <span className='block text-900 font-semibold mb-3 text-base'>{item.anotherTitle}</span>
          </div>
          <div className="text-900 font-medium text-lg flex gap-3">
            <div className='flex justify-content-between w-full'>
            <span className="text-base">{item.value}</span>
            <span className="text-base">{item.anotherValue}</span>
            </div>
            
            {/* <span className="text-green-500 text-sm">{item.valueStat}</span> */}
          </div>
        </div>
      {
        item.icon &&   <div className={`flex align-items-center justify-content-center ${item.iconBg} border-round`} style={{ width: '2.5rem', height: '2.5rem' }}>
        {!item.svg ? item.icon : ""}
      </div>
      }
      </div>
      {/* <div className="flex gap-2 align-items-center">
        <span className="text-green-500 font-medium text-sm ">{item.repeated}</span>
        <span className="text-500 text-xs">Repeated customer</span>
        <span className="text-green-500 text-sm">{item.customerStats}</span>
      </div> */}
    </div>
  );
};

export default Card;
