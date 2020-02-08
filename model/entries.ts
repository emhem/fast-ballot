import { Accessors } from "./accessors";

export function entries_GetData(): IEntryData {
  return {
    Entries: Accessors.GetEntries(),
  }
}

export function entries_AddEntry(newEntry: INewEntryInfo): Accessors.Entry[] {
  if (!newEntry) {
    throw "newEntry input is required."
  }

  if (!newEntry.Name) {
    throw "newEntry.Name is required.";
  }

  const entry = new Accessors.Entry();
  entry.Name = newEntry.Name;
  entry.Description = newEntry.Description;
  Accessors.AddEntry(entry);
  return Accessors.GetEntries();
}

interface IEntryData {
  Entries: Accessors.Entry[];
}

interface INewEntryInfo {
  Name: string;
  Description: string;
}
