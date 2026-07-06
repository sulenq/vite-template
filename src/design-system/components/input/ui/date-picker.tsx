// src/design-system/components/input/ui/date-picker.tsx

import { CalendarDate } from "@internationalized/date";
import { memo, useCallback, useMemo, useRef, useState } from "react";

import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type { DatePickerProps } from "@/design-system/components/input/types/date-picker.type";
import type { DateValue } from "@/design-system/components/input/types/date-picker.type";
import {
  buildCalendarGrid,
  buildTimezoneLabel,
  buildYearPage,
  DAYS_HEADER,
  getYearPageStart,
  MONTHS_SHORT,
  parseISODate,
  resolveTimezone,
  getTodayDate,
  toISODate,
  validateDate,
  YEAR_PAGE_SIZE,
} from "@/design-system/components/input/utils/date.utils";
import { Box } from "@/design-system/components/layout/ui/box";
import { HStack, VStack } from "@/design-system/components/layout/ui/stack";
import { P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type View = "day" | "month" | "year";

type DatePickerInternalProps = DatePickerProps & {
  /** Called when the user clicks Confirm. */
  onConfirm?: (value: DateValue) => void;
  /** Called when the user clicks Cancel. */
  onCancel?: () => void;
};

// ---------------------------------------------------------------------------
// Hook: useDatePickerState
// ---------------------------------------------------------------------------

function useDatePickerState(props: DatePickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    disabledDates,
    timezone,
  } = props;

  const controlled = value !== undefined;
  const tz = useMemo(() => resolveTimezone(timezone), [timezone]);
  const todayDate = useMemo(() => getTodayDate(tz), [tz]);

  // Committed value (what has been externally set)
  const [internalValue, setInternalValue] = useState<CalendarDate | null>(() =>
    parseISODate(defaultValue),
  );

  const selectedDate = useMemo<CalendarDate | null>(() => {
    if (controlled) return parseISODate(value);
    return internalValue;
  }, [controlled, internalValue, value]);

  // Temporary selection — what the user is hovering/picking before Confirm
  const [tempDate, setTempDate] = useState<CalendarDate | null>(selectedDate);

  // View state
  const [viewDate, setViewDate] = useState<CalendarDate>(
    () => selectedDate ?? todayDate,
  );
  const [view, setView] = useState<View>("day");

  // Validation constraints
  const validationOptions = useMemo(
    () => ({ min, max, disabledDates }),
    [min, max, disabledDates],
  );

  const tempValidation = useMemo(() => {
    if (!tempDate) return { valid: false as const, reason: "No date selected" };
    return validateDate(tempDate, validationOptions);
  }, [tempDate, validationOptions]);

  const isDateDisabled = useCallback(
    (date: CalendarDate): boolean => {
      return !validateDate(date, validationOptions).valid;
    },
    [validationOptions],
  );

  function commitValue(date: CalendarDate | null) {
    const iso = date ? toISODate(date) : null;
    if (!controlled) {
      setInternalValue(date);
    }
    onValueChange?.(iso);
  }

  function selectTemp(date: CalendarDate) {
    setTempDate(date);
  }

  function confirm() {
    if (!tempValidation.valid) return;
    commitValue(tempDate);
  }

  function reset(date: CalendarDate | null) {
    setTempDate(date);
    setViewDate(date ?? todayDate);
    setView("day");
  }

  return {
    selectedDate,
    tempDate,
    viewDate,
    view,
    todayDate,
    tz,
    tempValidation,
    isDateDisabled,
    selectTemp,
    confirm,
    reset,
    setViewDate,
    setView,
  };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

type NavHeaderProps = {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  onLabelClick?: () => void;
  labelClickable?: boolean;
};

const NavHeader = memo(function NavHeader({
  label,
  onPrev,
  onNext,
  onLabelClick,
  labelClickable = false,
}: NavHeaderProps) {
  return (
    <HStack justify="space-between" align="center" px={2} py={1}>
      <IconButton
        size="xs"
        variant="ghost"
        aria-label="Previous"
        onClick={onPrev}
      >
        <AppTablerIcon icon={IconChevronLeft} boxSize={4} />
      </IconButton>

      <P
        fontWeight="medium"
        cursor={labelClickable ? "pointer" : "default"}
        onClick={labelClickable ? onLabelClick : undefined}
        _hover={labelClickable ? { textDecoration: "underline" } : undefined}
        userSelect="none"
      >
        {label}
      </P>

      <IconButton size="xs" variant="ghost" aria-label="Next" onClick={onNext}>
        <AppTablerIcon icon={IconChevronRight} boxSize={4} />
      </IconButton>
    </HStack>
  );
});

// ---------------------------------------------------------------------------
// Day View
// ---------------------------------------------------------------------------

type DayViewProps = {
  viewDate: CalendarDate;
  selectedDate: CalendarDate | null;
  tempDate: CalendarDate | null;
  todayDate: CalendarDate;
  isDateDisabled: (date: CalendarDate) => boolean;
  onSelectDay: (date: CalendarDate) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToMonthView: () => void;
};

const DayView = memo(function DayView({
  viewDate,
  tempDate,
  todayDate,
  isDateDisabled,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  onGoToMonthView,
}: DayViewProps) {
  const { theme } = useThemeStore();
  const grid = useMemo(
    () => buildCalendarGrid(viewDate.year, viewDate.month),
    [viewDate.year, viewDate.month],
  );

  const label = `${MONTHS_SHORT[viewDate.month - 1]} ${viewDate.year}`;

  return (
    <VStack gap={1}>
      <NavHeader
        label={label}
        onPrev={onPrevMonth}
        onNext={onNextMonth}
        onLabelClick={onGoToMonthView}
        labelClickable
      />

      {/* Day-of-week header */}
      <HStack justify="space-between" px={2}>
        {DAYS_HEADER.map((d) => (
          <Box key={d} w="36px" textAlign="center">
            <P textStyle="xs" color="fg.muted" fontWeight="medium">
              {d}
            </P>
          </Box>
        ))}
      </HStack>

      {/* Calendar grid */}
      <VStack gap={0} px={2}>
        {grid.map((week, wi) => (
          <HStack key={wi} justify="space-between">
            {week.map((cell) => {
              const iso = toISODate(cell.date);
              const isSelected = tempDate ? toISODate(tempDate) === iso : false;
              const isToday = toISODate(todayDate) === iso;
              const disabled = isDateDisabled(cell.date);
              const dimmed = !cell.isCurrentMonth;

              return (
                <Box
                  key={iso}
                  as="button"
                  w="36px"
                  h="36px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  rounded={theme.radii.component}
                  cursor={disabled ? "not-allowed" : "pointer"}
                  onClick={() => !disabled && onSelectDay(cell.date)}
                  aria-label={iso}
                  aria-pressed={isSelected}
                  aria-disabled={disabled}
                  tabIndex={disabled ? -1 : 0}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if ((e.key === "Enter" || e.key === " ") && !disabled) {
                      onSelectDay(cell.date);
                    }
                  }}
                  bg={isSelected ? "colorPalette.solid" : undefined}
                  colorPalette={isSelected ? undefined : undefined}
                  opacity={dimmed && !isSelected ? 0.35 : disabled ? 0.35 : 1}
                  _hover={
                    !disabled && !isSelected ? { bg: "bg.subtle" } : undefined
                  }
                  outline={isToday && !isSelected ? "2px solid" : undefined}
                  outlineColor={
                    isToday && !isSelected ? "colorPalette.solid" : undefined
                  }
                >
                  <P
                    textStyle="sm"
                    color={isSelected ? "white" : undefined}
                    fontWeight={isToday ? "bold" : "normal"}
                    lineHeight={1}
                  >
                    {cell.date.day}
                  </P>
                </Box>
              );
            })}
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
});

// ---------------------------------------------------------------------------
// Month View
// ---------------------------------------------------------------------------

type MonthViewProps = {
  viewDate: CalendarDate;
  onSelectMonth: (month: number) => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  onGoToYearView: () => void;
};

const MonthView = memo(function MonthView({
  viewDate,
  onSelectMonth,
  onPrevYear,
  onNextYear,
  onGoToYearView,
}: MonthViewProps) {
  const { theme } = useThemeStore();

  return (
    <VStack gap={2}>
      <NavHeader
        label={String(viewDate.year)}
        onPrev={onPrevYear}
        onNext={onNextYear}
        onLabelClick={onGoToYearView}
        labelClickable
      />

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} px={2}>
        {MONTHS_SHORT.map((name, i) => {
          const monthNum = i + 1;
          const isActive = viewDate.month === monthNum;

          return (
            <Box
              key={name}
              as="button"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              rounded={theme.radii.component}
              cursor="pointer"
              bg={isActive ? "colorPalette.solid" : undefined}
              _hover={!isActive ? { bg: "bg.subtle" } : undefined}
              onClick={() => onSelectMonth(monthNum)}
              aria-label={name}
              aria-pressed={isActive}
            >
              <P
                textStyle="sm"
                color={isActive ? "white" : undefined}
                fontWeight={isActive ? "medium" : "normal"}
              >
                {name}
              </P>
            </Box>
          );
        })}
      </Box>
    </VStack>
  );
});

// ---------------------------------------------------------------------------
// Year View
// ---------------------------------------------------------------------------

type YearViewProps = {
  viewDate: CalendarDate;
  onSelectYear: (year: number) => void;
  yearPageStart: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

const YearView = memo(function YearView({
  viewDate,
  onSelectYear,
  yearPageStart,
  onPrevPage,
  onNextPage,
}: YearViewProps) {
  const { theme } = useThemeStore();
  const years = useMemo(() => buildYearPage(yearPageStart), [yearPageStart]);

  const label = `${yearPageStart} – ${yearPageStart + YEAR_PAGE_SIZE - 1}`;

  return (
    <VStack gap={2}>
      <NavHeader label={label} onPrev={onPrevPage} onNext={onNextPage} />

      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1} px={2}>
        {years.map((y) => {
          const isActive = viewDate.year === y;

          return (
            <Box
              key={y}
              as="button"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              rounded={theme.radii.component}
              cursor="pointer"
              bg={isActive ? "colorPalette.solid" : undefined}
              _hover={!isActive ? { bg: "bg.subtle" } : undefined}
              onClick={() => onSelectYear(y)}
              aria-label={String(y)}
              aria-pressed={isActive}
            >
              <P
                textStyle="sm"
                color={isActive ? "white" : undefined}
                fontWeight={isActive ? "medium" : "normal"}
              >
                {y}
              </P>
            </Box>
          );
        })}
      </Box>
    </VStack>
  );
});

// ---------------------------------------------------------------------------
// DatePicker (public)
// ---------------------------------------------------------------------------

export const DatePicker = memo(function DatePicker(
  props: DatePickerInternalProps,
) {
  const {
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    disabledDates,
    timezone,
    disabled,
    locale: _locale,
    inputFormat: _inputFormat,
    onConfirm,
    onCancel,
    ...restProps
  } = props;

  const { theme } = useThemeStore();

  const state = useDatePickerState({
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    disabledDates,
    timezone,
    disabled,
  });

  const {
    selectedDate,
    tempDate,
    viewDate,
    view,
    todayDate,
    tz,
    tempValidation,
    isDateDisabled,
    selectTemp,
    confirm,
    reset,
    setViewDate,
    setView,
  } = state;

  const [yearPageStart, setYearPageStart] = useState(() =>
    getYearPageStart(viewDate.year),
  );

  // Keep year page in sync with view when switching
  const prevViewRef = useRef(view);
  if (prevViewRef.current !== view) {
    prevViewRef.current = view;
    if (view === "year") {
      setYearPageStart(getYearPageStart(viewDate.year));
    }
  }

  // Navigation helpers
  function prevMonth() {
    setViewDate((v) =>
      v.month === 1
        ? v.set({ year: v.year - 1, month: 12 })
        : v.set({ month: v.month - 1 }),
    );
  }
  function nextMonth() {
    setViewDate((v) =>
      v.month === 12
        ? v.set({ year: v.year + 1, month: 1 })
        : v.set({ month: v.month + 1 }),
    );
  }
  function prevYear() {
    setViewDate((v) => v.set({ year: v.year - 1 }));
  }
  function nextYear() {
    setViewDate((v) => v.set({ year: v.year + 1 }));
  }
  function prevYearPage() {
    setYearPageStart((p) => p - YEAR_PAGE_SIZE);
  }
  function nextYearPage() {
    setYearPageStart((p) => p + YEAR_PAGE_SIZE);
  }

  function handleSelectMonth(month: number) {
    setViewDate((v) => v.set({ month }));
    setView("day");
  }

  function handleSelectYear(year: number) {
    setViewDate((v) => v.set({ year }));
    setView("month");
  }

  function handleGoToday() {
    setViewDate(todayDate);
    setView("day");
  }

  function handleConfirm() {
    if (!tempValidation.valid) return;
    confirm();
    onConfirm?.(tempDate ? toISODate(tempDate) : null);
  }

  function handleClear() {
    reset(selectedDate);
    onCancel?.();
  }

  const timezoneLabel = useMemo(() => buildTimezoneLabel(tz), [tz]);

  return (
    <VStack
      gap={0}
      rounded={theme.radii.container}
      overflow="hidden"
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? "none" : undefined}
      w="full"
      {...restProps}
    >
      {/* Calendar body */}
      <VStack gap={2} py={3} w="full">
        {view === "day" && (
          <DayView
            viewDate={viewDate}
            selectedDate={selectedDate}
            tempDate={tempDate}
            todayDate={todayDate}
            isDateDisabled={isDateDisabled}
            onSelectDay={selectTemp}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onGoToMonthView={() => setView("month")}
          />
        )}

        {view === "month" && (
          <MonthView
            viewDate={viewDate}
            onSelectMonth={handleSelectMonth}
            onPrevYear={prevYear}
            onNextYear={nextYear}
            onGoToYearView={() => setView("year")}
          />
        )}

        {view === "year" && (
          <YearView
            viewDate={viewDate}
            onSelectYear={handleSelectYear}
            yearPageStart={yearPageStart}
            onPrevPage={prevYearPage}
            onNextPage={nextYearPage}
          />
        )}

        {/* Today button */}
        {view === "day" && (
          <Box px={2} w="full">
            <Button
              variant="subtle"
              size="xs"
              w="full"
              onClick={handleGoToday}
              aria-label="Go to today"
            >
              Today
            </Button>
          </Box>
        )}
      </VStack>

      {/* Footer */}
      <HStack
        borderTop="1px solid"
        borderColor="border.subtle"
        p={3}
        gap={3}
        align="center"
      >
        <P textStyle="xs" color="fg.muted" flex={1} lineClamp={1}>
          {timezoneLabel}
        </P>

        <HStack gap={2}>
          <Button size="sm" variant="ghost" onClick={handleClear}>
            Clear
          </Button>

          <Button
            size="sm"
            primary
            disabled={!tempValidation.valid}
            onClick={handleConfirm}
            aria-label="Confirm date selection"
            title={
              !tempValidation.valid
                ? (tempValidation as { valid: false; reason: string }).reason
                : undefined
            }
          >
            Confirm
          </Button>
        </HStack>
      </HStack>
    </VStack>
  );
});
