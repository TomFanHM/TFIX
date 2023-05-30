"use client";

import { User } from "firebase/auth";
import { PostData } from "./getPosts";
import { AuthModalState, authModalState } from "@/atoms/authModalAom";
import {
  Flex,
  GridItem,
  Heading,
  Link,
  useToast,
  Text,
  HStack,
  Avatar,
  Divider,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { usePost } from "@/hooks/usePost";
import { siteConfig } from "@/config/site";
import { useCallback } from "react";
import OptimizedImage from "@/components/image/OptimizedImage";
import NextLink from "next/link";
import { fromNow } from "@/functions/dateUtils";
import { BsFillEyeFill, BsFillHeartFill, BsShareFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

type BlogPostCardProps = {
  large: boolean;
  banner: boolean;
  user: User | null | undefined;
  post: PostData;
  isCreator: boolean;
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  large,
  banner,
  user,
  post,
  isCreator,
}) => {
  const toast = useToast();
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);
  const { loading, error, onVote, onDeletePost } = usePost();

  //share
  const handleCopyURL = useCallback(async () => {
    try {
      await navigator.clipboard
        .writeText(`${siteConfig.url}/posts/${post.id}`)
        .then(() =>
          toast({
            title: "Copied to clipboard.",
            variant: "solid",
            status: "success",
            isClosable: true,
          })
        );
    } catch (error) {
      toast({
        title: "Failed to copy",
        variant: "solid",
        status: "error",
        isClosable: true,
      });
    }
  }, [post.id]);

  return (
    <GridItem colSpan={{ base: 3, md: large ? 2 : 1 }}>
      <OptimizedImage
        url={post.coverURL}
        alt={post.headline}
        border_radius="20px"
        position="relative"
        w="full"
        maxW="full" //important
        h={{ md: banner ? "500px" : "unset" }}
        sx={{ aspectRatio: "16/9" }}
        color="transparent"
        objectFit="cover"
        loading="lazy"
      />
      <Flex flexDirection="column" mt="4" gap="4">
        <Flex wrap="wrap" gap="4" mt="4">
          {post.tags.map((tag, i) => (
            <Link
              key={i}
              as={NextLink}
              href={"/blogs"}
              textDecoration="underline"
              w="min-content"
            >
              {tag}
            </Link>
          ))}
        </Flex>
        <Heading size="lg">{post.headline}</Heading>
        <Text mt="4" noOfLines={5}>
          {post.introduction}
        </Text>
        <HStack spacing={4}>
          <Avatar
            src={post.creatorPhotoURL}
            name={post.creatorDisplayName}
            pointerEvents="none"
            loading="lazy"
          />
          <Text layerStyle="Medium-emphasis">
            {fromNow(new Date(post.createdAt.seconds * 1000))}
          </Text>
        </HStack>
        <Divider />
        <Flex wrap="wrap" gap="4" mt="4">
          <Button
            isLoading={loading}
            variant="custom_solid"
            leftIcon={<Icon as={BsFillHeartFill} boxSize={6} />}
          ></Button>
          <Button
            isLoading={loading}
            variant="custom_solid"
            leftIcon={<Icon as={BsFillEyeFill} boxSize={6} />}
          >
            {post.views}
          </Button>
          <Button
            isLoading={loading}
            variant="custom_solid"
            leftIcon={<Icon as={BsShareFill} boxSize={6} />}
            onClick={handleCopyURL}
          >
            Share
          </Button>
          {isCreator && (
            <Button
              isLoading={loading}
              variant="custom_solid"
              leftIcon={<Icon as={MdDeleteForever} boxSize={6} />}
            >
              Delete
            </Button>
          )}
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default BlogPostCard;
