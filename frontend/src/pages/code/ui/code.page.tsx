import {Layout} from '@/packages/layout';
import {useEffect, useState} from 'react';
import {axios} from '@/core/axios';
import {toast} from '@/components/ui/use-toast.ts';
import SpinLoader from '@/components/spin-loader.tsx';

export function CodePage() {
    const [loading, setLoading] = useState(true);
    const [qrCode, setQrCode] = useState('');
    useEffect(() => {
        axios.post('/api/qr/get')
            .then((response) => {
                setQrCode(response.data.qr);
                setLoading(false);
            })
            .catch(() => {
                toast({
                    variant: 'destructive',
                    title: 'An error has occurred.',
                    description: 'Try reloading the page. If the issue persists please contact support.'
                });
                setLoading(false);
            });
    });
    return (
        <Layout title="QR Code" showBack className="flex flex-col items-center p-8 text-center" backgroundImage="/background_green_pale.png">
            Show this QR code to event organizers to claim rewards
            {
                loading ?
                    (
                        <div className="h-[250px] w-[250px] mt-4">
                            <SpinLoader size={18}/>
                        </div>
                    )
                    : (
                        <img className="h-[250px] w-[250px] mt-4 mix-blend-multiply" alt="" src={`data:image/${qrCode}`}/>
                    )
            }
        </Layout>
    );
}