export class Schedule {
  id: number;
  title: string;
  startedAt: Date;
  endedAt: Date;

  constructor({
    id,
    title,
    startedAt,
    endedAt,
  }: {
    id: number;
    title: string;
    startedAt: Date;
    endedAt: Date;
  }) {
    this.id = id;
    this.title = title;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
  }
}
