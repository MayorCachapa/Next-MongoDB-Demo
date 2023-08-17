"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { PostDocument } from "../../models/post";

type Props = {};

type PromptListProps = {
  data: PostDocument[];
  handleTagClick: (clickedTag: string) => void;
};

function PromptCardList({ data, handleTagClick }: PromptListProps) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((item) => (
        <PromptCard
          key={item._id}
          data={item}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

export default function Feed({}: Props) {
  // State to fetch and set posts (initially; an empty array)
  const [posts, setPosts] = useState([]);

  // useEffect to fetch posts from API endpoint
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post");
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    fetchPosts();
  }, []);

  // Method to filter searched items from the post array:
  const filterPosts = (searchedItem: string) => {
    // Generate a case-insensitive regex by adding 'i' as an optional string
    const regex = RegExp(searchedItem, "i");
    // Filter the posts using regex.test (if true, it saves in the array the values that matched the query)
    return posts.filter(
      (item: PostDocument) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  // State for the searchText (initially an empty string)
  const [searchText, setSearchText] = useState("");

  // State for searchTimeout (debounce method ---> prevents the function from triggering too often, improving performance)
  // Because of type errors when setting the Timeout, we use the generic NodeJS.Timeout type as the main and null as the 2ndary
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // State to manage the Searched Results
  const [searchedResult, setSearchedResult] = useState([]);

  // Handle the user input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If there's a searchTimeout, clear it
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      // Set a new searchTimeout by using the setTimeout method. As the callback function, setSearchedResult by filtering the post
      // array with the previously declared method.
      setTimeout(() => {
        const result = filterPosts(e.target.value);
        setSearchedResult(result)
      }, 500)
    )
  };

  // If a user clicks a tag, then set the search query to that item
  const handleTagClick = (clickedTag: string) => {
    setSearchText(clickedTag);

    const result = filterPosts(clickedTag);
    setSearchedResult(result)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Busca tags o usuarios"
          defaultValue={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>
      { searchText ? (
        <PromptCardList data={searchedResult} handleTagClick={handleTagClick} />
      ):
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
      }
    </section>
  );
}
