"use client";

import React, { useState, useEffect, useCallback } from "react";
import Filter from "@/components/Filter";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/BreadCrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import stationsData from "@/data/stations.json";
import FilterOrder from "@/components/FilterOrder";
const Home = () => {
  const [products, setProducts] = useState(stationsData);
  const [sortOrder, setSortOrder] = useState("");

  const applyFiltersAndSorting = useCallback(() => {
    let filteredProducts = stationsData.filter(
      (station) => station.sort === "Суурин станц"
    );

    if (sortOrder === "hightolow") {
      filteredProducts = filteredProducts.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    } else if (sortOrder === "lowtohigh") {
      filteredProducts = filteredProducts.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    }

    setProducts(filteredProducts);
  }, [sortOrder]);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [applyFiltersAndSorting]);

  const handleOrderChange = (order: string) => {
    setSortOrder(order);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Filter />

      <main className="flex-1 items-center">
        <div className="flex flex-col sm:flex-row justify-between mx-8 sm:mx-10 space-y-4 sm:items-center">
          <Breadcrumb />
          <FilterOrder onOrderChange={handleOrderChange} />
        </div>
        <ScrollArea className="h-full m-4 lg:m-6">
          <ProductGrid title="Суурин станц" products={products} />
        </ScrollArea>
      </main>
    </div>
  );
};

export default Home;
