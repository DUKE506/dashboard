export class Schedule {
  id: string;
  title: string;
  startedAt: Date;
  endedAt: Date;

  constructor({
    id,
    title,
    startedAt,
    endedAt,
  }: {
    id: string;
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
