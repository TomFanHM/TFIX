"use client";

import { User } from "firebase/auth";
import React, { useState } from "react";
import { PostData } from "./getPosts";
import { AuthModalState, authModalState } from "@/atoms/authModalAom";
import {
  Flex,
  Heading,
  useToast,
  Text,
  Button,
  Icon,
  GridItem,
  Link,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import NextLink from "next/link";
import { fromNow } from "@/functions/dateUtils";
import OptimizedImage from "@/components/image/OptimizedImage";
import { BsFillEyeFill, BsFillHeartFill, BsShareFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { usePost } from "@/hooks/usePost";

type PostCardProps = {
  id: number;
  user: User | null | undefined;
  post: PostData;
  isCreator?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({ id, user, post, isCreator }) => {
  const large: boolean = id % 5 === 0;
  const banner: boolean = id % 5 === 0 || id % 5 === 1;

  const toast = useToast();
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);

  const { loading, error, onVote, onDeletePost } = usePost();
  const [likes, setLikes] = useState<PostData["likes"]>(post.likes);

  const liked: boolean = user ? likes.includes(user.uid) : false;
  const likeCount = likes.length;

  //share
  const handleCopyURL = async (): Promise<void> => {
    try {
      await navigator.clipboard
        .writeText(`${window.location.href}/posts/${post.id}`)
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
  };

  //delete
  const handleDeletePost = async (): Promise<void> => {
    const success = await onDeletePost(post);
    if (success) {
      toast({
        title: "Deleted.",
        variant: "solid",
        status: "success",
        isClosable: true,
      });
    }
  };

  //vote
  const handleVote = async () => {
    //request user login
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    //if logged in
    const success = await onVote(post, user, liked);
    if (success) {
      const newList = liked
        ? likes.filter((e) => e !== user.uid)
        : [...likes, user.uid];
      setLikes((prev) => ({
        ...prev,
        likes: newList,
      }));
    }
  };

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
              href={"#"}
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
        <Text layerStyle="Medium-emphasis">
          {fromNow(new Date(post.createdAt.seconds * 1000))}
        </Text>
        <Flex
          borderTop="1px solid"
          borderColor="var(--chakra-colors-outline)"
          wrap="wrap"
          gap="4"
          mt="4"
        >
          <Button
            isLoading={loading}
            variant="custom_solid"
            leftIcon={
              <Icon
                as={BsFillHeartFill}
                boxSize={6}
                color={liked ? "red.400" : "var(--chakra-colors-onSurface)"}
              />
            }
            onClick={handleVote}
          >
            {likeCount}
          </Button>
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
              onClick={handleDeletePost}
            >
              Delete
            </Button>
          )}
        </Flex>
      </Flex>
    </GridItem>
  );
};
export default PostCard;