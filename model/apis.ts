import { Accessors } from "./accessors";
import { FormSettingsApis as Settings,FormStateApis as State } from "./formStateApis";

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

    // Delete existing items
    const existingItems = form.getItems();
    existingItems.forEach((item: GoogleAppsScript.Forms.Item)=>{
      let idx = item.getIndex();
      form.deleteItem(idx);
    });

    // Clear existing responses
    form.deleteAllResponses();

    // Create question create
    let template = form.addMultipleChoiceItem();
    template.setChoiceValues(entries.map((entry: Accessors.Entry)=>{
      let text = entry.Name;
      if (entry.Description) {
        text += " ~ " + entry.Description;
      }
      return text;
    }));

    // Create new items
    for (let category of categories) {
      template.duplicate().setTitle(category.Title).setHelpText(category.Description);
    }

    // Delete the template
    form.deleteItem(template.getIndex());

    return;
  }

  export function OpenVoting(): void {
    const form = FormApp.getActiveForm();
    form.setAcceptingResponses(true);
  }
}

export { FormSettingsApis as Settings,FormStateApis as State } from "./formStateApis";
