import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { string } from "zod";

export default async function Profile() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Capitalize the first letter of the given name
    const capitalizeFirstLetter = (name: string) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const capitalizedGivenName = capitalizeFirstLetter(user.given_name);

    return (
        <div className="p-6 bg-card shadow-md rounded-md">
            <ul className="space-y-2">
                <li className="font-semibold text-lg text-foreground">{user.email}</li>
                <li className="text-muted-foreground">{capitalizedGivenName}</li>
            </ul>
        </div>
    );
}
