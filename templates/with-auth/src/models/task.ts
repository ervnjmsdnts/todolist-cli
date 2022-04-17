import { model, Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string | null;
  completed: boolean;
  owner: string;
}

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task: Model<ITask> = model<ITask>("Task", taskSchema);
