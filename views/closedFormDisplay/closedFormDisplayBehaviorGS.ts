import  * as FastBallotApis from "../../model/apis";

export function CFD$_LoadData(): FastBallotApis.Settings.IClosedFormDisplaySettings {
  return FastBallotApis.Settings.GetClosedFormDisplaySettings();
}

export function CFD$_SaveData(data: FastBallotApis.Settings.IClosedFormDisplaySettings): FastBallotApis.Settings.IClosedFormDisplaySettings {
  if (!data) { throw "In CFD$_SaveData: 'data' is required input"; }
  FastBallotApis.Settings.SetClosedFormDisplaySettings(data);
  return FastBallotApis.Settings.GetClosedFormDisplaySettings(); // Return fresh settings
}
