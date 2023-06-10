import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "../reservations/ResercationsClient";
import TripsClient from "../trips/TripsClient";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoriteClient";

const ListingPage = async () => {

    const currentUser = await getCurrentUser();
    const listing = await getFavoriteListings();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Please Login"
                    subtitle="Please Login"
                />
            </ClientOnly>
        );
    }

    if (listing.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="Looks like you have no reservations on your properties."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient 
                currentUser={currentUser}
                listings={listing}
            />
        </ClientOnly>
    );
}

export default ListingPage;