
import { Accessors } from "./model/accessors";

function test_AddCategory() {
  let category = new Accessors.Category();
  category.Title = "new Title";
  category.Description = "new Description";
  Logger.log(JSON.stringify(category));
  Accessors.AddCategory(category);
  Logger.log(JSON.stringify(Accessors.GetCategories()));
  return;
}

function test_GetEntries() {
  Logger.log(JSON.stringify(Accessors.GetEntries()));
  return;
}

function test_PrintAllDocPropertyValues() {
  const keys = PropertiesService.getDocumentProperties().getKeys();
  for (let key of keys) {
    Logger.log(key + " = " + PropertiesService.getDocumentProperties().getProperty(key));
  }
}

function clearAllCategories() {
  const keys = PropertiesService.getDocumentProperties().getKeys();
  for (let key of keys) {
    if (key.indexOf("CATEGORIES_") > -1) {
      PropertiesService.getDocumentProperties().deleteProperty(key);
    }
  }
}

function clearAllEntries() {
  const keys = PropertiesService.getDocumentProperties().getKeys();
  for (let key of keys) {
    if (key.indexOf("ENTRIES_") > -1) {
      PropertiesService.getDocumentProperties().deleteProperty(key);
    }
  }
}
