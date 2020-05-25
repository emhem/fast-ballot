/**
 * The event handler triggered when opening the form.
 */
export function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput {
  return HtmlService.createTemplateFromFile('index').evaluate();
}


export function include(filename: string): string {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
