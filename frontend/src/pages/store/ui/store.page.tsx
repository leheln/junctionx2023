import { axios } from '@/core/axios';
import { RootState } from '@/core/state';
import { StoreItem } from '@/models/storeItem';
import { Layout } from '@/packages/layout';
import StoreItemCard from '@/packages/storeItems/store-item-card';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function StorePage() {
    const [storeItems, setStoreItems] = useState<StoreItem[]>([])
    const { id } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        axios.get<{ items: StoreItem[] }>("/api/storeItems").then((res) => {
            setStoreItems(res.data.items)
        })
    }, [])
    return (
        <Layout showNavigation backgroundImage="/background_green_pale.png">
            <div className="flex flex-col gap-4 p-4">
                {storeItems.map(si => <Link key={si.id!} to={`${si.id!}`}><StoreItemCard storeItem={si} applied={!!si.redeemers?.find(r => r.redeemerUserId === id)} /></Link>)}
            </div>
        </Layout>
    );
}