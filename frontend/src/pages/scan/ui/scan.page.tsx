import {Layout} from '@/packages/layout';
import {useState} from 'react';
import {QrScanner} from '@yudiel/react-qr-scanner';

export function ScanPage() {
    const [data, setData] = useState('No result');
    return (
        <Layout showBack className="flex flex-col" backgroundImage="/background_green_pale.png">
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