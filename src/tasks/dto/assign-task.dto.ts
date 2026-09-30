import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AssignTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description:"task id", example:"6923c75e3a2e9c7d3a2e9c7d"})
  taskId!: string;
  
  @ApiProperty({description:"user id", example:"6923c75e3a2e9c7d3a2e9c7d"})
  @IsString()
  @IsNotEmpty()
  userId!: string;
}