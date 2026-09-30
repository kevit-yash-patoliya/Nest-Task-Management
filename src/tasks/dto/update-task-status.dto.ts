import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "src/lib/enums/status.enum";

export class UpdateTaskStatusDto {

    @ApiProperty({description:"task id", example:"6923c75e3a2e9c7d3a2e9c7d"})
    @IsString()
    @IsNotEmpty()
    taskId!: string;

    @ApiProperty({description:"task status", enum:[TaskStatus.PENDING,TaskStatus.IN_PROGRESS,TaskStatus.COMPLETED,TaskStatus.CANCELLED], example:TaskStatus.COMPLETED})
    @IsString()
    @IsNotEmpty()
    status!: TaskStatus;
}   