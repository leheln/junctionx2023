import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { RootState } from "@/core/state";
import { SustainabilityEvent } from "@/models/event";
import { useSelector } from "react-redux";


interface EventCardProps {
  event: SustainabilityEvent
  onLeave: (event: SustainabilityEvent) => void
  onJoin: (event: SustainabilityEvent) => void
}




function EventCard({ event, onLeave, onJoin }: EventCardProps) {
  const { id } = useSelector((state: RootState) => state.auth);
  const address = event.address


  return <Card className="w-[400px]">
    <img src="pic_trulli.jpg" alt="Italian Trulli" />
    <CardTitle>{event.title}</CardTitle>
    <CardDescription>{event.description}</CardDescription>
    <CardContent className="p-0">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <img style={{ height: "20px", width: "20px" }} src="credit.png" alt="Italian Trulli" />
          <span style={{ marginLeft: "5px" }}>{event.organizer?.lastName}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <img style={{ height: "20px", width: "20px" }} src="credit.png" alt="Italian Trulli" />
          <span style={{ marginLeft: "5px" }}>{event.credits}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <img style={{ height: "20px", width: "20px" }} src="credit.png" alt="Italian Trulli" />
          <span style={{ marginLeft: "5px" }}>{address.zipCode} {address.city}, {address.street} {address.streetNumber} </span>
        </div>
        {event.attendance?.length}
      </div>
    </CardContent>
    <CardFooter className="p-0">

      {event.organizerId === id ? <Button>Manage</Button> : <></>}
      <div style={{ marginLeft: "auto" }}>
        {
          event.attendance?.find(a => a.userId === id) ?
            <Button onClick={() => {
              onLeave(event)
            }}>Leave</Button> :
            <Button onClick={() => onJoin(event)}>Join</Button>
        }
      </div>
    </CardFooter>
  </Card>
}

export default EventCard;