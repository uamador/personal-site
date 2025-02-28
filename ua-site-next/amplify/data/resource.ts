import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  generateRecipe: a.generation({
    aiModel: a.ai.model('Claude 3 Haiku'),
    systemPrompt: 'You are a helpful assistant that generates recipes based on what the user asked.',
  })
      .arguments({
        description: a.string(),
      })
      .returns(
          a.customType({
            name: a.string(),
            ingredients: a.string().array(),
            instructions: a.string(),
          })
      )
      .authorization((allow) => allow.publicApiKey()),

    cityAdvisor: a.generation({
        aiModel: a.ai.model("Claude 3 Sonnet"),
        systemPrompt: 'You are a helpful assistant that generates tourist advice based on what city the user asked',
    })
        .arguments({
            city: a.string(),
        })
        .returns(
            a.customType({
                city: a.string(),
                advice: a.string(),
            })
        )
        .authorization((allow) => allow.publicApiKey()),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
  },
});
