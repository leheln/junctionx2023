import { axios } from '@/core/axios';
import { RootState } from '@/core/state';
import { StoreItem } from '@/models/storeItem';
import { Layout } from '@/packages/layout';
import StoreItemCard from '@/packages/storeItems/store-item-card';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function StorePage() {
    const [myItems, setMyItems] = useState<StoreItem[]>([])
    const [storeItems, setStoreItems] = useState<StoreItem[]>([])
    const { id } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        axios.get<{ items: StoreItem[] }>("/api/storeItems").then((res) => {
            const myItems = res.data.items.filter(i => !!i.redeemers?.find(r => r.redeemerUserId === id))
            const storeItems = res.data.items.filter(i => !i.redeemers?.find(r => r.redeemerUserId === id))
            setMyItems(myItems)
            setStoreItems(storeItems)
        })
    }, [])
    return (
        <Layout showNavigation backgroundImage="/background_green_pale.png" className="flex flex-col p-4 gap-4">
            {myItems.length > 0 && <div className="flex flex-col">
                <div className="text-2xl px-2 mb-1">My items</div>
                <div className="grid grid-cols-2">
                    {myItems.map(i => <Link key={i.id!} to={`${i.id!}`}>
                        <StoreItemCard storeItem={i} />
                    </Link>)}
                </div>
            </div>}
            <div className="flex flex-col">
                {myItems.length > 0 && <div className="text-2xl px-2 mb-1">Store</div>}
                <div className="grid grid-cols-2 gap-4">
                    {storeItems.map(i => <Link key={i.id!} to={`${i.id!}`}>
                        <StoreItemCard storeItem={i} />
                    </Link>)}
                </div>
            </div>
        </Layout>
    );
}