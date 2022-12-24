import { type Collection } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { type AuctionListing, type DirectListing } from "@thirdweb-dev/sdk";

interface Props {
  collection: Collection | undefined;
  listings: (AuctionListing | DirectListing)[] | undefined;
}
const styles = {
  text: `font-slate-900 text-m`,
  dataText: `font-slate-900 text-m font-bold`,
};

const CollectionPage: React.FC<Props> = ({ collection, listings }) => {
  const srcForBackground =
    collection?.bannerImage !== undefined ? collection?.bannerImage : "";
  const srcForProfileIMG =
    collection?.profileImage !== undefined ? collection?.profileImage : "";

  const [overflow, setOverflow] = React.useState(false);
  const overflowClass = overflow ? "overflow-visible" : "overflow-hidden h-6";
  const textOverflow = overflow ? "See less" : "See more";
  const handleClick = () => {
    setOverflow((current) => !current);
  };
  const Arrow = () => (overflow ? <VscChevronUp /> : <VscChevronDown />);
  return (
    <>
      <div className="relative -z-10 my-5 h-80 w-full">
        <Image
          alt="background"
          fill
          unoptimized
          src={srcForBackground}
          className="-z-10"
        />
        <div className="absolute bottom-[-4rem] left-5 rounded-xl bg-white">
          <div className="relative h-56 w-56 rounded-xl shadow-2xl">
            <Image
              alt="background"
              fill
              unoptimized
              src={srcForProfileIMG}
              className="rounded-xl p-2"
            />
          </div>
        </div>
      </div>
      <div className="my-20 mx-5 flex w-full flex-col">
        <p className="font-slate-900 text-2xl font-bold">{collection?.title}</p>
        <div className="my-5 flex gap-4">
          <p className={styles.text}>
            Items <span className={styles.dataText}>{listings?.length}</span>
          </p>
          <p className={styles.text}>
            Created at{" "}
            <span className={styles.dataText}>
              {collection?.createdAt?.toLocaleString()?.slice(0, 10)}
            </span>
          </p>
          <p className={styles.text}>
            Creator fee <span className={styles.dataText}>5%</span>
          </p>
          <p className={styles.text}>
            Chain <span className={styles.dataText}>Mumbai</span>
          </p>
        </div>
        <div className={`w-3/5 ${overflowClass}`}>
          <p className={styles.text}>{collection?.description}</p>
        </div>
        <div
          className="flex cursor-pointer items-center gap-1 hover:text-slate-500"
          onClick={handleClick}
        >
          <p className={styles.text}>{textOverflow}</p>
          <Arrow />
        </div>
      </div>
    </>
  );
};

export default CollectionPage;
