import {SustainabilityEvent} from "@/models/event";
import {FaHeart} from "react-icons/fa";
import {Card} from "@/components/ui/card.tsx";

interface EventCardProps {
    event: SustainabilityEvent
    applied: boolean
}


function EventCard({event, applied}: EventCardProps) {
    return <Card className="rounded-lg flex flex-col justify-between h-56 bg-cover bg-center bg-background backdrop-blur-2xl overflow-hidden"
                style={{backgroundImage: `url('data:image/png;base64,${event.image}')`}}>
        <div className="flex p-3 items-start justify-between">
            <div className="flex bg-white rounded-full items-center gap-1 px-0.5 pe-1.5">
                <img className="w-6 h-6" src="/credit.png"/>
                <div className="text-[#bf9706] text-lg font-bold">{event.credits}</div>
            </div>
            {applied && <div className="bg-white rounded-full p-2">
                <FaHeart className="w-6 h-6 text-primary"/>
            </div>}
        </div>
        <div className="backdrop-blur-2xl bg-background px-4 py-2">
            <div className="text-lg">{event.title}</div>
            <div className="opacity-80 line-clamp-2 overflow-ellipsis">{event.description}</div>
        </div>
    </Card>
}

export default EventCard;