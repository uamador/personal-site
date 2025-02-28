"use client";
import { useAIGeneration } from "@/client";
import {
  Button,
  Flex,
  Heading,
  Loader,
  Text,
  TextAreaField,
  View,
} from "@aws-amplify/ui-react";
import React from "react";

export default function Page() {
  const [description, setDescription] = React.useState("");
  const [{ data, isLoading, hasError }, generateRecipe] =
      useAIGeneration("generateRecipe");

  const handleClick = () => {
    generateRecipe({ description });
  };

  return (
      <Flex direction="column">
        <Flex direction="row">
          <TextAreaField
              autoResize
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
          />
          <Button onClick={handleClick}>Generate recipe</Button>
        </Flex>
        {isLoading ? (
            <Loader variation="linear" />
        ) : (
            <>
              <Heading level={2}>{data?.name}</Heading>
              <View as="ul">
                {data?.ingredients?.map((ingredient) => (
                    <Text as="li" key={ingredient}>
                      {ingredient}
                    </Text>
                ))}
              </View>
              <Text>{data?.instructions}</Text>
            </>
        )}
      </Flex>
  );
}