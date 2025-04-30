"use client";

import { useState } from "react";

import { useRequireAuth } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { getAgent, getOrders } from "@/api";
import useStore from "@/context/store";
import { ProfileOrderTable } from "@/components/table";

import CartLoader from "@/components/loader/CartLoader";
import { SortOrders } from "@/components/sort";

const ProfileOrdersPage = () => {
  const auth = useStore((s) => s.auth);

  const [kontragentName, setKontragentName] = useState<string | null>(null);
  const [orderPriceStatus, setOrderPriceStatus] = useState<string | null>(null);
  const [orderDeleveryType, setOrderDeleveryType] = useState<string | null>(
    null
  );
  const [orderType, setOrderType] = useState<string | null>(null);
  useRequireAuth();
  const [periodStart, setPeriodStart] = useState<Date | undefined>(undefined);
  const [periodEnd, setPeriodEnd] = useState<Date | undefined>(undefined);
  const [orderNumber, setOrderNumber] = useState<string>("");

  const { data: orderData, isLoading } = useQuery({
    queryKey: [
      "orders",
      kontragentName,
      orderPriceStatus,
      orderDeleveryType,
      orderType,
      periodStart,
      periodEnd,
      orderNumber,
    ],
    queryFn: () =>
      getOrders(
        kontragentName,
        orderPriceStatus,
        orderDeleveryType,
        orderType,
        periodStart,
        periodEnd,
        orderNumber
      ),
    enabled: auth,
  });
  const { data: agentsData = [] } = useQuery({
    queryKey: ["contragents"],
    queryFn: () => getAgent(),
    enabled: auth,
  });
  const contrAgents = agentsData?.user_kontragents || [];
  const props = {
    setKontragentName,
    setOrderPriceStatus,
    setOrderDeleveryType,
    setOrderType,
    setOrderNumber,
    setPeriodStart,
    setPeriodEnd,
    periodEnd,
    periodStart,
    contrAgents,
  };

  return (
    <section className="bg-white p-6 shadow-sectionShadow">
      <div className="pt-5 pb-10">
        <SortOrders props={props} />

        <div
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="w-full overflow-x-auto"
        >
          {isLoading ? (
            <div className="fixed top-[189px] left-0 right-0 w-screen z-50">
              <div className="container mx-auto relative">
                <CartLoader className="h-1 w-full" />
              </div>
            </div>
          ) : (
            <ProfileOrderTable orders={orderData?.orders} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileOrdersPage;
