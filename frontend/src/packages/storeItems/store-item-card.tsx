import { StoreItem } from "@/models/storeItem";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface StoreItemCardProps {
  storeItem: StoreItem
}




function StoreItemCard({ storeItem }: StoreItemCardProps) {
  return <div className="rounded-lg flex flex-col justify-between h-56 bg-cover bg-center overflow-hidden"
    style={{ background: `url('data:image/png;base64,${storeItem.image}')` }}>
    <div className="flex items-center p-3 gap-1" >
      <img className="w-6 h-6" src="/credit.png" />
      <div className="text-[#ffd53c] text-lg">{storeItem.credit}</div>
      <div className="flex-grow" />
      <FaHeart className="w-6 h-6" />
    </div>
    <div className="backdrop-blur backdrop-brightness-75 p-2">
      <div className="text-lg">{storeItem.title}</div>
      <div className="text-muted-foreground overflow-ellipsis">{storeItem.description}</div>
    </div>
  </div>

}

export default StoreItemCard;