import { Button, Group, ScrollArea, Skeleton, Stack, Title } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { months } from "../../../constants/date";
import { NextScheduleContext } from "../../../contexts/next-schedule-context";
import { useActiveValue } from "../../../hooks/useActiveValue";
import { RouterOutputs } from "../../../utils/trpc";
import { PlanMonth } from "./plan-mobile-month";

interface MobilePlanListProps {
  data: RouterOutputs["plan"]["currentSchoolYear"];
}

export const MobilePlanList = ({ data: queryData }: MobilePlanListProps) => {
  const { t } = useTranslation(["pages/plans/index", "common"]);
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    offset: 32,
    duration: 0,
  });

  const data = (queryData ?? [])
    .reduce(
      (
        prev: {
          year: number;
          month: number;
          lessons: RouterOutputs["plan"]["currentSchoolYear"];
        }[],
        curr,
      ) => {
        const index = prev.findIndex((x) => x.year === curr.date.getFullYear() && x.month === curr.date.getMonth());
        if (index !== -1) {
          prev[index]?.lessons.push(curr);
          return prev;
        }
        prev.push({
          month: curr.date.getMonth(),
          year: curr.date.getFullYear(),
          lessons: [curr],
        });
        return prev;
      },
      [],
    )
    .sort((a, b) => {
      const n = a.year - b.year;
      return n !== 0 ? n : a.month - b.month;
    });

  const firstItem = data.at(0);
  const { itemRefs, wrapperRef, updateActiveValue, activeValue, generateKey } = useActiveValue({
    data,
    initialValue: {
      year: firstItem?.year,
      month: firstItem?.month,
    },
    generateKey(val) {
      return `${val.year}-${val.month}`;
    },
    parseKey(key) {
      const [yearString, monthString] = key.split("-");
      if (!yearString || !monthString) return null;
      return {
        year: parseInt(yearString),
        month: parseInt(monthString),
      };
    },
  });

  useEffect(() => {
    if (!data || activeValue?.year) return;
    updateActiveValue();
  }, [data]);

  if (!firstItem) return null;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return (
    <Stack spacing={0}>
      <Group position="apart" my="xs">
        <Title order={4} align="start">
          {activeValue?.year != undefined && activeValue.month != undefined ? (
            `${t(`common:month.${months[activeValue.month]}.label`)} ${activeValue.year}`
          ) : (
            <Skeleton height={26} width={110} radius="md" />
          )}
        </Title>
        <Button variant="subtle" compact onClick={() => scrollIntoView({ alignment: "start" })}>
          {t("action.nextSchedule")}
        </Button>
      </Group>
      <ScrollArea.Autosize
        ref={wrapperRef}
        maxHeight="calc(100vh - var(--mantine-footer-height) - var(--mantine-header-height) - 64px)"
        onScrollPositionChange={updateActiveValue}
        viewportRef={scrollableRef}
      >
        <NextScheduleContext.Provider
          value={{
            dayRef: targetRef,
            nextScheduleDate:
              (queryData ?? [])
                .filter((x) => x.date >= today)
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .at(0)?.date ?? today,
          }}
        >
          {data.map((m, i) => (
            <PlanMonth key={generateKey(m)} isFirst={i === 0} lessons={m.lessons} monthRef={itemRefs.current[generateKey(m)]!} />
          ))}
        </NextScheduleContext.Provider>
      </ScrollArea.Autosize>
    </Stack>
  );
};
