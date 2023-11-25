import {Layout} from '@/packages/layout';
import {useState} from 'react';
import {QrScanner} from '@yudiel/react-qr-scanner';

export function ScanPage() {
    const [data, setData] = useState('No result');
    return (
        <Layout showNavigation className="flex flex-col">
            <div className="">
                <QrScanner
                    onDecode={(result) => setData(result)}
                    onError={(error) => console.log(error?.message)}
                />
            </div>
            <p>{data}</p>
        </Layout>
    );
}