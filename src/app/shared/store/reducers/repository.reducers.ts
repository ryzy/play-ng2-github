import { Response } from '@angular/http';

import * as repositoryActions from '../actions/repository.actions';
import { Repository } from '../../model/repository';
import { AppError } from '../../model/app-error';
import { Commit } from '../../model/commit';
import { Issue } from '../../model/issue';
import { PullRequest } from '../../model/pull-request';

/**
 * Repository state schema
 */
export interface State {
  entity: Repository; // currently loaded/displayed repository
  error: AppError; // any error while loading entity and/or commits/issues/pulls etc
  loading: boolean;
  commits: Commit[];
  issues: Issue[];
  pulls: PullRequest[];
  readme: string;
}

export const initialState: State = {
  entity: null,
  error: null,
  loading: false,
  commits: [],
  issues: [],
  pulls: [],
  readme: null,
};

/**
 * Repository reducer
 *
 * @param {State} state
 * @param action
 * @returns {any}
 */
export function reducer(state = initialState, action: repositoryActions.Actions): State {
  // console.log('repository reducer()', {state, action});

  switch (action.type) {
    /**
     * Called when repository got selected from search results
     * or when repository data got loaded from API.
     */
    case repositoryActions.ActionTypes.SELECT:
    case repositoryActions.ActionTypes.LOAD:
      return Object.assign({}, initialState, {
        entity: <Repository>action.payload,
        error: null,
      });

    case repositoryActions.ActionTypes.LOAD_COMMITS:
    case repositoryActions.ActionTypes.LOAD_ISSUES:
    case repositoryActions.ActionTypes.LOAD_PULLS:
    case repositoryActions.ActionTypes.LOAD_README:
      return Object.assign({}, state, {
        loading: true,
      });

    case repositoryActions.ActionTypes.LOAD_COMMITS_COMPLETE:
      return Object.assign({}, state, {
        commits: <Commit[]>action.payload,
        error: null,
        loading: false,
      });

    case repositoryActions.ActionTypes.LOAD_ISSUES_COMPLETE:
      return Object.assign({}, state, {
        issues: <Issue[]>action.payload,
        error: null,
        loading: false,
      });

    case repositoryActions.ActionTypes.LOAD_PULLS_COMPLETE:
      return Object.assign({}, state, {
        pulls: <PullRequest[]>action.payload,
        error: null,
      });

    case repositoryActions.ActionTypes.LOAD_README_COMPLETE:
      return Object.assign({}, state, {
        readme: action.payload,
        error: null,
      });

    case repositoryActions.ActionTypes.LOAD_ERROR:
      // console.log('error reducer(action=LOAD_ERROR)', action.payload);
      const error = <Response>action.payload;
      const errorDecoded = error.json ? error.json() : {}; // in case we have some other, not Response error here
      return Object.assign({}, state, {
        loading: false,
        error: {
          statusCode : error.status,
          message: errorDecoded.message || error.statusText,
        }
      });

    default:
      return state;
  }
}


/**
 * Reducer's selector: get entities in store
 * @param state
 */
export const getEntity = (state: State) => state.entity;
export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
export const getCommits = (state: State) => state.commits;
export const getIssues = (state: State) => state.issues;
export const getPulls = (state: State) => state.pulls;
export const getReadme = (state: State) => state.readme;