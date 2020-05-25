export module Interfaces{

  /**
   * Input settings for creating a new FastBallot voting form
   **/
  export interface IFastBallotCreationOptions {
    Title: string;
    Description: string | undefined;
    ClosedFormMessage: string | undefined;
    Categories: ICategory[];
  }

  /**
   * Input settings for closing the voting form
   **/
  export interface IFastBallotSetEntriesAndOpenVotingOptions {
    FormID: string;
    Entries: IEntry[];
    OpenVoting: boolean;
  }

  /**
   * Input settings for closing the voting form
   **/
  export interface IFastBallotCloseFormOptions {
    FormID: string;
    ClosedFormMessage: string | undefined;
  }

  /**
   * Category object
   **/
  export interface ICategory {
    Title: string;
    Description: string | undefined;
  }

  /**
   * Entry object
   **/
  export interface IEntry {
    Name: string;
    Description: string | undefined;
  }
}
