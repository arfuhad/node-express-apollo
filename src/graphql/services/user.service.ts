import { PrismaClient } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";
import { extractSelection } from "../utiils/extractSelections";

interface GetUsersArgs {
  info: GraphQLResolveInfo;
}

interface GetUserArgs extends GetUsersArgs{
  id: string;
}

interface UserInput{
  email: string;
  username?: string;
}

const prisma = new PrismaClient();

export const getUsers = async ({info}:GetUsersArgs) => {
  const exteractedSelections = extractSelection(info);
  const postsIncluded = exteractedSelections.includes("posts");

  if(postsIncluded){
    return await prisma.user.findMany({include: {posts: true}});
  }
  return await prisma.user.findMany();
}

export const getUser =async ({id, info}: GetUserArgs) => {
  const exteractedSelections = extractSelection(info);
  const postsIncluded = exteractedSelections.includes("posts");
  if(postsIncluded){
    return await prisma.user.findMany({where: {id}, include: {posts: true}});
  }
  return await prisma.user.findMany({where: {id}, });
}

export const createUser =async ({email, username}: UserInput) => {
  console.log("Create user in user service");
  
  console.log({email, username});

  const createUser = await prisma.user.create({
    data: {
      email,
      username
    }
  });
  
  console.log(createUser);
  return createUser;
}