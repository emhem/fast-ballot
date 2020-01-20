import { Accessors } from "./accessors";

export module FastBallotApis {

  export function CloseVoting(isPostVoting: boolean): void {
    const form = FormApp.getActiveForm();
    let closedFormMessage = null;

    if (!isPostVoting) {
      closedFormMessage = Accessors.GetPreVotingMessage();
    } else {
      closedFormMessage = Accessors.GetPostVotingMessage();
    }

    if (closedFormMessage) {
      form.setCustomClosedFormMessage(closedFormMessage);
    }

    if (form.isAcceptingResponses()) {
      form.setAcceptingResponses(false);
    }

    return;
  }
}
