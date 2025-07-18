"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";

interface MeetingsListHeaderProps {
  hasMeetings: boolean;
}

export const MeetingsListHeader = ({
  hasMeetings,
}: MeetingsListHeaderProps) => {
  const [filters, setFilters] = useMeetingsFilters();
  const [open, setOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const isAnyFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      status: null,
      search: "",
      agentId: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewMeetingDialog open={open} onOpenChange={onOpenChange} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        {hasMeetings && (
          <ScrollArea>
            <div className="flex items-center gap-x-2 p-1">
              <MeetingsSearchFilter />
              <StatusFilter />
              <AgentIdFilter />
              {isAnyFilterModified && (
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={onClearFilters}
                >
                  <XCircleIcon className="size-4" />
                  Clear
                </Button>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </>
  );
};
