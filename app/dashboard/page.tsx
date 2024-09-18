import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function DashBoardPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await prisma.fishCatchData.findMany({});

    return (
        <div>
           DashBoardPage
        </div>
    );
}
