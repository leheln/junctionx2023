import SpinLoader from "@/components/spin-loader.tsx";
import { Button } from "@/components/ui/button.tsx";
import { axios } from "@/core/axios";
import { RootState } from '@/core/state';
import { StoreItem } from "@/models/storeItem";
import { Layout } from '@/packages/layout';
import { useEffect, useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

export function StoreItemPage() {
    const {id, credits} = useSelector((state: RootState) => state.auth)
    const {storeItemId} = useParams<{ storeItemId: string }>()
    const [storeItem, setStoreItem] = useState<StoreItem | undefined>(undefined)
    
    async function createAttendance(event?: StoreItem) {
       
    }
    
    async function removeAttendance(event?: StoreItem) {
      
    }


    useEffect(() => {
        axios.get<StoreItem>(`/api/storeItems/${storeItemId}`)
            .then((res) => {
                setStoreItem(res.data)
            })
    }, [])
    console.log("asddasdasd", storeItem)
    if (storeItem) {
        return (
            <Layout title={storeItem?.title} showBack className="flex flex-col">
                <img src="/pic_trulli.jpg"/>
                <div className="flex-grow flex flex-col p-4 pb-8 gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <FaUser className="w-4 h-4"/>
                        {storeItem?.creator?.firstName} {storeItem?.creator?.lastName}
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FaUsers className="w-4 h-4"/>
                        {storeItem?.redeemers?.length} Redeemers
                    </div>
                    <div className="h-1" />
                    <div className="text-muted-foreground" >{storeItem?.description}</div>
                    <div className="flex-grow h-1" />
                    {(storeItem?.credit || 0) > (credits || 0)?
                        <Button disabled variant="outline">Not enough credit</Button> :
                        storeItem?.redeemers?.find?.(a => a.redeemerUserId === id)? <Button className="gap-1 bg-yellow-500"  onClick={() => removeAttendance(storeItem)}>Show QR code </Button> :
                        <Button className="gap-1 bg-yellow-500" onClick={() => createAttendance(storeItem)}>Redeem for {storeItem?.credit} credits</Button>
                    }
                </div>
            </Layout>
        );
    } else {
        return (
            <Layout title="Loading store item" showBack className="flex flex-col justify-center items-center">
                <SpinLoader size={32}/>
            </Layout>
        );
    }
}


