import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import PropertiesClient from "./PropertiesClient";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

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

    const listings = await getListings({
        userId: currentUser.id,
    });

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Properties"
                    subtitle="No Properties"
                />
            </ClientOnly>
        );
    }


    return ( 
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />


        </ClientOnly>
     );
}
 
export default PropertiesPage;