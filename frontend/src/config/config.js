import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

const uploadLink = createUploadLink({
  uri: 'http://localhost:8000/graphql',
});

export const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache()
});