"use client";
import { useEffect } from "react";
import { useShops } from "../use-shops";
import { ShopCard } from "./card";
import { ShopsError } from "./error";
import { ShopsLoading } from "./loading";
import { ShopsNotFound } from "./not-found";

type Props = {
  locale: string;
};

export default function ShopsCards({}: Props) {
  const { fetchShops, shops, status } = useShops();

  useEffect(() => {
    fetchShops();
  }, []);

  const renderContent = () => {
    if (status === "loading") {
      return <ShopsLoading />;
    }

    if (status === "error") {
      return <ShopsError />;
    }

    if (shops.length === 0 && status === "success") {
      return <ShopsNotFound />;
    }

    if (shops.length > 0 && status === "success") {
      return shops.map((shop) => <ShopCard key={shop.uniqueId} shop={shop} />);
    }
  };

  return <div className="mt-8 space-y-4">{renderContent()}</div>;
}
