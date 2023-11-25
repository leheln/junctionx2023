import {Layout} from '@/packages/layout';
import {ChangeEvent, FormEventHandler, useRef, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import SpinLoader from "@/components/spin-loader.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {axios} from '@/core/axios';

interface UtilitiesData {
    type: 'electricity' | 'water' | 'gas'
    dateStart: string,
    dateEnd: string,
    amount: number
}

export function AddUtilitiesPage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<UtilitiesData | undefined>(undefined);

    const onFile = (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const file = e.target.files![0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            const data = {image: reader.result}
            axios.post('/api/consumption/try-utilities/', data)
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
            {data ? <Accept data={data}/> : <Upload onFile={onFile}/>}
            {loading && <SpinLoader size={32}/>}
        </Layout>
    );
}

interface UploadProps {
    onFile: FormEventHandler<HTMLInputElement>
}

function Upload({onFile}: UploadProps) {
    const input = useRef<HTMLInputElement>(null)
    return <>
        <span className="text-xl text-center">Upload an image of your bill</span>
        <Button onClick={() => input.current?.click()}>Upload</Button>
        <input ref={input} type="file" className="hidden" accept=".png,.jpg,.pdf" onChangeCapture={onFile}></input>
    </>
}

interface AcceptProps {
    data: UtilitiesData
}

function Accept({data}: AcceptProps) {
    return <>
        type: {data.type}<br/>
        start: {data.dateStart}<br/>
        end: {data.dateEnd}<br/>
        amount: {data.amount}
    </>
}