import { Owner } from './owner';

/**
 * GitHub repository issue model
 */
export interface Issue {
  id: number;
  html_url: string;
  number: number;
  title: string;

  user: Owner;
  state: string;
  locked: boolean;
  assignee?: Owner|null;
  assignees?: Owner[]|null;
  milestone?: Object|null;
  labels: IssueLabel[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string|null;
  body: string;

  // Remaining properties
  [key: string]: any;
}

export interface IssueLabel {
  id: number;
  url: string;
  name: string;
  color: string; // hex color, but without `#`

  // Remaining properties
  [key: string]: any;
}
