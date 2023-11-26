import { StoreItem } from "@/models/storeItem";
import { FaHeart } from "react-icons/fa";

interface StoreItemCardProps {
  storeItem: StoreItem
  applied: boolean
}




function StoreItemCard({ storeItem, applied }: StoreItemCardProps) {
  return <div className="rounded-lg flex flex-col justify-between h-56 bg-cover bg-center overflow-hidden"
    style={{ background: `url('data:image/png;base64,${storeItem.image}')` }}>
    <div className="flex p-3 items-start justify-between" >
      <div className="flex bg-white rounded-full items-center gap-1 px-0.5 pe-1.5">
        <img className="w-6 h-6" src="/credit.png" />
        <div className="text-[#bf9706] text-lg font-bold">{storeItem.credit}</div>
      </div>
      {applied && <div className="bg-white rounded-full p-2">
        <FaHeart className="w-6 h-6 text-primary" />
      </div>}
    </div>
    <div className="backdrop-blur-2xl bg-background px-4 py-2">
      <div className="text-lg">{storeItem.title}</div>
      <div className="opacity-80 overflow-ellipsis">{storeItem.description.slice(0, 90)}{storeItem.description.length > 90? "..." : ""}</div>
    </div>
  </div>

}

export default StoreItemCard;