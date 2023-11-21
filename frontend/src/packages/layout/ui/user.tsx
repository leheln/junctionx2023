import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar.tsx';
import {axios} from '@/core/axios';
import {useToast} from '@/components/ui/use-toast.ts';
import {logout} from '@/packages/auth';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/core/state';

export function User() {
    const {email, firstName, lastName} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const {toast} = useToast();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatars/01.png" alt="HackerMen"/>
                        <AvatarFallback>{firstName?.charAt(0).toUpperCase() + "" + lastName?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{`${firstName} ${lastName}`}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => {
                    axios.post('/api/auth/logout')
                        .then(() => {
                            dispatch(logout());
                        })
                        .catch(() => {
                            toast({
                                variant: 'destructive',
                                title: 'An error has occurred.',
                                description: 'Try reloading the page. If the issue persists please contact support.'
                            });
                        });
                }}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
