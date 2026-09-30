import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({type:String,required:true})
    name!:string
    
    @Prop({type:String,required:true})
    email!:string

    @Prop({type:String,default:Date.now})
    createdAt!:Date

    @Prop({type:Date,default:Date.now})
    updatedAt!:Date
}

export const UserSchema = SchemaFactory.createForClass(User);