import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function DashBoardPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <div>
            <p>Email: {user?.email}</p>
            <p>dashborad</p>
        </div>
    );
}
