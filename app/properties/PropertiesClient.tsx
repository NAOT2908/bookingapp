'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface PropertiesClientProps{
    currentUser?: SafeUser | null;
    listings: SafeListing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    currentUser,
    listings
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) =>{
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`).then(() => {
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
                title="Properties"
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
                        actionId={item.id}
                        disabled={deletingId === item.id}
                        onAction={onCancel}
                        actionLabel="Delete Properties"
                    />
                ))}
            </div>
        </Container>
     );
}

 
export default PropertiesClient;