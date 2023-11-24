import {Layout} from '@/packages/layout';
import {Link} from "react-router-dom";

export function HomePage() {
    return (
        <Layout showNavigation>
            <Link to="/code">QR Code</Link>
        </Layout>
    );
}