import { Accessors } from "./accessors";
import { FastBallotApis } from "./apis";

export function results_GetData(): Accessors.Result[] {
  return Accessors.GetResults();
}
