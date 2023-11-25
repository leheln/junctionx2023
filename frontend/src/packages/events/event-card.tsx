import {SustainabilityEvent} from "@/models/event";
import {FaHeart} from "react-icons/fa";

interface EventCardProps {
    event: SustainabilityEvent
    onLeave: (event: SustainabilityEvent) => void
    onJoin: (event: SustainabilityEvent) => void
}


function EventCard({event}: EventCardProps) {
    return <div className="rounded-lg flex flex-col justify-between h-56 bg-cover bg-center overflow-hidden"
                style={{background: "url(/pic_trulli.jpg)"}}>
        <div className="flex items-center p-3 gap-1">
            <img className="w-6 h-6" src="/credit.png"/>
            <div className="text-[#ffd53c] text-lg font-bold">{event.credits}</div>
            <div className="flex-grow"/>
            <FaHeart className="w-6 h-6"/>
        </div>
        <div className="backdrop-blur backdrop-brightness-75 p-2">
            <div className="text-lg">{event.title}</div>
            <div className="text-muted-foreground overflow-ellipsis">{event.description}</div>
        </div>
    </div>
}

export default EventCard;