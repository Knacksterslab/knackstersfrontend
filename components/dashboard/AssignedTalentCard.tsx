'use client';

import React, { useMemo } from 'react';
import { UserCheck } from 'lucide-react';

interface AssignedTo {
  fullName: string;
  avatarUrl?: string | null;
}

interface ProjectTask {
  id: string;
  assignedTo?: AssignedTo | null;
}

interface Project {
  tasks?: ProjectTask[];
}

interface AssignedTalentItem {
  fullName: string;
  avatarUrl?: string | null;
  activeTaskCount: number;
}

interface AssignedTalentCardProps {
  projects: Project[];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function buildAssignedTalent(projects: Project[]): AssignedTalentItem[] {
  const byName = new Map<string, AssignedTalentItem>();

  for (const project of projects) {
    for (const task of project.tasks ?? []) {
      if (!task.assignedTo?.fullName) continue;
      const key = task.assignedTo.fullName.trim().toLowerCase();
      const existing = byName.get(key);

      if (!existing) {
        byName.set(key, {
          fullName: task.assignedTo.fullName,
          avatarUrl: task.assignedTo.avatarUrl,
          activeTaskCount: 1,
        });
        continue;
      }

      existing.activeTaskCount += 1;
      if (!existing.avatarUrl && task.assignedTo.avatarUrl) {
        existing.avatarUrl = task.assignedTo.avatarUrl;
      }
    }
  }

  return [...byName.values()].sort((a, b) => {
    if (b.activeTaskCount !== a.activeTaskCount) {
      return b.activeTaskCount - a.activeTaskCount;
    }
    return a.fullName.localeCompare(b.fullName);
  });
}

export default function AssignedTalentCard({ projects }: AssignedTalentCardProps) {
  const assignedTalent = useMemo(() => buildAssignedTalent(projects), [projects]);
  const topTalent = assignedTalent.slice(0, 4);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <UserCheck className="w-5 h-5 text-blue-600" />
        <h3 className="text-base font-semibold text-gray-900">Assigned Talent</h3>
      </div>

      {topTalent.length === 0 ? (
        <p className="text-sm text-gray-500">
          No talent assigned yet. Once tasks are staffed, your active team appears here.
        </p>
      ) : (
        <div className="space-y-3">
          {topTalent.map((person) => (
            <div
              key={person.fullName}
              className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center flex-shrink-0">
                  {person.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={person.avatarUrl}
                      alt={person.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-xs font-semibold">
                      {getInitials(person.fullName)}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{person.fullName}</p>
                  <p className="text-xs text-gray-500">Knackster</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full flex-shrink-0">
                {person.activeTaskCount} task{person.activeTaskCount === 1 ? '' : 's'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
