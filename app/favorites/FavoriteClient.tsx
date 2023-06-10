'use client'

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps{
    currentUser?: SafeUser | null;
    listings: SafeListing[];
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    currentUser,
    listings
}) => {
    return ( 
        <Container>
            <Heading 
                title="Favorites"
                subtitle="Likes"
            />
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2
             md:grid-cols-3
             lg:grid-cols-4
             xl:grid-cols-5
             2xl:grid-cols-6">
                {listings.map((item) => (
                    <ListingCard 
                        key={item.id}
                        data={item}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
     );
}

 
export default FavoritesClient;