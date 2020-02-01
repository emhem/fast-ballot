import { Accessors } from "./accessors";

export function setup_GetData(): ISetupData {
  const form = FormApp.getActiveForm();
  return {
    FormURL: form.getPublishedUrl(),
    PreVotingMessage: Accessors.GetPreVotingMessage(),
    PostVotingMessage: Accessors.GetPostVotingMessage(),
    Categories: Accessors.GetCategories()
  }
}

export function setup_SaveClosedFormDisplayInfo(formObject: IClosedFormDisplayInfo): void {
  if (formObject.PreVotingMessage != Accessors.GetPreVotingMessage()) {
    Accessors.SetPreVotingMessage(formObject.PreVotingMessage);
  }
  if (formObject.PostVotingMessage != Accessors.GetPostVotingMessage()) {
    Accessors.SetPostVotingMessage(formObject.PostVotingMessage);
  }
  return;
}

export function setup_AddCategory(formObject: INewCategoryInfo) {
  if (!formObject) { return; }
  if (!formObject.Title) {
    throw "Title is required.";
  }

  const category = new Accessors.Category();
  category.Title = formObject.Title;
  category.Description = formObject.Description;
  Accessors.AddCategory(category);
  return;
}

export function setup_RemoveCategory(id: number) {
  Accessors.RemoveCategory(id);
  return;
}

interface ISetupData {
  FormURL: string;
  PreVotingMessage: string;
  PostVotingMessage: string;
  Categories: Accessors.Category[];
}

interface IClosedFormDisplayInfo {
  PreVotingMessage: string;
  PostVotingMessage: string;
}

interface INewCategoryInfo {
  Title: string;
  Description: string;
}
