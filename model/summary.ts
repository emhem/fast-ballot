import { Accessors } from "./accessors";

function GetSummaryData(): any {
  const votingOpenInfo = getIsVotingOpen();
  return {
    IsVotingOpen: votingOpenInfo.isOpen,
    ClosedFormMessage: votingOpenInfo.closedFormMessage,
    Categories: Accessors.GetCategories(),
    Entries: Accessors.GetEntries(),
    NumberOfResponses: getNumResponses()
  };
}


function getIsVotingOpen(): { isOpen: boolean, closedFormMessage: string } {
  const form = FormApp.getActiveForm();
  return {
    isOpen: form.isAcceptingResponses(),
    closedFormMessage: form.getCustomClosedFormMessage()
  };
}

function getNumResponses(): number {
  const form = FormApp.getActiveForm();
  return form.getResponses().length;
}
