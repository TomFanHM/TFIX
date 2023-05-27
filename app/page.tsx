import GridLine from "@/components/container/GridLine";
import GridWrapper from "@/components/container/GridWrapper";
import MotionContainer from "@/components/container/MotionContainer";

import { Heading, Text } from "@/components/chakra/TypographyComponents";
import { GridItem } from "@/components/chakra/LayoutComponents";
import NormalCard from "@/components/chakra/ui/NormalCard";
import LargeCard from "@/components/chakra/ui/LargeCard";
import HeroBanner from "@/components/chakra/ui/HeroBanner";
import BannerText from "@/components/chakra/ui/BannerText";
import CallToAction from "@/components/chakra/ui/CallToAction";
import NewsletterSection from "@/components/chakra/ui/Newsletter";

const Spacer = () => {
  return <GridItem py={{ base: "8", md: "16" }} colSpan={2}></GridItem>;
};

export default function Home() {
  return (
    <GridLine>
      {/* */}
      <HeroBanner
        image="/images/banner.png"
        title={
          <>
            <Text as="span">Your Gateway to </Text>
            <Text
              as="span"
              bgGradient="linear(to-l, var(--chakra-colors-secondary), var(--chakra-colors-tertiary))"
              bgClip="text"
            >
              Discovery
            </Text>
          </>
        }
        message="Unlock endless possibilities, fuel your curiosity, and let your imagination soar in this world of discovery!"
      />
      {/* */}
      <MotionContainer>
        <GridWrapper>
          {/* news */}
          {/* */}
          <GridItem colSpan={2} mx="10">
            <BannerText
              line1="News"
              line2={
                <>
                  <Text as="span" color="var(--chakra-colors-primary)">
                    Stay informed
                  </Text>
                  <Text as="span">, stay connected</Text>
                </>
              }
              line3="Unravel diverse perspectives and explore the world through journalism"
            />
          </GridItem>
          {/* */}
          <GridItem colSpan={2}>
            <LargeCard
              prompt="Catch up now"
              image="/images/news.png"
              mobileImage="/images/news_mobile.png"
              url="/news"
              color="#282828"
            >
              <Heading wordBreak="break-word">Breaking News</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Get the latest headlines and updates in real-time
              </Text>
            </LargeCard>
          </GridItem>

          {/* media, including anime and movie */}
          {/* */}
          <Spacer />
          {/* */}
          <GridItem colSpan={2} mx="10">
            <BannerText
              line1="Media"
              line2="Experience the magic of storytelling"
              line3="Discover a vast collection of movies and anime"
            />
          </GridItem>
          {/* */}
          <GridItem colSpan={2}>
            <LargeCard
              prompt="Watch now"
              image="/images/anime.png"
              mobileImage="/images/anime_mobile.png"
              url="/anime"
              color="#282828"
            >
              <Heading wordBreak="break-word">Featured Anime</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Immerse yourself in our curated anime selection, handpicked by
                our staff for your enjoyment
              </Text>
            </LargeCard>
          </GridItem>
          {/* */}
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="Discover new"
              image="/images/search.png"
              url="/anime/search"
              color="#282828"
            >
              <Heading wordBreak="break-word">New Releases</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Stay updated with the latest anime titles
              </Text>
            </NormalCard>
          </GridItem>
          {/* */}
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="See popular"
              image="/images/movie.png"
              url="/movie"
              color="#282828"
            >
              <Heading wordBreak="break-word">Popular Movie</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Explore the most popular movies loved by our community
              </Text>
            </NormalCard>
          </GridItem>

          {/* blog */}
          {/* */}
          <Spacer />
          {/* */}
          <GridItem colSpan={2} mx="10">
            <BannerText
              line1="Blog"
              line2={
                <>
                  <Text as="span">Share your thoughts, </Text>
                  <Text as="span" color="var(--chakra-colors-primary)">
                    create connections
                  </Text>
                </>
              }
              line3="Voice your opinions and interact with like-minded individuals. Experience the power of collective wisdom"
            />
          </GridItem>
          {/* */}
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="Read more"
              image="/images/blog.png"
              url="/blog"
              color="#282828"
            >
              <Heading wordBreak="break-word">Featured Posts</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Read insightful articles by our talented contributors
              </Text>
            </NormalCard>
          </GridItem>
          {/* */}
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <NormalCard
              prompt="Start writing"
              image="/images/create.png"
              url="/blog/create"
              color="#282828"
            >
              <Heading wordBreak="break-word">Write a Post</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Share your ideas and engage with our growing community
              </Text>
            </NormalCard>
          </GridItem>
          {/* chatbot */}
          {/* */}
          <Spacer />
          {/* */}
          <GridItem colSpan={2} mx="10">
            <BannerText
              line1="Chatbot"
              line2="Embrace engaging interactions"
              line3="Personalized assistance at your fingertips"
            />
          </GridItem>
          {/* */}
          <GridItem colSpan={2}>
            <LargeCard
              prompt="Chat with AI"
              image="/images/chatbot.png"
              mobileImage="/images/chatbot_mobile.png"
              url="/chatbot"
              color="#f4f4f4"
            >
              <Heading wordBreak="break-word">Powered by OpenAI</Heading>
              <Text wordBreak="break-word" fontWeight="bold">
                Experience a cutting-edge chatbot backed by OpenAI&apos;s
                advanced language model, designed to understand and assist you
                better
              </Text>
            </LargeCard>
          </GridItem>
          {/* */}
          <Spacer />
          {/* */}
          <GridItem colSpan={2}>
            <CallToAction
              background="var(--chakra-colors-secondaryContainer)"
              color="var(--chakra-colors-onSecondaryContainer)"
              images={[
                { url: "/images/dummy_600x900.png", aspectRatio: "2/3" },
                { url: "/images/dummy_600x600.png", aspectRatio: "1/1" },
                { url: "/images/dummy_600x900.png", aspectRatio: "2/3" },
                { url: "/images/dummy_600x800.png", aspectRatio: "3/4" },
              ]}
            >
              <Text as="b">Ready for a personalized experience?</Text>
              <Heading mt="6" size={{ base: "2xl", md: "4xl" }}>
                Sign up now and unlock all our features!
              </Heading>
            </CallToAction>
          </GridItem>
          {/* */}
          <Spacer />
          {/* */}
          <GridItem colSpan={2}>
            <NewsletterSection />
          </GridItem>
        </GridWrapper>
      </MotionContainer>
    </GridLine>
  );
}
