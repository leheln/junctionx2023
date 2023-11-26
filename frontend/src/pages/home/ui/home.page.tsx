import {RootState} from '@/core/state';
import {Layout} from '@/packages/layout';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {axios} from "@/core/axios";
import {Consumption, ConsumptionType} from "@/models/consumption.ts";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IoQrCode} from "react-icons/io5";
import {SustainabilityEvent} from "@/models/event.ts";
import {MdDateRange, MdOutlinePedalBike} from "react-icons/md";
import {Pass, PassType} from "@/models/pass.ts";
import {FaBusAlt} from "react-icons/fa";
import {creditUpdate} from "@/packages/auth/state/auth.state.ts";

type Utilities = {
    [name: string]: Consumption
}

export function HomePage() {
    const dispatch = useDispatch();
    const {id, credits} = useSelector((state: RootState) => state.auth);
    const [event, setEvent] = useState<SustainabilityEvent | undefined>(undefined)
    const [utilities, setUtilities] = useState<Utilities>({})
    const [passes, setPasses] = useState<Pass[]>([])

    useEffect(() => {
        axios.get(`/api/users/${id}`).then(r => {
            dispatch(creditUpdate({credits: r.data.credits}))
        })
        axios.get<{
            items: SustainabilityEvent[]
        }>("/api/events")
            .then((res) => {
                const event = res.data.items.find(e => {
                    return !!e.attendance?.find(a => a.userId == id) && new Date() < new Date(e.date)
                })
                setEvent(event)
            })
        axios.get<Consumption[]>("/api/users/consumptions")
            .then((res) => {
                const utilities: Utilities = {}
                for (let type in ConsumptionType) {
                    const utility = res.data.find(utility =>
                        utility.type == type &&
                        new Date(utility.dateStart).getMonth() == new Date().getMonth() - 1
                    )
                    if (utility) {
                        utilities[type] = utility
                    }
                }
                setUtilities(utilities)
            })
        axios.get<Pass[]>("/api/users/passes")
            .then((res) => {
                const passes = res.data.filter(p => {
                    return new Date(p.dateStart) < new Date() && new Date() < new Date(p.dateEnd)
                })
                setPasses(passes)
            })
    }, [])
    return (
        <Layout showNavigation className="flex flex-col p-4 gap-4" backgroundImage="/background_green_pale.png">
            <div className="flex items-center gap-1">
                <img className="w-6 h-6" src="credit.png"/>
                <div className="text-lg font-bold text-[#bf9706]">{credits}</div>
                <div className="flex-grow"/>
                <Link to="/code">
                    <IoQrCode className="w-6 h-6"/>
                </Link>
            </div>

            {event && <div className="flex flex-col">
                <div className="text-2xl px-2 mb-1">Next event</div>
                <Link to={`/events/${event.id}`}>
                    <Card className="flex overflow-hidden backdrop-blur-2xl bg-background">
                        <img className="w-24 h-24 object-cover object-center"
                             src={`data:image/png;base64,${event.image}`}/>
                        <div className="flex-grow flex flex-col px-3 py-2 justify-evenly">
                            <div className="text-lg line-clamp-2 overflow-ellipsis">{event.title}</div>
                            <div className="flex flex-row gap-2 items-center text-muted-foreground">
                                <MdDateRange className="w-4 h-4"/>
                                {new Date(event.date).toLocaleString("hu")}
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>}

            <div className="flex flex-col">
                <div className="text-2xl px-2 mb-1">Utilities</div>
                <Card className="flex flex-col overflow-hidden backdrop-blur-2xl bg-transparent">
                    <div className="flex flex-row p-2 gap-3 items-center bg-background">
                        <div className="relative w-32 h-32">
                            <Progress
                                bg="#EBE18A7F" fg="#EBE18A" r={60}
                                consumption={utilities[ConsumptionType.ELECTRICITY]?.amount}
                                avg={180}
                            />
                            <Progress
                                bg="#6ECCAF7F" fg="#6ECCAF" r={44}
                                consumption={utilities[ConsumptionType.GAS]?.amount}
                                avg={100}
                            />
                            <Progress
                                bg="#344D677F" fg="#344D67" r={28}
                                consumption={utilities[ConsumptionType.WATER]?.amount}
                                avg={7}
                            />
                        </div>
                        <div className="flex-grow flex flex-col">
                            <div className="text-sm">Electricity</div>
                            <ConsumptionLabel
                                color="#B0A864" unit="kWh"
                                consumption={utilities[ConsumptionType.ELECTRICITY]?.amount}
                                avg={180}
                            />
                            <div className="text-sm">Gas</div>
                            <ConsumptionLabel
                                color="#5BAB93" unit="m3"
                                consumption={utilities[ConsumptionType.GAS]?.amount}
                                avg={100}
                            />
                            <div className="text-sm">Water</div>
                            <ConsumptionLabel
                                color="#344D67" unit="m3"
                                consumption={utilities[ConsumptionType.WATER]?.amount}
                                avg={7}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 font-bold bg-muted p-2 justify-center text-[#bf9706]">
                        <img style={{height: "20px", width: "20px"}} src="credit.png"/> {
                        (utilities[ConsumptionType.ELECTRICITY]?.credits ?? 0) +
                        (utilities[ConsumptionType.GAS]?.credits ?? 0) +
                        (utilities[ConsumptionType.WATER]?.credits ?? 0)
                    } earned
                    </div>
                </Card>
                <Link to="/add-utilities" className="mt-2 flex justify-end">
                    <Button variant="outline" className="backdrop-blur-2xl">
                        Scan utility bill
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col">
                <div className="text-2xl px-2 mb-1">Passes</div>
                <Card className="flex flex-col overflow-hidden backdrop-blur-2xl bg-transparent">
                    <div className="flex flex-col bg-background p-4 gap-4">
                        {passes.length > 0 ?
                            passes.map(pass => <div key={pass.id} className="flex items-center gap-2">
                                <div className="bg-primary p-2 rounded-full">
                                    <PassIcon type={pass.type} className="w-6 h-6 text-primary-foreground"/>
                                </div>
                                <div className="flex flex-col">
                                    <PassLabel type={pass.type}/>
                                    <div className="flex flex-row gap-2 items-center text-muted-foreground">
                                        <MdDateRange className="w-4 h-4"/>
                                        {new Date(pass.dateEnd).toLocaleDateString("hu")}
                                    </div>
                                </div>
                            </div>) :
                            <div className="text-center text-lg text-muted-foreground">
                                You don't have any passes
                            </div>
                        }
                    </div>
                    <div className="flex items-center gap-1 font-bold bg-muted p-2 justify-center text-[#bf9706]">
                        <img style={{height: "20px", width: "20px"}} src="credit.png"/> {
                        passes.reduce((acc, pass) => acc + pass.credits, 0)
                    } earned
                    </div>
                </Card>
                <div className="mt-2 flex justify-end">
                    <Button variant="outline" className="backdrop-blur-2xl">
                        Scan pass
                    </Button>
                </div>
            </div>
        </Layout>
    );
}

function ConsumptionLabel({color, unit, consumption, avg}: {
    color: string,
    unit: string,
    consumption?: number,
    avg: number
}) {
    if (consumption !== undefined) {
        return <div className="flex items-center text-lg gap-1" style={{color: color}}>
            {consumption} {unit}
            <span className="text-sm text-muted-foreground"> {
                Math.round(consumption / avg * 100)
            }% of average</span>
        </div>
    } else {
        return <div className="text-lg" style={{color: color}}>
            No record
        </div>
    }
}

function Progress({bg, fg, r, avg, consumption}: {
    bg: string,
    fg: string,
    r: number,
    avg: number,
    consumption?: number
}) {
    const stroke = 12
    const progress = Math.max(0, 1 - (consumption ?? avg) / avg)
    const arcRadius = r - stroke / 2
    const start = [
        r,
        r - arcRadius
    ]
    const end = [
        r + Math.sin(progress * Math.PI * 2) * arcRadius,
        r - Math.cos(progress * Math.PI * 2) * arcRadius
    ]
    const large = progress > 0.5

    return <svg
        className="absolute top-1/2 left-1/2"
        style={{transform: "translate(-50%, -50%)"}}
        width={r * 2}
        height={r * 2}
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            cx={r}
            cy={r}
            r={arcRadius}
            fill="transparent"
            stroke={progress < 1.0 ? bg : fg}
            strokeWidth={stroke}
        />
        {progress < 1.0 && consumption && <path
            d={`
                M ${start[0]} ${start[1]}
                A ${arcRadius} ${arcRadius}
                0 ${large ? 1 : 0} 1
                ${end[0]} ${end[1]}
            `}
            fill="transparent"
            stroke={fg}
            strokeWidth={stroke}
            strokeLinecap="round"
        />}
    </svg>
}

function PassIcon({type, className}: {
    type: PassType,
    className?: string
}) {
    switch (type) {
        case PassType.PUBLIC_TRANSPORT:
            return <FaBusAlt className={className}/>
        case PassType.BIKE_PASS:
            return <MdOutlinePedalBike className={className}/>
    }
}

function PassLabel({type, className}: {
    type: PassType,
    className?: string
}) {
    switch (type) {
        case PassType.PUBLIC_TRANSPORT:
            return <div className={className}>Public transport</div>
        case PassType.BIKE_PASS:
            return <div className={className}>Bike pass</div>
    }
}