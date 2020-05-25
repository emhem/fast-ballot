import { FastBallotApiInternal, Interfaces } from "./apis_internal";

export function CreateFastBallotEnabledForm(input: any): string {
  let validatedInput = (input as Interfaces.IFastBallotCreationOptions);
  return FastBallotApiInternal.CreateFastBallotForm(validatedInput);
}

export function SetEntriesAndOpenVoting(input: any): void {
  let validatedInput = (input as Interfaces.IFastBallotSetEntriesAndOpenVotingOptions);
  FastBallotApiInternal.SetEntriesAndOpenVoting(validatedInput);
  return;
}

export function CloseVoting(input: any): void {
  let validatedInput = (input as Interfaces.IFastBallotCloseFormOptions);
  FastBallotApiInternal.CloseVoting(validatedInput);
  return;
}
