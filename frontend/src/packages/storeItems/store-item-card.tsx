import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { RootState } from "@/core/state";
import { StoreItem } from "@/models/storeItem";
import { useSelector } from "react-redux";


interface StoreItemCardProps {
  storeItem: StoreItem
  onRedeem: (storeItem: StoreItem) => void
}




function StoreItemCard({ storeItem, onRedeem }: StoreItemCardProps) {
  const { id , credits} = useSelector((state: RootState) => state.auth);
  console.log(storeItem)
  return <Card className="w-[400px]">
    <img src="pic_trulli.jpg" alt="Italian Trulli" />
    <CardTitle>{storeItem.title}</CardTitle>
    <CardDescription>{storeItem.description}</CardDescription>
    <CardContent className="p-0">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <img style={{ height: "20px", width: "20px" }} src="credit.png" alt="Italian Trulli" />
          <span style={{ marginLeft: "5px" }}>{storeItem.creator?.lastName}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <img style={{ height: "20px", width: "20px" }} src="credit.png" alt="Italian Trulli" />
          <span style={{ marginLeft: "5px" }}>{storeItem.credit}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter className="p-0">

      
      <div style={{ marginLeft: "auto" }}>
        {
          storeItem.redeemers?.find(si => si.redeemerUserId === id)?
          <Button>Already Redeemed</Button>
          : 
          <Button disabled={(credits || 0) < storeItem.credit} onClick={() => onRedeem(storeItem)}>Redeem</Button>
        }
      </div>
    </CardFooter>
  </Card>
}

export default StoreItemCard;