import { axios } from '@/core/axios';
import { RootState } from '@/core/state';
import { SustainabilityEvent } from '@/models/event';
import EventCard from '@/packages/events/event-card';
import { Layout } from '@/packages/layout';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function leaveEvent(eventId: string, userId: string) {
    axios.delete(`/api/users/${userId}/events/${eventId}`)
}

function joinEvent(eventId: string, userId: string) {
    return axios.post(`/api/users/${userId}/events/${eventId}`).then(res => res.data)
}


export function EventsPage() {
    const { id } = useSelector((state: RootState) => state.auth);
    const [events, setEvents] = useState<SustainabilityEvent[]>([])
    useEffect(() => {
        axios.get<{ items: SustainabilityEvent[] }>("/api/events").then((res) => {
            setEvents(res.data.items)
        })
    }, [])
    return (
        <Layout showNavigation>

            <div style={{ display: "flex", gap: "10px" }}>
                {events.map(e => <EventCard event={e} onLeave={(e) => {
                    leaveEvent(e.id!, id!)
                    const eventIndex = events.findIndex(ei => ei.id === e.id)
                    const tempEvents = [...events]
                    const attendanceIndex = tempEvents[eventIndex].attendance?.findIndex(a => a.eventId === e.id && a.userId === id) ?? -1

                    if (attendanceIndex >= 0) {
                        tempEvents[eventIndex].attendance = [...(tempEvents[eventIndex].attendance?.splice(0, attendanceIndex) || []), ...(tempEvents[eventIndex].attendance?.splice(attendanceIndex + 1, -1) || [])]
                        setEvents(tempEvents)
                    }
                }} onJoin={(e) => {
                    joinEvent(e.id!, id!).then(data => {
                        const eventIndex = events.findIndex(ei => ei.id === e.id)
                        const tempEvents = [...events]
                        tempEvents[eventIndex].attendance?.push(data)
                        setEvents(tempEvents)
                    })

                }} ></EventCard>)}
            </div>

        </Layout >
    );
}