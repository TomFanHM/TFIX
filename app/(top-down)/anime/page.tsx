import MotionContainer from "@/components/container/MotionContainer";
import React from "react";
import GridWrapper from "@/components/container/GridWrapper";
import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { GridItem } from "@/components/chakra/LayoutComponents";
import OptimizedImage from "@/components/image/OptimizedImage";
import AnimeSection from "./_components/AnimeSection";
import Guide from "./_components/Guide";
import { getCurrentSeason, getAnimes } from "./_components/getAnimes";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 86400; //3600 * 24;

export const metadata: Metadata = {
  title: "Anime",
  description:
    "Experience the magic of anime with our website. We offer the latest news and reviews on the hottest anime shows, movies, and manga.",
};

async function getData() {
  const year = new Date().getFullYear();
  const season = getCurrentSeason();
  const animesRef = collection(firestore, "animes");
  const data = await Promise.all([
    getAnimes(
      query(
        animesRef,
        where("year", "==", year),
        where("season", "==", season),
        orderBy("popularity", "asc"),
        limit(100)
      )
    ),
    getAnimes(
      query(
        animesRef,
        where("status", "==", "Not yet aired"),
        orderBy("popularity", "asc"),
        limit(100)
      )
    ),
    getAnimes(query(animesRef, orderBy("popularity", "asc"), limit(20))),
    getAnimes(
      query(
        animesRef,
        where("genres.Adventure", "==", true),
        orderBy("popularity", "asc"),
        limit(20)
      )
    ),
  ]);

  return data;
}

const Animes = async (): Promise<JSX.Element> => {
  const data = await getData();

  if (!data.length) notFound(); //Promise.all error, show 404

  return (
    <MotionContainer maxW="container.xl">
      <GridWrapper
        gap="64px"
        py={{ base: "6", md: "8" }}
        my={{ base: "6", md: "8" }}
      >
        <GridItem colSpan={2}>
          <OptimizedImage
            url={
              "https://firebasestorage.googleapis.com/v0/b/tfix-fs.appspot.com/o/banner.png?alt=media&token=89cd313e-06cb-4dbe-b00b-d82b7e24f01f"
            }
            alt="banner"
            position="relative"
            color="transparent"
            border_radius="20px"
            w="full"
            maxW="full" //important
            maxH="500px"
            sx={{ aspectRatio: { base: "4/3", md: "16/9" } }}
            objectFit="cover"
            loading="lazy"
          />
        </GridItem>
        <GridItem colSpan={2} w="full" maxW="full" overflow="hidden">
          <AnimeSection title="New releases" anime={data[0]} />
        </GridItem>
        <GridItem colSpan={2} w="full" maxW="full" overflow="hidden">
          <AnimeSection title="Upcoming" anime={data[1]} />
        </GridItem>
        <GridItem colSpan={2} w="full" maxW="full" overflow="hidden">
          <AnimeSection title="Popular" anime={data[2]} />
        </GridItem>
        <GridItem colSpan={2} w="full" maxW="full" overflow="hidden">
          <AnimeSection title="Adventures" anime={data[3]} />
        </GridItem>

        <GridItem colSpan={2}>
          <Guide />
        </GridItem>
      </GridWrapper>
    </MotionContainer>
  );
};

export default Animes;
