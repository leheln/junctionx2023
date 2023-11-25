import { RootState } from '@/core/state';
import {Layout} from '@/packages/layout';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {axios} from "@/core/axios";
import {Consumption, ConsumptionType} from "@/models/consumption.ts";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

type Utilities = {
    [name: string]: Consumption
}

export function HomePage() {
    const credits = useSelector((state: RootState) => state.auth.credits)
    const [utilities, setUtilities] = useState<Utilities>({})

    useEffect(() => {
        axios.get<Consumption[]>("/api/users/consumptions")
            .then((res) => {
                console.log(res.data)
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
    }, [])
    return (
        <Layout showNavigation className="flex flex-col p-4 gap-4">
            <div style={{display: "flex", flexFlow: "row", alignItems: "center", gap:'10px'}}>
                <img style={{ height: "20px", width: "20px" }} src="credit.png" />
                <span>{credits}</span>
            </div>
            <Link to="/code">QR Code</Link>
            <Link to="/add-utilities">Add utility bill</Link>

            <div className="flex flex-col">
                <div className="text-2xl px-2 mb-1">Utilities</div>
                <Card className="flex flex-col overflow-hidden">
                    <div className="flex flex-row p-2 gap-3 items-center">
                        <div className="relative w-32 h-32">
                            <Progress
                                bg="#ffff007f" fg="#ffff00" r={60}
                                consumption={utilities[ConsumptionType.ELECTRICITY]?.amount}
                                avg={180}
                            />
                            <Progress
                                bg="#8888887f" fg="#888888" r={44}
                                consumption={utilities[ConsumptionType.GAS]?.amount}
                                avg={100}
                            />
                            <Progress
                                bg="#008fff7f" fg="#008fff" r={28}
                                consumption={utilities[ConsumptionType.WATER]?.amount}
                                avg={7}
                            />
                        </div>
                        <div className="flex-grow flex flex-col">
                            <div className="text-sm">Electricity</div>
                            <ConsumptionLabel
                                color="#ffff00" unit="kWh"
                                consumption={utilities[ConsumptionType.ELECTRICITY]?.amount}
                                avg={180}
                            />
                            <div className="text-sm">Gas</div>
                            <ConsumptionLabel
                                color="#888888" unit="m3"
                                consumption={utilities[ConsumptionType.GAS]?.amount}
                                avg={100}
                            />
                            <div className="text-sm">Water</div>
                            <ConsumptionLabel
                                color="#008fff" unit="m3"
                                consumption={utilities[ConsumptionType.WATER]?.amount}
                                avg={7}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-[#ffd53c] bg-accent p-2 justify-center">
                        <img style={{height: "20px", width: "20px"}} src="credit.png"/> {
                            (utilities[ConsumptionType.ELECTRICITY]?.credits ?? 0) +
                            (utilities[ConsumptionType.GAS]?.credits ?? 0) +
                            (utilities[ConsumptionType.WATER]?.credits ?? 0)
                        } earned
                    </div>
                </Card>
                <Link to="/add-utilities" className="mt-2 flex justify-end">
                    <Button variant="outline">
                        Scan utility bill
                    </Button>
                </Link>
            </div>
        </Layout>
    );
}

function ConsumptionLabel({color, unit, consumption, avg}: {color: string, unit: string, consumption?: number, avg: number}) {
    if (consumption) {
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

function Progress({bg, fg, r, avg, consumption}: { bg: string, fg: string, r: number, avg: number, consumption?: number }) {
    const stroke = 12
    const progress = Math.max(0, 1 - (consumption ?? 0) / avg)
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