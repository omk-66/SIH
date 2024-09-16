import { Button } from '@/components/ui/button';
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function NavBar() {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    return (
        <nav className="bg-background shadow-md border-b border-border py-4 px-6  top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">LOGO</div>
                <div className="flex items-center space-x-4">
                    <div className="space-x-4">
                        {isUserAuthenticated ? (
                            <Button className="bg-destructive hover:bg-destructive-foreground text-white font-semibold py-2 px-4 rounded-md shadow-sm">
                                <LogoutLink>Log out</LogoutLink>
                            </Button>
                        ) : (
                            <>
                                <Button className="bg-primary hover:bg-primary-foreground text-white font-semibold py-2 px-4 rounded-md shadow-sm">
                                    <LoginLink>Sign in</LoginLink>
                                </Button>
                                <Button className="bg-primary hover:bg-primary-foreground text-white font-semibold py-2 px-4 rounded-md shadow-sm">
                                    <RegisterLink>Sign up</RegisterLink>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}