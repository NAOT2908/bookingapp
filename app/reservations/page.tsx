import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationsClient from "./ResercationsClient";


const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="UnAuthorized"
                    subtitle="Please Login"
                />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({
        authorId: currentUser.id,
    })

    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No Reservations found"
                    subtitle=" No Reservations found"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationsClient 
                currentUser={currentUser}
                reservations={reservations}
            />
        </ClientOnly>
    );

}

export default ReservationsPage