"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import HotelDetailsPage from "./HotelDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function HotelDetailRoute({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);

  const handleBack = () => {
    router.push("/hotels");
  };

  return <HotelDetailsPage hotelId={resolvedParams.id} onBack={handleBack} />;
}
