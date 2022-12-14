import { type NextPage } from "next";
import React from "react";
import { prisma } from "../../server/db/client";
import { type Collection } from "@prisma/client";
import sortBy from "../../utils/helpers/sortCollections";
import StatsTable from "../../components/StatsTable";

interface StatsProps {
  collections: Collection[];
}

const stats = ["VOLUME", "FLOOR PRICE", "SALES"];

const Stats: NextPage<StatsProps> = ({ collections }) => {
  const [sorted, setSorted] = React.useState(collections);
  const [active, setActive] = React.useState("");

  const handleClick = (e: React.MouseEvent) => {
    // const target = e.target as HTMLElement;
    const target = e.currentTarget.querySelector("p");
    if (target?.innerText === stats[0]) {
      const volumeUp = sortBy(collections, "volumeTraded", "up");
      const volumeDown = sortBy(collections, "volumeTraded", "down");
      active === "VOLUME UP"
        ? (setSorted(volumeDown), setActive("VOLUME DOWN"))
        : (setSorted(volumeUp), setActive("VOLUME UP"));
    } else if (target?.innerText === stats[1]) {
      const priceUp = sortBy(collections, "floorPrice", "up");
      const priceDown = sortBy(collections, "floorPrice", "down");
      active === "FLOOR PRICE UP"
        ? (setSorted(priceDown), setActive("FLOOR PRICE DOWN"))
        : (setSorted(priceUp), setActive("FLOOR PRICE UP"));
    } else if (target?.innerText === stats[2]) {
      const salesUp = sortBy(collections, "sales", "up");
      const salesDown = sortBy(collections, "sales", "down");
      active === "SALES UP"
        ? (setSorted(salesDown), setActive("SALES DOWN"))
        : (setSorted(salesUp), setActive("SALES UP"));
    }
  };
  return (
    <StatsTable collections={sorted} active={active} onClick={handleClick} />
  );
};

export const getServerSideProps = async () => {
  const collections = await prisma.collection.findMany();
  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
};

export default Stats;
