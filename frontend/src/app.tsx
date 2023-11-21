import {Theme} from 'src/packages/theme';
import {Auth} from 'src/packages/auth';
import {Router} from '@/core/router';
import {Provider} from 'react-redux';
import {store} from '@/core/state';
import {Toaster} from '@/components/ui/toaster.tsx';

function App() {
    return (
        <Provider store={store}>
            <Theme>
                <Auth>
                    <Router/>
                </Auth>
                <Toaster />
            </Theme>
        </Provider>
    );
}

export default App;
