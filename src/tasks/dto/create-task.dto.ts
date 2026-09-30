import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { TaskPriority } from "src/lib/enums/priority.enum";
import { TaskStatus } from "src/lib/enums/status.enum";

export class CreateTaskDto {
    @ApiProperty({description:"task title", example:"task 1"})
    @IsString()
    @IsNotEmpty()
    title!: string;
    @ApiProperty({description:"task description", example:"task description"})
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({description:"task status", example:TaskStatus.PENDING,enum:[TaskStatus.PENDING,TaskStatus.IN_PROGRESS,TaskStatus.COMPLETED,TaskStatus.CANCELLED]})
    @IsString()
    @IsNotEmpty()
    status!: string;

    @ApiProperty({description:"task assigned to", example:"6923c75e3a2e9c7d3a2e9c7d"})
    @IsString()
    @IsNotEmpty()
    assignedTo!: string;

    @ApiProperty({description:"task due date", example:"2022-01-01"})
    @IsString()
    @IsNotEmpty()
    dueDate!: string;
    
    @ApiProperty({description:"task created by", example:"6923c75e3a2e9c7d3a2e9c7d"})
    @IsString()
    @IsNotEmpty()
    createdBy!: string;

    
    @ApiProperty({description:"task priority", example:TaskPriority.HIGH,enum:[TaskPriority.HIGH,TaskPriority.MEDIUM,TaskPriority.LOW]})
    @IsString()
    @IsNotEmpty()
    priority!: string;
}