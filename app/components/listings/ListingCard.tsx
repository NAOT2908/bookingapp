'use client'

import useCountries from "@/app/hooks/UseCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import HeartButton from "../HearButton";
import Button from "../Button";

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    currentUser?: SafeUser | null;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string | undefined;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    currentUser,
    onAction,
    disabled,
    actionId = "",
    actionLabel
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();


    const location = getByValue(data.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return
        }

        onAction?.(actionId);

    }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;

    }, [reservation]);

    return (
        <div onClick={() => router.push(`/listings/${data.id}`)}
            className="
            col-span-1
            cursor-poiter
            group
        ">
            <div className="flex flex-col gap-2 w-full">
                <div className="w-full relative overflow-hidden aspect-square rounded-xl">
                    <Image
                        fill
                        alt="Listing"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={data.imageSrc}
                        className="h-full w-full object-cover transition group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            currentUser={currentUser}
                            listingId={data.id}
                        />
                    </div>
                </div>
                <div className="text-lg font-semibold">
                    {location?.region},{location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                    $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button 
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>);
}

export default ListingCard;