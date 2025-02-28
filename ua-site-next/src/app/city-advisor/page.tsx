"use client";
import { useAIGeneration } from "@/client";
import {
    Button,
    Flex,
    Heading,
    Loader,
    Text,
    TextAreaField,
    SelectField
} from "@aws-amplify/ui-react";
import React from "react";

export default function Page() {
    const [tone, setTone] = React.useState("funny");
    const [city, setCity] = React.useState("Toronto");
    const tourist_request = `Provide tourist advice on the city of ${city} with a ${tone} tone.`;
    const [{ data, isLoading, hasError }, cityAdvisor] =   useAIGeneration("cityAdvisor");

    const handleClick = () => {
        cityAdvisor({tourist_request});
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

                <SelectField label="Tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                    <option value="funny">Funny</option>
                    <option value="serious">Serious</option>
                    <option value="sarcastic">Sarcastic</option>
                </SelectField>
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