import { Project } from 'entities';
import { catchErrors } from 'errors';
import { findEntityOrThrow, updateEntity } from 'utils/typeorm';
import { issuePartial } from 'serializers/issues';

import client from 'utils/vista';

interface NestedSchemas {
  [key: string]: NestedSchemas | string;
}

const transform_to_set = (permissions: any) => {
  const perm_set: NestedSchemas = {};

  permissions.forEach((p: any) => {
    if (!perm_set[p.resource_type]) {
      const nested: NestedSchemas = {}
      perm_set[p.resource_type] = nested;
    }

    if (!(perm_set[p.resource_type] as NestedSchemas)[p.resource_id]) {
      (perm_set[p.resource_type] as NestedSchemas)[p.resource_id] = {}
    }

    ((perm_set[p.resource_type] as NestedSchemas)[p.resource_id] as NestedSchemas)[p.action] = {};
  });

  return perm_set;
}

const has_permission = (perm_set: any, rt: string, ri: string, action: string): boolean => {
  return perm_set[rt] && perm_set[rt][ri] && perm_set[rt][ri][action] != undefined;
}

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {

  const project = await findEntityOrThrow(Project, req.currentUser.projectId, {
    relations: ['users', 'issues'],
  });

  let issues = project.issues.map(issuePartial);

  // check which issues current user can view
  const permissions = await client.users.expand(req.currentUser.id);
  const perm_set = transform_to_set(permissions);
  if (!has_permission(perm_set, 'issues', '*', 'view')) { // if they can't view all, then filter result
    issues = project.issues.filter((issue) => {
      return has_permission(perm_set, 'issues', String(issue.id), 'view');
    });
  }

  res.respond({
    project: {
      ...project,
      issues: issues,
    },
  });
});

export const update = catchErrors(async (req, res) => {
  const project = await updateEntity(Project, req.currentUser.projectId, req.body);
  res.respond({ project });
});
