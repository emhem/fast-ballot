import { Accessors } from "./accessors";

export function setup_GetData(): ISetupData {
  return {
    FormTitle: Accessors.GetFormTitle(),
    FormDescription: Accessors.GetFormDescription(),
    PreVotingMessage: Accessors.GetPreVotingMessage(),
    PostVotingMessage: Accessors.GetPostVotingMessage()
  }
}

export function setup_SaveData(formObject: ISetupData): void {
  if (formObject.FormTitle != Accessors.GetFormTitle()) {
    Accessors.SetFormTitle(formObject.FormTitle);
  }
  if (formObject.FormDescription != Accessors.GetFormDescription()) {
    Accessors.SetFormDescription(formObject.FormDescription);
  }
  if (formObject.PreVotingMessage != Accessors.GetPreVotingMessage()) {
    Accessors.SetPreVotingMessage(formObject.PreVotingMessage);
  }
  if (formObject.PostVotingMessage != Accessors.GetPostVotingMessage()) {
    Accessors.SetPostVotingMessage(formObject.PostVotingMessage);
  }
  return;
}

interface ISetupData {
  FormTitle: string;
  FormDescription: string;
  PreVotingMessage: string;
  PostVotingMessage: string;
}
