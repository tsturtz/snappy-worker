export class EditDialogError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
