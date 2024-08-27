'use client';

import { IconCalendar } from '@tabler/icons-react';
import { Button } from '#src/ds/button';
import { Calendar } from '#src/ds/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '#src/ds/popover';
import { cn } from '#src/lib-private/cn';
import type { DateRange } from '#src/lib/react-day-picker';
import { addDays, format } from 'date-fns';
import { useState, type HTMLAttributes, type ReactElement } from 'react';
import type { DayPickerSingleProps } from 'react-day-picker';

export function DatePicker(
  props: DayPickerSingleProps & {
    trigger?: ReactElement;
    formatStr?: string;
    triggerClassName?: string;
    triggerActiveClassName?: string;
  },
) {
  const { trigger, formatStr = 'MMM dd, yyyy', selected, onSelect, ...p } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            icon={<IconCalendar />}
            variant="outline"
            size="narrow"
            className={cn(
              'ui-w-48 ui-justify-start ui-font-medium ui-text-foreground',
              !selected && 'ui-text-muted-foreground',
            )}
          >
            {selected ? format(selected, formatStr) : <span>Pick a date</span>}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="ui-w-auto ui-p-0">
        <Calendar {...p} mode="single" selected={selected} onSelect={onSelect} />
      </PopoverContent>
    </Popover>
  );
}

export function DateRangePicker({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactElement {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  return (
    <div {...props} className={cn('ui-grid ui-gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            icon={<IconCalendar />}
            variant="outline"
            size="narrow"
            className={cn(
              'ui-justify-start ui-text-left ui-font-medium',
              !date && 'ui-text-muted-foreground',
            )}
          >
            {/* eslint-disable-next-line no-nested-ternary -- this is a test */}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'MM/dd/yy')} - {format(date.to, 'MM/dd/yy')}
                </>
              ) : (
                format(date.from, 'MM/dd/yy')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="ui-w-auto ui-p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
