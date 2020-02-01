import { FastBallotApis } from "./model/apis";

/**
 * The event handler triggered when installing the add-on.
 * @param {Event} e The onInstall event.
 */
function onInstall(e: GoogleAppsScript.Events.AddonOnInstall): void {
  onOpen(e as GoogleAppsScript.Events.FormsOnOpen);
}

/**
 * The event handler triggered when opening the form.
 * @param {Event} e The onOpen event.
 */
function onOpen(e: GoogleAppsScript.Events.FormsOnOpen): void {
  FormApp.getUi().createMenu("Fast Ballot")
    .addItem("Summary", "showSummarySidebar")
    .addItem("1. Basic Setup & Set Categories", "showSetupDialog")
    .addItem("2. Make the Link Public", "showPublicLink")
    .addItem("4. Add Entries", "showEntriesDialog")
    .addItem("5. Open Voting", "showOpenVotingPrompt")
    .addItem("6. Close Voting & Tabulate Results", "closeVotingAndShowResultsDialog")
    .addToUi();


    //.addItem("3. Set Categories", "showCategoriesDialog")
  return;
}

function include(filename: string): string {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function showSummarySidebar() {
  const html = HtmlService.createTemplateFromFile("views/summary").evaluate()
    .setTitle("Fast Ballot - Summary");
  FormApp.getUi().showSidebar(html);
  return;
}

function showSetupDialog() {
  const html = HtmlService.createTemplateFromFile("views/setup").evaluate()
    .setTitle("Fast Ballot - Setup");
  FormApp.getUi().showModalDialog(html, "Fast Ballot - Setup");
  return;
}

function showPublicLink() {
  const form = FormApp.getActiveForm();

  // Not accepting responses initially
  FastBallotApis.CloseVoting(false);

}

function showCategoriesDialog() {
  const html = HtmlService.createTemplateFromFile("views/categories").evaluate()
    .setTitle("Fast Ballot - Categories");
  FormApp.getUi().showModalDialog(html, "Fast Ballot - Categories");
  return;
}

function showEntriesDialog() {
  const html = HtmlService.createTemplateFromFile("views/entries").evaluate()
    .setTitle("Fast Ballot - Entries");
  FormApp.getUi().showModalDialog(html, "Fast Ballot - Entries");
  return;
}

function showOpenVotingPrompt() {
  const ui = FormApp.getUi();
  const alertResponse = ui.alert("Are you sure you want to open voting for {NAME}?", ui.ButtonSet.YES_NO);

  if (alertResponse == ui.Button.YES) {
    // TODO: Generate Ballot
    // TODO: Open the form
  }
  return;
}

function closeVotingAndShowResultsDialog() {

  // Stop accepting responses if this hasn't been done already
  FastBallotApis.CloseVoting(true);

  // Get result info

  // Show results in an easy-to-digest manner
  const html = HtmlService.createTemplateFromFile("views/results").evaluate()
    .setTitle("Fast Ballot - Setup");
  FormApp.getUi().showModalDialog(html, "Fast Ballot - Results");
  return;
}
