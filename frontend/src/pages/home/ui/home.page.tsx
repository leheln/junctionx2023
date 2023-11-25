import {Layout} from '@/packages/layout';
import {Link} from "react-router-dom";

export function HomePage() {
    return (
        <Layout showNavigation className="flex flex-col">
            <Link to="/code">QR Code</Link>
            <Link to="/add-utilities">Add utility bill</Link>
        </Layout>
    );
}