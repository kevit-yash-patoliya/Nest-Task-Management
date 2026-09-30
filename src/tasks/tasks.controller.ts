import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetAllTasksQueryDto } from './dto/get-tasks.dto';




@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get("/getAllTasks")
  async getAllTasks(@Query() query: GetAllTasksQueryDto) {
    return this.tasksService.getAllTasks(query);
  }

  @Post("/assignTask")
  async assignTask(@Body() body: AssignTaskDto) {
    return this.tasksService.assignTask(body);
  }

  @Patch("/updateTaskStatus")
  async updateTaskStatus(@Body() body: UpdateTaskStatusDto) {
    return this.tasksService.updateTaskStatus(body);
  }

  @Post("/createTask")
  async createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body);
  }
}
