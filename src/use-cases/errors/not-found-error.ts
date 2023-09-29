export class NotFoundError extends Error {
  constructor() {
    super('No one result found.')
  }
}
