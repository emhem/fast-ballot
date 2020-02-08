import { Accessors } from "./accessors";
import { FastBallotApis } from "./apis";

export function setup_GetData(): ISetupData {
  const form = FormApp.getActiveForm();
  return {
    ClosedFormDisplayInfo: {
      PreVotingMessage: Accessors.GetPreVotingMessage(),
      ShowPreVotingCategoryPreview: Accessors.GetShowPreVotingCategoryPreview(),
      PostVotingMessage: Accessors.GetPostVotingMessage()
    },
    Categories: Accessors.GetCategories(),
    FormURL: form.getPublishedUrl()
  }
}

export function setup_SaveClosedFormDisplayInfo(closedFormDisplayInfo: IClosedFormDisplayInfo): IClosedFormDisplayInfo {
  if (!closedFormDisplayInfo) {
    throw "closedFormDisplayInfo input is required."
  }

  if (closedFormDisplayInfo.PreVotingMessage != Accessors.GetPreVotingMessage()) {
    Accessors.SetPreVotingMessage(closedFormDisplayInfo.PreVotingMessage);
  }
  if (closedFormDisplayInfo.ShowPreVotingCategoryPreview != Accessors.GetShowPreVotingCategoryPreview()) {
    Accessors.SetShowPreVotingCategoryPreview(closedFormDisplayInfo.ShowPreVotingCategoryPreview);
  }
  if (closedFormDisplayInfo.PostVotingMessage != Accessors.GetPostVotingMessage()) {
    Accessors.SetPostVotingMessage(closedFormDisplayInfo.PostVotingMessage);
  }

  FastBallotApis.UpdateClosedFormState();

  return {
    PreVotingMessage: Accessors.GetPreVotingMessage(),
    ShowPreVotingCategoryPreview: Accessors.GetShowPreVotingCategoryPreview(),
    PostVotingMessage: Accessors.GetPostVotingMessage()
  };
}

export function setup_AddCategory(newCategory: INewCategoryInfo): Accessors.Category[] {
  if (!newCategory) {
    throw "newCategory input is required."
  }

  if (!newCategory.Title) {
    throw "newCategory.Title is required.";
  }

  const category = new Accessors.Category();
  category.Title = newCategory.Title;
  category.Description = newCategory.Description;
  Accessors.AddCategory(category);

  FastBallotApis.UpdateClosedFormState();
  return Accessors.GetCategories();
}

export function setup_RemoveCategory(id: number): Accessors.Category[] {
  Accessors.RemoveCategory(id);

  FastBallotApis.UpdateClosedFormState();
  return Accessors.GetCategories();
}

export function setup_SetInitialClosedVotingState(): void {
  FastBallotApis.CloseVoting(false);
}

interface ISetupData {
  ClosedFormDisplayInfo: IClosedFormDisplayInfo;
  Categories: Accessors.Category[];
  FormURL: string;
}

interface IClosedFormDisplayInfo {
  PreVotingMessage: string;
  ShowPreVotingCategoryPreview: boolean;
  PostVotingMessage: string;
}

interface INewCategoryInfo {
  Title: string;
  Description: string;
}
