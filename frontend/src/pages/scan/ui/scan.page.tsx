import {Layout} from '@/packages/layout';
import {QrScanner} from '@yudiel/react-qr-scanner';
import {axios} from '@/core/axios';
import {toast} from '@/components/ui/use-toast.ts';
import {useParams} from 'react-router-dom';

export function ScanPage() {
    const { eventId } = useParams();
    const onDecode = (result: string) => {
        axios.post(`/events/${eventId}/users/${result}/validateParticipation`)
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
            });
    };
    return (
        <Layout title="Scan QR Code" showBack className="flex flex-col" backgroundImage="/background_green_pale.png">
            <div className="">
                <QrScanner
                    onDecode={(result) => onDecode(result)}
                    onError={(error) => console.log(error?.message)}
                />
            </div>
        </Layout>
    );
}