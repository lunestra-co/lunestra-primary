import React from "react";
import Hero from "../components/Hero";
import TrustBadges from "../components/TrustBadges";
import CollectionBanners from "../components/CollectionBanners";
import PromoBanners from "../components/PromoBanners";
import Pedigree from "../components/Pedigree";
import FeaturedCollection from "../components/FeaturedCollection";
import BespokeService from "../components/BespokeService";
import Curator from "../components/Curator";
import RequestQuotationBanner from "../components/RequestQuotationBanner";
import SocialProof from "../components/SocialProof";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <CollectionBanners />
      <PromoBanners />
      <FeaturedCollection />
      <BespokeService />
      <Pedigree />
      <RequestQuotationBanner />
      {/* <Curator /> */}
      <SocialProof />
    </>
  );
}
