import { RootState } from '@/core/state';
import {Layout} from '@/packages/layout';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";

export function HomePage() {
    const credits = useSelector((state: RootState) => state.auth.credits)
    return (
        <Layout showNavigation className="flex flex-col">
            <div style={{display: "flex", flexFlow: "row", alignItems: "center", gap:'10px'}}> 
                <img style={{ height: "20px", width: "20px" }} src="credit.png" /> 
                <span>{credits}</span>
            </div>
            <Link to="/code">QR Code</Link>
            <Link to="/add-utilities">Add utility bill</Link>
        </Layout>
    );
}