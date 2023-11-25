import {Layout} from '@/packages/layout';
import {Link} from "react-router-dom";

export function HomePage() {
    return (
        <Layout showNavigation className="flex flex-col">
            <img style={{ height: "20px", width: "20px" }} src="credit.png" />
            <Link to="/code">QR Code</Link>
            <Link to="/add-utilities">Add utility bill</Link>
        </Layout>
    );
}