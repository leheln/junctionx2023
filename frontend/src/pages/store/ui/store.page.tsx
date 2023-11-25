import { axios } from '@/core/axios';
import { StoreItem } from '@/models/storeItem';
import { Layout } from '@/packages/layout';
import StoreItemCard from '@/packages/storeItems/store-item-card';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function StorePage() {
    const [storeItems, setStoreItems] = useState<StoreItem[]>([])
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