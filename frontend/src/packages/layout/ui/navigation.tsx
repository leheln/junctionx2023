import {Link} from 'react-router-dom';

interface NavigationItemProps {
    to: string,
    title: string
}


export function NavigationItem({to, title}: NavigationItemProps) {
    return (
        <Link to={to}
           className={`${window.location.pathname.startsWith(to) ? 'text-foreground' : 'text-muted-foreground'} p-2 mr-3 text-sm`}>
            {title}
        </Link>
    );
}

export function Navigation() {
    return (
        <>
            <NavigationItem to="/dashboard" title="Dashboard"/>
        </>
    );
}
