import {GraphQLResolveInfo} from 'graphql';
import { createUser, getUser, getUsers } from '../services/user.service';

export const userResolver = {
  Qurey: {
    async users(_:any, args: Record<string, any>, context: any, info: GraphQLResolveInfo){
      return await getUsers({info});
      // return [];
    },
    async user(_:any, args: Record<string, any>,  context: any, info: GraphQLResolveInfo){
      return await getUser({id: args.id, info});
      // return [];
    },
  },
  Mutation: {
    async createUser(_: any, args: Record<string, any>,){
      console.log({args});
      return await createUser({email: args.input.email, username: args.input.username});
    },
    async updateUser(){},
    async deleteUser(){},

  }
}