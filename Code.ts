import { FastBallotApis } from "./model/apis";
import { Accessors } from "./model/accessors";

/**
 * The event handler triggered when installing the add-on.
 * @param {Event} e The onInstall event.
 */
export function onInstall(e: GoogleAppsScript.Events.AddonOnInstall): void {
  onOpen(e as GoogleAppsScript.Events.FormsOnOpen);
}

/**
 * The event handler triggered when opening the form.
 * @param {Event} e The onOpen event.
 */
export function onOpen(e: GoogleAppsScript.Events.FormsOnOpen): void {
  refreshMenu();
  return;
}

function refreshMenu(): void {
  const form = FormApp.getActiveForm();
  const menu = FormApp.getUi().createMenu("Fast Ballot");
  let prefix: string = null;

  // If closed form display is filled out
  menu.addItem("✔ 1. Setup - Closed Form Display", "showClosedFormDisplay");

  // Show category count
  const categoryCount = Accessors.GetCategories().length;
  if (categoryCount > 0) { prefix = "✔ "; }
  else if (form.isAcceptingResponses()) { prefix = "[DISABLED] " }
  else { prefix = "";}
  menu.addItem(prefix + "2. Setup - Set Categories (Count = " + categoryCount.toString() + ")", "showSetupDialog");

  // Send out the link
  menu.addItem("✔ 3. Send out the link","showSetupDialog");

  // Add entries - only enabled if
  menu.addItem("✔ 4. Add Entries (Count = X)","showEntriesDialog");

  // Open Voting
  menu.addItem("✔ 5. Open Voting","showOpenVotingPrompt");

  // Close Voting & Tabulate Results
  menu.addItem("✔ 4. Close Voting & Tabulate Results","closeVotingAndShowResultsDialog");

  menu.addToUi();
  return;
}

export function include(filename: string): string {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function showClosedFormDisplay(): void {
  const ui = FormApp.getUi();
  const html = HtmlService.createTemplateFromFile("views/closedFormDisplay/closedFormDisplayView").evaluate()
    .setTitle("Fast Ballot - Closed Form Display");
  ui.showModalDialog(html, "Fast Ballot - Closed Form Display");
  return;
}

function showSetupDialog() {
  const form = FormApp.getActiveForm();
  const ui = FormApp.getUi();

  // Don't allow editing this if voting is open
  if (form.isAcceptingResponses()) {
    const alertResponse = ui.alert("You can't edit these settings while voting is open. Close voting?", ui.ButtonSet.YES_NO);
    if (alertResponse == ui.Button.NO || alertResponse == ui.Button.CLOSE) {
      return;
    } else {
      form.setAcceptingResponses(false);
    }
  }

  // Show settings
  const html = HtmlService.createTemplateFromFile("views/setup").evaluate()
    .setTitle("Fast Ballot - Setup");
  ui.showModalDialog(html, "Fast Ballot - Setup");

  refreshMenu();

  return;
}

function showEntriesDialog() {
  const form = FormApp.getActiveForm();
  const ui = FormApp.getUi();

  // Don't allow editing this if voting is open
  if (form.isAcceptingResponses()) {
    ui.alert("You can't edit these settings while voting is open.", ui.ButtonSet.OK);
    return;
  }

  // Show the form
  const html = HtmlService.createTemplateFromFile("views/entries").evaluate()
    .setTitle("Fast Ballot - Entries");
  FormApp.getUi().showModalDialog(html, "Fast Ballot - Entries");



  return;
}

function showOpenVotingPrompt() {
  const form = FormApp.getActiveForm();
  const ui = FormApp.getUi();
  const alertResponse = ui.alert("Are you sure you want to open voting for "+ form.getTitle() +"? \n\n (Existing items and responses will be deleted.)", ui.ButtonSet.YES_NO);
  if (alertResponse == ui.Button.YES) {
    FastBallotApis.GenerateBallot();
    FastBallotApis.OpenVoting();
  }
  return;
}

function closeVotingAndShowResultsDialog() {

  // Stop accepting responses if this hasn't been done already
  FastBallotApis.CloseVoting(true);

  // Show results in an easy-to-digest manner
  const html = HtmlService.createTemplateFromFile("views/results").evaluate()
    .setTitle("Fast Ballot - Setup");
  FormApp.getUi().showModalDialog(html, "Fast Ballot - Results");
  return;
}
