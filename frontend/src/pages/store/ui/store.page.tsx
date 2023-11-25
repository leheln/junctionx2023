import { axios } from '@/core/axios';
import { RootState } from '@/core/state';
import { StoreItem } from '@/models/storeItem';
import {Layout} from '@/packages/layout';
import StoreItemCard from '@/packages/storeItems/store-item-card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {creditUpdate} from "@/packages/auth/state/auth.state.ts"

async function storeItemRedeem(storeItem: StoreItem, userCredits: number) {

    if(userCredits >= storeItem.credit) {
        await axios.post(`/api/storeItems/${storeItem.id}/redeem`)
    }

}
export function StorePage() {
    const { credits } = useSelector((state: RootState) => state.auth);
    const [storeItems, setStoreItems] = useState<StoreItem[]>([])
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get<{ items: StoreItem[] }>("/api/storeItems").then((res) => {
            setStoreItems(res.data.items)
        })
    }, [])
    console.log("nyaaaaaaa", credits)
    return (
        <Layout showNavigation>
            {storeItems.map(si => <StoreItemCard key={si.id} storeItem={si} onRedeem={(si) =>{
                storeItemRedeem(si, credits!)
                .then(_ => {
                    dispatch(creditUpdate({credits: credits! - si.credit}))
                })

            } }/>)}
        </Layout>
    );
}