import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument } from './schema/task.schema';
import mongoose, { Model, Schema } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UserDocument } from 'src/users/schema/user.schema';
import { GetAllTasksQueryDto } from './dto/get-tasks.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel('Task') private readonly taskModel: Model<TaskDocument>,
        @InjectModel('User') private readonly userModel: Model<UserDocument>
    ) {}
    
    
        async createTask(taskData: CreateTaskDto) {
        const createdTask = new this.taskModel(taskData);
        return createdTask.save();
    }

    async getAllTasks(query: GetAllTasksQueryDto) {
        const { status, assignedTo, createdBy, priority,page,limit } = query;
        const filter: any = {};
        const defaultLimit = Number(limit) || 10;
        const defaultPage = Number(page) || 1;
        const skip = (defaultPage - 1) * defaultLimit;
        if (status) {
            filter.status = status;
        }

        if (assignedTo) {
            filter.assignedTo = assignedTo;
        }

        if (createdBy) {
            filter.createdBy = createdBy;
        }

        if (priority) {
            filter.priority = priority;
        }
        const tasks = await this.taskModel.find(filter).skip(skip).limit(defaultLimit).exec();
        const totalTasks = await this.taskModel.countDocuments(filter).exec();
        return {    
            tasks,
            page: defaultPage,
            limit: defaultLimit,
            total: totalTasks,
            totalPages: Math.ceil(totalTasks / defaultLimit),
            hasNextPage: defaultPage * defaultLimit < totalTasks,
            hasPrevPage: defaultPage > 1,
        };
    }

    async assignTask(assignTaskDto: AssignTaskDto) {
        const { taskId, userId } = assignTaskDto;
        const task = await this.taskModel.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.assignedTo = new mongoose.Types.ObjectId(userId);
        return task.save();    
    }
    
    async updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto) {
        const { taskId, status } = updateTaskStatusDto;
        const task = await this.taskModel.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.status = status;
        return task.save();    
    }
}
