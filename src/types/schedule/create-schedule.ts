export class CreateSchedule {
  title?: string;
  startedAt?: Date;
  endedAt?: Date;

  constructor({
    title,
    startedAt,
    endedAt,
  }: {
    title?: string;
    startedAt?: Date;
    endedAt?: Date;
  }) {
    this.title = title;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
  }
}
