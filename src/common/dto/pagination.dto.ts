import { IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto{
    @IsPositive()
    @Min(1)
    @IsOptional()

    limit?:number

    @IsPositive()
    @IsOptional()
    offset?:number
}