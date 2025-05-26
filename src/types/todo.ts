import { DateTime } from "next-auth/providers/kakao";

export class TodoData {
  id: number;
  contents: string;
  complete: boolean;
  createdAt: Date;
  completedAt?: Date;

  constructor({
    id,
    contents,
    complete,
    createdAt,
    completedAt,
  }: {
    id: number;
    contents: string;
    complete: boolean;
    createdAt: Date;
    completedAt?: Date;
  }) {
    (this.id = id), (this.contents = contents), (this.complete = complete);
    (this.createdAt = createdAt), (this.completedAt = completedAt);
  }
}
