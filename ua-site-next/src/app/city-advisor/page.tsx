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
    const [city, setCity] = React.useState("");
    const [{ data, isLoading, hasError }, cityAdvisor] =   useAIGeneration("cityAdvisor");

    const handleClick = () => {
        cityAdvisor({ city });
    };

    return (
        <Flex direction="column">
            <Flex direction="row">
                <TextAreaField
                    autoResize
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    label="City"
                />
                <Button onClick={handleClick}>Get City Advice</Button>
            </Flex>
            {isLoading ? (
                <Loader variation="linear" />
            ) : (
                <>
                    <Heading level={2}>{data?.city}</Heading>
                    <Text>{data?.advice}</Text>
                </>
            )}
        </Flex>
    );
}