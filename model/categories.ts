import { Accessors } from "./accessors";

function categories_GetData(): Accessors.Category[] {
  return Accessors.GetCategories();
}

function categories_AddCategory(formObject: INewCategory): Accessors.Category[] {
  if (!formObject.Title) { throw "New categories must have a title."; }

  const category = new Accessors.Category();
  category.Title = formObject.Title;
  category.Description = formObject.Description;
  Accessors.AddCategory(category);
  return Accessors.GetCategories();
}

function categories_RemoveCategory(id: string): void {
  Accessors.RemoveCategory(parseInt(id));
  return;
}

interface INewCategory {
  Title: string;
  Description: string;
}
