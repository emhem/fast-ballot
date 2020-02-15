import { Accessors } from "./accessors";

export module FormSettingsApis {

  /* Closed Form Display Settings */
  export interface IClosedFormDisplaySettings {
    PreVotingMessage: string;
    ShowPreVotingCategoryPreview: boolean;
    PostVotingMessage: string;
  }

  export function GetClosedFormDisplaySettings(): IClosedFormDisplaySettings {
    return {
      PreVotingMessage: Accessors.GetPreVotingMessage(),
      ShowPreVotingCategoryPreview: Accessors.GetShowPreVotingCategoryPreview(),
      PostVotingMessage: Accessors.GetPostVotingMessage()
    }
  }

  export function SetClosedFormDisplaySettings(settings: IClosedFormDisplaySettings): void {
    if (settings.PreVotingMessage != Accessors.GetPreVotingMessage()) {
      Accessors.SetPreVotingMessage(settings.PreVotingMessage);
    }
    if (settings.ShowPreVotingCategoryPreview != Accessors.GetShowPreVotingCategoryPreview()) {
      Accessors.SetShowPreVotingCategoryPreview(settings.ShowPreVotingCategoryPreview);
    }
    if (settings.PostVotingMessage != Accessors.GetPostVotingMessage()) {
      Accessors.SetPostVotingMessage(settings.PostVotingMessage);
    }
    return;
  }
}

export module FormStateApis {

}
