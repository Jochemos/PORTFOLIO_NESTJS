import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export default class DataModel {
  commentId?: number;

  @MinLength(5, {
    message: 'Your nick is too short',
  })
  @MaxLength(10, {
    message: 'Your nick is too long',
  })
    author: string;

  @MaxLength(500, {
    message: 'Your comment is too long',
  })
  @IsNotEmpty()
    comment: string;

  created_At?: Date;
}
