import React from "react";
import Filter from "@/components/Filter";
import Breadcrumb from "@/components/BreadCrumb";

const OtherPage = () => {
  return (
    <div className="flex flex-row gap-4">
      <Filter />
      <main className="flex-1 ">
        <Breadcrumb />
      </main>
    </div>
  );
};

export default OtherPage;
