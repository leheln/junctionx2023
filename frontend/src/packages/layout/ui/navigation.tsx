import {Link} from 'react-router-dom';
import {FaHome} from "react-icons/fa";
import {IconType} from "react-icons";
import {MdEvent} from "react-icons/md";
import {IoBag} from "react-icons/io5";

interface NavigationItemProps {
    to: string,
    title: string,
    Icon: IconType,
}


export function NavigationItem({to, title, Icon}: NavigationItemProps) {
    return (
        <Link
            to={to}
            className={`
                ${window.location.pathname.startsWith(to) ? 'text-foreground' : 'text-muted-foreground'}
                w-20 p-3 flex flex-col items-center
            `}>

            <Icon className="w-6 h-6"/>
            {title}
        </Link>
    );
}

export function Navigation() {
    return (
        <div className="flex justify-evenly items-center">
            <NavigationItem to="/home" title="Home" Icon={FaHome}/>
            <NavigationItem to="/events" title="Events" Icon={MdEvent}/>
            <NavigationItem to="/store" title="Store" Icon={IoBag}/>
        </div>
    );
}
