import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const typesArray = fileLoader(path.join(__dirname, 'module', '**', '*.gql'))
const typesDefs = mergeTypes(typesArray)

export default typesDefs