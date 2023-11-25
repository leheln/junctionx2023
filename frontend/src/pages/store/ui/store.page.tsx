import { axios } from '@/core/axios';
import { RootState } from '@/core/state';
import { StoreItem } from '@/models/storeItem';
import { Layout } from '@/packages/layout';
import StoreItemCard from '@/packages/storeItems/store-item-card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creditUpdate } from "@/packages/auth/state/auth.state.ts"
import { Link } from 'react-router-dom';

async function storeItemRedeem(storeItem: StoreItem, userCredits: number) {

    if (userCredits >= storeItem.credit) {
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
    return (
        <Layout showNavigation>
            <div className="flex flex-col gap-4 p-4">
                {storeItems.map(si => <Link key={si.id!} to={`${si.id!}`}><StoreItemCard storeItem={si} /></Link>)}
            </div>
        </Layout>
    );
}