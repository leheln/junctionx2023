import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {Label} from '@/components/ui/label.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/core/state';
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {axios} from '@/core/axios';
import {login} from '@/packages/auth';

export function LoginPage() {
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn]);

    const submitLogin = () => {
        setError('');

        const data = {
            email,
            password
        };
        axios.post('/api/auth/login', data)
            .then(response => {
                if (response.data.loggedIn) {
                    dispatch(login({
                        id: response.data.id,
                        email: response.data.email,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName
                    }));
                }
            })
            .catch(() => {
                setError('Couldn\'t log you in with the given credentials.')
            });
    };

    return (
        <div className={'flex flex-col h-screen w-screen items-center justify-center'}>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    ref={emailInput}
                                    className={error && 'border-destructive border-2'}
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    onKeyUp={event => {
                                        if (event.key === 'Enter') {
                                            passwordInput.current?.focus();
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    ref={passwordInput}
                                    className={error && 'border-destructive border-2'}
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    onKeyUp={event => {
                                        if (event.key === 'Enter') {
                                            submitLogin();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="text-destructive text-xs text-center pt-5">{error}</div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={submitLogin}>Log in</Button>
                </CardFooter>
            </Card>
        </div>
    );
}