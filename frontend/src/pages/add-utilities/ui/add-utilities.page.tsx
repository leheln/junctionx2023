import {Layout} from '@/packages/layout';
import {ChangeEvent, useRef, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import axios from "axios";
import SpinLoader from "@/components/spin-loader.tsx";
import {toast} from "@/components/ui/use-toast.ts";

interface UtilitiesData {
    type: 'electricity' | 'water' | 'gas'
    dateStart: string,
    dateEnd: string,
    amount: number
}

export function AddUtilitiesPage() {
    const input = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<UtilitiesData | undefined>(undefined);

    const onFileChangeCapture = (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const file = e.target.files![0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            const data = { image: reader.result }
            axios.post('/api/try-utilities', data)
                .then(response => {
                    setData(response.data)
                    setLoading(false)
                })
                .catch(() => {
                    toast({
                        variant: 'destructive',
                        title: 'An error has occurred.',
                        description: 'Try reloading the page. If the issue persists please contact support.'
                    })
                })
        }
    };

    return (
        <Layout title="Add utility bill" showBack className="flex flex-col p-4 justify-center items-center gap-4">
            { data ?
                <>
                    type: {data.type}<br/>
                    type: {data.dateStart}<br/>
                    type: {data.dateEnd}<br/>
                    type: {data.amount}
                </> :
                <>
                    <span className="text-xl text-center">Upload an image of your bill</span>
                    <Button onClick={() => input.current?.click()}>Upload</Button>
                    <input ref={input} type="file" className="hidden" accept=".png,.jpg,.pdf" onChangeCapture={onFileChangeCapture}></input>
                </>
            }
            {loading && <SpinLoader size={32}/>}
        </Layout>
    );
}