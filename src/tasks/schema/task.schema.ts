import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { TaskPriority } from "src/lib/enums/priority.enum";
import { TaskStatus } from "src/lib/enums/status.enum";


export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true ,enum:[TaskStatus.PENDING,TaskStatus.IN_PROGRESS,TaskStatus.COMPLETED,TaskStatus.CANCELLED]})
    status!: TaskStatus;

    @Prop({ required: true, ref: 'User', type: mongoose.Types.ObjectId })
    assignedTo!: mongoose.Types.ObjectId;

    @Prop({ required: true, ref: 'User', type: mongoose.Types.ObjectId })
    createdBy!: mongoose.Types.ObjectId;
    
    @Prop({ required: true , default:Date.now()})
    createdAt!: Date;

    @Prop({ required: true,default:Date.now() })
    updatedAt!: Date;

    @Prop({ required: true })
    dueDate!: Date;

    @Prop({ required: true , enum:[TaskPriority.HIGH,TaskPriority.MEDIUM,TaskPriority.LOW]})
    priority!: TaskPriority;
}

export const TaskSchema = SchemaFactory.createForClass(Task);