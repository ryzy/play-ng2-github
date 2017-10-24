import { RepositoryOwnerFragment } from '../../core/queries.types';

/**
 * GitHub repository commit model
 */
export interface Commit {
  sha: string;
  commit: {
    message: string;
    comment_count: number;
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
  };
  html_url: string;
  url: string;
  author?: RepositoryOwnerFragment; // on some rare occasions not present (use commit.author)
  committer: RepositoryOwnerFragment;
}
