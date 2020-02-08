import { Accessors } from "./accessors";

export module FastBallotApis {

  export function CloseVoting(isPostVoting: boolean): void {
    const form = FormApp.getActiveForm();
    const closedFormMessage = generateClosedFormMessage(isPostVoting);

    if (closedFormMessage) {
      Accessors.SetIsUsingPostVotingMessage(isPostVoting);
      form.setCustomClosedFormMessage(closedFormMessage);
    }

    if (form.isAcceptingResponses()) {
      form.setAcceptingResponses(false);
    }

    return;
  }

  export function UpdateClosedFormState(): void {
    const form = FormApp.getActiveForm();
    if (form.isAcceptingResponses()) { return;  }

    const isPostVoting = Accessors.GetIsUsingPostVotingMessage();
    const closedFormMessage = generateClosedFormMessage(isPostVoting);

    if (closedFormMessage) {
      form.setCustomClosedFormMessage(closedFormMessage);
    }
    return;
  }

  function generateClosedFormMessage(isPostVoting: boolean): string {
    let closedFormMessage: string = null;
    if (!isPostVoting) {
      closedFormMessage = Accessors.GetPreVotingMessage();

      // Append Category preview
      if (Accessors.GetShowPreVotingCategoryPreview()) {
        closedFormMessage += "\n\n Categories!!!";
        let categories = Accessors.GetCategories();
        for (let category of categories) {
          closedFormMessage += "\n   - " + category.Title;
        }
      }
    } else {
      closedFormMessage = Accessors.GetPostVotingMessage();
    }
    return closedFormMessage;
  }

  export function GenerateBallot(): void {
    const form = FormApp.getActiveForm();
    const categories = Accessors.GetCategories();
    const entries = Accessors.GetEntries();
    return;
  }

  export function OpenVoting(): void {
    const form = FormApp.getActiveForm();
    form.setAcceptingResponses(true);
  }
}
