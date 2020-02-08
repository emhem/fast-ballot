export module Accessors {

  export function GetPreVotingMessage(): string {
    let val = PropertiesService.getDocumentProperties().getProperty("PRE_VOTING_MESSAGE");
    if (val) {
      return val.toString();
    } else {
      return null;
    }
  }

  export function SetPreVotingMessage(message: string): void {
    PropertiesService.getDocumentProperties().setProperty("PRE_VOTING_MESSAGE", message);
    return;
  }

  export function GetShowPreVotingCategoryPreview(): boolean {
    let val = PropertiesService.getDocumentProperties().getProperty("SHOW_PRE_VOTING_CATEGORY_PREVIEW");
    if (val && val==="1") {
      return true;
    } else {
      return false;
    }
  }

  export function SetShowPreVotingCategoryPreview(value: boolean): void {
    if (value) {
      PropertiesService.getDocumentProperties().setProperty("SHOW_PRE_VOTING_CATEGORY_PREVIEW", "1");
    } else {
      PropertiesService.getDocumentProperties().setProperty("SHOW_PRE_VOTING_CATEGORY_PREVIEW", "0");
    }
    return;
  }

  export function GetPostVotingMessage(): string {
    let val = PropertiesService.getDocumentProperties().getProperty("POST_VOTING_MESSAGE");
    if (val) {
      return val.toString();
    } else {
      return null;
    }
  }

  export function SetPostVotingMessage(message: string): void {
    PropertiesService.getDocumentProperties().setProperty("POST_VOTING_MESSAGE", message);
    return;
  }

  export function GetIsUsingPostVotingMessage(): boolean {
    let val = PropertiesService.getDocumentProperties().getProperty("IS_USING_POST_VOTING_MESSAGE");
    if (val && val==="1") {
      return true;
    } else {
      return false;
    }
  }

  export function SetIsUsingPostVotingMessage(value: boolean): void {
    if (value) {
      PropertiesService.getDocumentProperties().setProperty("IS_USING_POST_VOTING_MESSAGE", "1");
    } else {
      PropertiesService.getDocumentProperties().setProperty("IS_USING_POST_VOTING_MESSAGE", "0");
    }
    return;
  }

  export function GetCategories(): Category[] {
    const categories = [];
    const lastIndex = parseInt(PropertiesService.getDocumentProperties().getProperty("CATEGORIES_LAST_IDX"));
    for (let i = 0; i <= lastIndex; i++) {
      if (PropertiesService.getDocumentProperties().getProperty("CATEGORIES_TITLE_" + i)) {
        let category = new Category();
        category.ID = i;
        category.Title = PropertiesService.getDocumentProperties().getProperty("CATEGORIES_TITLE_" + i);
        category.Description = PropertiesService.getDocumentProperties().getProperty("CATEGORIES_DESCRIPTION_" + i);
        categories.push(category);
      }
    }
    return categories;
  }

  export function AddCategory(category: Category): void {
    let lastIdx = parseInt(PropertiesService.getDocumentProperties().getProperty("CATEGORIES_LAST_IDX"));
    if (!lastIdx) { lastIdx = 0; }
    const newIdx = lastIdx+1;
    PropertiesService.getDocumentProperties().setProperty("CATEGORIES_TITLE_" + newIdx, category.Title);
    PropertiesService.getDocumentProperties().setProperty("CATEGORIES_DESCRIPTION_" + newIdx, category.Description);
    PropertiesService.getDocumentProperties().setProperty("CATEGORIES_LAST_IDX", newIdx.toString());
    return;
  }

  export function RemoveCategory(categoryIndex: number): void {
    PropertiesService.getDocumentProperties().deleteProperty("CATEGORIES_TITLE_" + categoryIndex);
    PropertiesService.getDocumentProperties().deleteProperty("CATEGORIES_DESCRIPTION_" + categoryIndex);
    return;
  }

  export class Category {
    ID: number;
    Title: string;
    Description: string;
  }

  export function GetEntries(): Entry[] {
    const entries = [];
    const lastIndex = parseInt(PropertiesService.getDocumentProperties().getProperty("ENTRIES_LAST_IDX"));
    for (let i = 0; i <= lastIndex; i++) {
      if (PropertiesService.getDocumentProperties().getProperty("ENTRIES_NAME_" + i)) {
        let entry = new Entry();
        entry.ID = i;
        entry.Name = PropertiesService.getDocumentProperties().getProperty("ENTRIES_NAME_" + i);
        entry.Description = PropertiesService.getDocumentProperties().getProperty("ENTRIES_DESCRIPTION_" + i);
        entries.push(entry);
      }
    }
    return entries;
  }

  export function AddEntry(entry: Entry): void {
    let lastIdx = parseInt(PropertiesService.getDocumentProperties().getProperty("ENTRIES_LAST_IDX"));
    if (!lastIdx) { lastIdx = 0; }
    const newIdx = lastIdx+1;
    PropertiesService.getDocumentProperties().setProperty("ENTRIES_NAME_" + newIdx, entry.Name);
    PropertiesService.getDocumentProperties().setProperty("ENTRIES_DESCRIPTION_" + newIdx, entry.Description);
    PropertiesService.getDocumentProperties().setProperty("ENTRIES_LAST_IDX", newIdx.toString());
    return;
  }

  export function RemoveEntry(entryIndex: number) {
    PropertiesService.getDocumentProperties().deleteProperty("ENTRIES_NAME_" + entryIndex);
    PropertiesService.getDocumentProperties().deleteProperty("ENTRIES_DESCRIPTION_" + entryIndex);
    return;
  }

  export class Entry {
    ID: number;
    Name: string;
    Description: string;
  }

  export function GetResults(): Result[] {
    const form = FormApp.getActiveForm();

    const items = form.getItems();
    const responses = form.getResponses();
    const results: Result[] = [];
    for (let item of items) {
      let voteCounts: { [choiceTitle: string]: number } = {};
      let sortedVotes: {choiceTitle: string, numVotes: number}[] = [];
      for (let response of responses) {
        let resultForItem = response.getResponseForItem(item).getResponse().toString();
        voteCounts[resultForItem]++;
      }

      // Construct sorted votes object
      for (let choiceTitle in voteCounts) {
        sortedVotes.push({
          choiceTitle: choiceTitle,
          numVotes: voteCounts[choiceTitle]
        });
      }

      sortedVotes.sort((a: {choiceTitle: string, numVotes: number}, b: {choiceTitle: string, numVotes: number}): number => {
        return (b.numVotes - a.numVotes);
      });

      let result = new Result();
      result.Category = item.getTitle();
      result.Results = sortedVotes;
      results.push(result);
    }

    return results;
  }

  export class Result {
    Category: string;
    Results: any[];
  }


}
