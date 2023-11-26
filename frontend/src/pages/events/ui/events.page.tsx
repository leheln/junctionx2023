import { axios } from '@/core/axios';
import { RootState } from '@/core/state';
import { SustainabilityEvent } from '@/models/event';
import EventCard from '@/packages/events/event-card';
import { Layout } from '@/packages/layout';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";

export function EventsPage() {
    const { id } = useSelector((state: RootState) => state.auth);
    const [events, setEvents] = useState<SustainabilityEvent[]>([])
    useEffect(() => {
        axios.get<{ items: SustainabilityEvent[] }>("/api/events").then((res) => {
            setEvents(res.data.items)
        })
    }, [])
    return (
        <Layout showNavigation backgroundImage="/background_green_pale.png">
            <div className="flex flex-col gap-4 p-4">
                {events.map(e => <Link key={e.id} to={`${e.id}`}>
                    <EventCard event={e} applied={!!e.attendance?.find((a) => a.userId == id)} />
                </Link>)}
            </div>

        </Layout >
    );
}