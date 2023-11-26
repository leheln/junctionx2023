import {SustainabilityEvent} from "@/models/event";
import {FaHeart} from "react-icons/fa";
import {Card} from "@/components/ui/card.tsx";

interface EventCardProps {
    event: SustainabilityEvent
    onLeave: (event: SustainabilityEvent) => void
    onJoin: (event: SustainabilityEvent) => void
}


function EventCard({event}: EventCardProps) {
    return <Card className="rounded-lg flex flex-col justify-between h-56 bg-cover bg-center overflow-hidden"
                style={{background: `url('data:image/png;base64,${event.image}')`}}>
        <div className="flex items-center p-3 gap-1">
            <img className="w-6 h-6" src="/credit.png"/>
            <div className="text-[#ffd53c] text-lg font-bold">{event.credits}</div>
            <div className="flex-grow"/>
            <FaHeart className="w-6 h-6 text-primary-foreground"/>
        </div>
        <div className="backdrop-blur-2xl bg-background px-4 py-2">
            <div className="text-lg">{event.title}</div>
            <div className="opacity-80 overflow-ellipsis">{event.description.slice(0, 90)}{event.description.length > 90? "..." : ""}</div>
        </div>
    </Card>
}

export default EventCard;