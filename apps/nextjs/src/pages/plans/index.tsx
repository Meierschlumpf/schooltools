import { Lesson } from "@acme/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import {
  Button,
  Group,
  ScrollArea,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { PlanMonth } from "../../components/plan/mobile/plan-mobile-month";
import { months } from "../../constants/date";
import { i18nGetServerSideProps } from "../../helpers/i18nGetServerSidePropsMiddleware";
import { useActiveValue } from "../../hooks/useActiveValue";
import { MobileLayout } from "../../layout/mobile/mobile-layout";
import { trpc } from "../../utils/trpc";
import { NextPageWithLayout } from "../_app";
import { appRouter, createContext } from "@acme/api";
import { NextScheduleContext } from "../../contexts/next-schedule-context";

import superjson from "superjson";
const Page: NextPageWithLayout = () => {
  const { t } = useTranslation(["pages/plans/index", "common"]);
  const { data: queryData } = trpc.plan.currentSchoolYear.useQuery();
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    offset: 32,
    duration: 0,
  });

  const data = (queryData ?? [])
    .reduce(
      (prev: { year: number; month: number; lessons: Lesson[] }[], curr) => {
        const index = prev.findIndex(
          (x) =>
            x.year === curr.date.getFullYear() &&
            x.month === curr.date.getMonth(),
        );
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
  const { itemRefs, wrapperRef, updateActiveValue, activeValue, generateKey } =
    useActiveValue({
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
          year: parseInt(yearString!),
          month: parseInt(monthString!),
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
            `${t(`common:month.${months[activeValue.month]}`)} ${
              activeValue.year
            }`
          ) : (
            <Skeleton height={26} width={110} radius="md" />
          )}
        </Title>
        <Button
          variant="subtle"
          compact
          onClick={() => scrollIntoView({ alignment: "start" })}
        >
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
            <PlanMonth
              key={generateKey(m)}
              isFirst={i === 0}
              lessons={m.lessons}
              monthRef={itemRefs.current[generateKey(m)]!}
            />
          ))}
        </NextScheduleContext.Provider>
      </ScrollArea.Autosize>
    </Stack>
  );
};

Page.getLayout = (page) => {
  return <MobileLayout activeTab="plan">{page}</MobileLayout>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext({
      req: context.req as any,
      res: context.res as any,
    }),
    transformer: superjson,
  });

  await ssg.plan.currentSchoolYear.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
      ...(await i18nGetServerSideProps(context, [
        "pages/plans/index",
        "user/common",
      ])),
    },
  };
};
