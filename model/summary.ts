import { Accessors } from "./accessors";

function GetSummaryData(): any {
  return {
    FormTitle: Accessors.GetFormTitle(),
    FormDescription: Accessors.GetFormDescription(),
    Results: Accessors.GetResults()
  }
}
