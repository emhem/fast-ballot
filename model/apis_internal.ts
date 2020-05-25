import { Interfaces } from "./static";

export module FastBallotApiInternal {

  /**
   * Create a new FastBallot-enabled Form
   * @param options Option object
   * @returns ID of the created form
   **/
  export function CreateFastBallotForm(options: Interfaces.IFastBallotCreationOptions): string {

    // Create the form
    let form = FormApp.create(options.Title);

    // Close the form
    form.setAcceptingResponses(false);
    form.setShowLinkToRespondAgain(false);

    // Set description
    if (options.Description) {
      form.setDescription(options.Description);
    }

    // Set closed message
    if (options.ClosedFormMessage) {
      form.setCustomClosedFormMessage(options.ClosedFormMessage);
    }

    // Set Categories
    setCategories(form, options.Categories);

    // Return the ID
    return form.getId();
  }

  /**
   * Set entries in the FastBallot-enabled Form
   * @param options Option object
   * @returns ID of the created form
   **/
  export function SetEntriesAndOpenVoting(options: Interfaces.IFastBallotSetEntriesAndOpenVotingOptions): void {
    let id = options.FormID;
    let entries = options.Entries;
    let form = getFormFromID(id);

    // Set Entries
    setEntries(form, entries);

    // Open Form for voting
    if (options.OpenVoting) {
      form.setAcceptingResponses(true);
    }

    return;
  }

  /**
   * Close the FastBallot-enabled Form
   * @param options Option object
   * @returns ID of the created form
   **/
  export function CloseVoting(options: Interfaces.IFastBallotCloseFormOptions): void {
    let id = options.FormID;
    let form = getFormFromID(id);

    // Set closed form message
    if (options.ClosedFormMessage) {
      form.setCustomClosedFormMessage(options.ClosedFormMessage);
    }

    // Close the Form
    form.setAcceptingResponses(false);

    return;
  }

  /**
   * Get the Form object with the given ID
   * @param id ID of the form to retrieve
   * @returns Form object
   **/
  function getFormFromID(id: string): GoogleAppsScript.Forms.Form {
    return FormApp.openById(id);
  }

  /**
   * Create Multiple Choice Items for each voting category
   * @param form Voting form
   * @param categories Array of categories to add
   **/
  function setCategories(form: GoogleAppsScript.Forms.Form, categories: Interfaces.ICategory[]): void {
    for (let category of categories) {
      form.addMultipleChoiceItem().setTitle(category.Title).setHelpText(category.Description);
    }
    return;
  }

  /**
   * Create choices for all multiple choice items in this form
   * @param form Voting form
   * @param entries Array of entries to add
   **/
  function setEntries(form: GoogleAppsScript.Forms.Form, entries: Interfaces.IEntry[]): void {
    let entryChoices = createEntryChoices(entries);
    let items = form.getItems();
    for (let item of items) {
      let categoryItem = item.asMultipleChoiceItem();
      categoryItem.setChoiceValues(entryChoices);
    }
    return;
  }

  /**
   * Create entry values Array
   * @returns Array of string
   **/
  function createEntryChoices(entries: Interfaces.IEntry[]): string[] {
    let entryValueArray = [];
    for (let entry of entries) {
      let value = entry.Name;
      if (entry.Description) {
        value = value + " " + entry.Description;
      }
      entryValueArray.push(value);
    }
    return entryValueArray;
  }

}

export { Interfaces } from "./static";
