import { firestore } from "@/firebase/firebaseApp";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { getPosts } from "./_components/getPosts";
import { notFound } from "next/navigation";
import BlogContainer from "./_components/BlogContainer";

export const revalidate = 0;
//export const dynamic = "force-dynamic";

async function getData() {
  const postsDocRef = collection(firestore, "posts");
  const q = query(postsDocRef, orderBy("createdAt", "desc"), limit(10));
  const data = await getPosts(q);
  if (!data.length) return null; //no data
  return data;
}

const Blogs = async (): Promise<JSX.Element> => {
  const posts = await getData();
  if (!posts) return notFound();

  return <BlogContainer posts={posts} />;
};

export default Blogs;
