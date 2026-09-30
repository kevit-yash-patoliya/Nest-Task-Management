import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class GetAllTasksQueryDto {
  @ApiProperty({ name: "status", required: false })
  @IsOptional()
  @IsString()
  status?: string;
  @ApiProperty({ name: "assignedTo", required: false })
  @IsOptional()
  @IsString()
  assignedTo?: string;
  @ApiProperty({ name: "createdBy", required: false })
  @IsOptional()
  @IsString()
  createdBy?: string;
  @ApiProperty({ name: "priority", required: false })
  @IsOptional()
  @IsString()
  priority?: string;
  @ApiProperty({ name: "page", required: false, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;
  @ApiProperty({ name: "limit", required: false, type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}