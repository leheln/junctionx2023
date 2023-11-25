import {Layout} from '@/packages/layout';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SustainabilityEvent} from "@/models/event.ts";
import {axios} from "@/core/axios";
import SpinLoader from "@/components/spin-loader.tsx";
import {IoLocationSharp} from "react-icons/io5";
import {FaUser, FaUsers} from "react-icons/fa";
import {MdDateRange} from "react-icons/md";
import {Button} from "@/components/ui/button.tsx";

export function EventPage() {
    const {eventId} = useParams<{ eventId: string }>()
    const [event, setEvent] = useState<SustainabilityEvent | undefined>(undefined)

    useEffect(() => {
        axios.get<SustainabilityEvent>(`/api/events/${eventId}`)
            .then((res) => {
                setEvent(res.data)
            })
    }, [])

    if (event) {
        return (
            <Layout title={event.title} showBack className="flex flex-col">
                <img src="/pic_trulli.jpg"/>
                <div className="flex-grow flex flex-col p-4 pb-8 gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <MdDateRange className="w-4 h-4"/>
                        {new Date(event.date).toLocaleString("hu")}
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <IoLocationSharp className="w-4 h-4"/>
                        {event.address.zipCode} {event.address.city}, {event.address.street} {event.address.streetNumber}
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FaUser className="w-4 h-4"/>
                        {event.organizer?.firstName} {event.organizer?.lastName}
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <FaUsers className="w-4 h-4"/>
                        {event.attendance?.length} Attendees
                    </div>
                    <div className="h-1" />
                    <div className="text-muted-foreground" >{event.description}</div>
                    <div className="flex-grow h-1" />
                    {new Date(event.date) < new Date() ?
                        <Button disabled variant="outline">The event has already passed</Button> :
                        <Button className="gap-1 bg-yellow-500">Join and earn {event.credits} credits</Button>
                    }
                </div>
            </Layout>
        );
    } else {
        return (
            <Layout title="Loading event" showBack className="flex flex-col justify-center items-center">
                <SpinLoader size={32}/>
            </Layout>
        );
    }
}