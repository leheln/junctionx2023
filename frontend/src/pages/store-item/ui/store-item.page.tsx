import SpinLoader from "@/components/spin-loader.tsx";
import { Button } from "@/components/ui/button.tsx";
import { axios } from "@/core/axios";
import { RootState } from '@/core/state';
import { StoreItem } from "@/models/storeItem";
import { StoreItemRedeem } from "@/models/storeItemRedeem";
import { creditUpdate } from "@/packages/auth/state/auth.state";
import { Layout } from '@/packages/layout';
import { useEffect, useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import "./store-item.page.css";


export function StoreItemPage() {
    const { id, credits } = useSelector((state: RootState) => state.auth)
    const { storeItemId } = useParams<{ storeItemId: string }>()
    const [storeItem, setStoreItem] = useState<StoreItem | undefined>(undefined)
    const [isBarcodeVisible, setIsBarcodeVisible] = useState(false);
    const dispatch = useDispatch();


    async function redeemStoreItem(storeItem?: StoreItem) {
        const storeItemRedeem = await axios.post<StoreItemRedeem>(`/api/storeItems/${storeItem?.id}/redeem`);
        const tempStoreItem = { ...storeItem! }
        tempStoreItem.redeemers?.push(storeItemRedeem.data)
        dispatch(creditUpdate({ credits: credits! - storeItem!.credit }))
        setStoreItem(tempStoreItem)
    }


    useEffect(() => {
        axios.get(`/api/users/${id}`).then(r => {
            dispatch(creditUpdate({credits: r.data.credits}))
        })
        axios.get<StoreItem>(`/api/storeItems/${storeItemId}`)
            .then((res) => {
                setStoreItem(res.data)
            })
    }, [])
    console.log("asddasdasd", storeItem)
    if (storeItem) {
        return <Layout title={storeItem?.title} showBack className="flex flex-col">
            <div className="overlay" style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "100%", backdropFilter: "blur(5px)", zIndex: 1, opacity: isBarcodeVisible ? "100%" : "0", visibility: isBarcodeVisible ? "visible" : "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, background: "gray", height: "100%", width: "100%", opacity: "60%" }}>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "sticky", left: 0, top: 0, height: "100%", width: "100%" }}>
                    <div className="h-[135px] w-[250px]" style={{ background: "white", display: "flex", gap: "10px", flexDirection: "column", alignItems: "center" }}>
                        <img className="h-[250px] w-[250px] mt-2" alt="" src={`data:image/png;base64,${storeItem.barcode}`} />
                        <Button disabled={!isBarcodeVisible} className="gap-1 bg-yellow-500" onClick={() => { setIsBarcodeVisible(false) }} >Close</Button>
                    </div>
                </div>
            </div>

            <img src={`data:image/png;base64,${storeItem.image}`} />
            <div className="flex-grow flex flex-col p-4 pb-8 gap-2">
                <div className="flex flex-row gap-2 items-center">
                    <FaUser className="w-4 h-4" />
                    {storeItem?.creator?.firstName} {storeItem?.creator?.lastName}
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <FaUsers className="w-4 h-4" />
                    {storeItem?.redeemers?.length} Redeemers
                </div>
                <div className="h-1" />
                <div className="text-muted-foreground" >{storeItem?.description}</div>
                <div className="flex-grow h-1" />
                {storeItem?.redeemers?.find?.(a => a.redeemerUserId === id) ?
                    <Button className="gap-1 bg-yellow-500" onClick={() => setIsBarcodeVisible(true)}>Show Barcode</Button> :
                    (storeItem?.credit || 0) > (credits || 0) ? <Button disabled variant="outline">Not enough credit</Button> :
                        <Button className="gap-1 bg-yellow-500" onClick={() => redeemStoreItem(storeItem)}>Redeem for {storeItem?.credit} credits</Button>
                }
            </div>

        </Layout>

        ;
    } else {
        return (
            <Layout title="Loading store item" showBack className="flex flex-col justify-center items-center">
                <SpinLoader size={32} />
            </Layout>
        );
    }
}


