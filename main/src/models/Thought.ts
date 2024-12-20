import { Schema, Model, Document, ObjectId } from "mongoose";

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: []
}