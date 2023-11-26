import { StoreItem } from "@/models/storeItem";

interface StoreItemCardProps {
  storeItem: StoreItem
}

function StoreItemCard({ storeItem }: StoreItemCardProps) {
  return <div className="rounded-lg flex flex-col justify-between h-56 bg-cover bg-center bg-background overflow-hidden"
    style={{ backgroundImage: `url('data:image/png;base64,${storeItem.image}')` }}>
    <div className="flex p-3 items-start justify-between" >
      <div className="flex bg-white rounded-full items-center gap-1 px-0.5 pe-1.5">
        <img className="w-6 h-6" src="/credit.png" />
        <div className="text-[#bf9706] text-lg font-bold">{storeItem.credit}</div>
      </div>
    </div>
    <div className="backdrop-blur-2xl bg-background px-4 py-2">
      <div className="text-sm line-clamp-2 overflow-ellipsis">{storeItem.title}</div>
    </div>
  </div>

}

export default StoreItemCard;