'use client'

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps{
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;

}

const TripsClient:React.FC<TripsClientProps> = ({
    reservations,
    currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) =>{
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`).then(() => {
            toast.success('Deleted successfully');
            router.refresh();
        }).catch((err) => {
            toast.error(err?.response?.data?.err);
        }).finally(() => {
            setDeletingId('');
        });

    },[router]);

    return ( 
        <Container>
            <Heading 
                title="Trips"
                subtitle="Where you 've been and where you 're going ?"
            />
            <div className="mt-10 grid grid-cols-1 gap-8
             sm:grid-cols-2
             md:grid-cols-3
             lg:grid-cols-4
             xl:grid-cols-5
             2xl:grid-cols-6 ">
                {reservations.map((reservation: any) => (
                    <ListingCard 
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        disabled={deletingId === reservation.id}
                        onAction={onCancel}
                        actionLabel="Cancel Reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>

        </Container>
     );
}
 
export default TripsClient;