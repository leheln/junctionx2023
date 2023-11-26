import {Layout} from '@/packages/layout';
import {QrScanner} from '@yudiel/react-qr-scanner';
import {axios} from '@/core/axios';
import {toast} from '@/components/ui/use-toast.ts';
import {useParams} from 'react-router-dom';
import {useState} from 'react';
import SpinLoader from '@/components/spin-loader.tsx';

export function ScanPage() {
    const {eventId} = useParams();
    const [loading, setLoading] = useState(false);
    const [lastRecognition, setLastRecognition] = useState(new Date().getTime());
    const onDecode = (result: string) => {
        if (new Date().getTime() - lastRecognition < 5000) {
            return;
        }
        setLastRecognition(new Date().getTime());
        setLoading(true);
        axios.post(`/api/events/${eventId}/users/${result}/validateParticipation`)
            .then(() => {
                toast({
                    variant: 'default',
                    title: 'Attendance successfully acknowledged.'
                });
            })
            .catch(() => {
                toast({
                    variant: 'destructive',
                    title: 'An error has occurred.',
                    description: 'Try reloading the page. If the issue persists please contact support.'
                });
            }).finally(() => {
            setLoading(false);
        });
    };
    return (
        <Layout title="Scan QR Code" showBack className="flex flex-col" backgroundImage="/background_green_pale.png">
            <div className="flex flex-col items-center ">
                {
                    loading ? (
                        <div className="mt-16">
                            <SpinLoader size={32}/>
                        </div>
                    ) : (
                        <QrScanner
                            onDecode={(result) => onDecode(result)}
                            onError={(error) => console.log(error?.message)}
                        />
                    )
                }
            </div>
        </Layout>
    );
}