import { ScrollArea, Stack, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { createRef, RefObject, useRef, useState } from "react";
import { Lesson } from "../../components/plan/mobile/lesson";
import { months, PlanMonth } from "../../components/plan/mobile/month";
import { i18nGetServerSideProps } from "../../helpers/i18nGetServerSidePropsMiddleware";
import { useActiveValue } from "../../hooks/useActiveValue";
import { MobileLayout } from "../../layout/mobile/mobile-layout";
import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const data = exampleData
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

  const firstItem = data.at(0)!;
  const {
    itemRefs,
    wrapperRef,
    onScrollPositionChange,
    activeValue,
    generateKey,
  } = useActiveValue({
    data,
    initialValue: {
      year: firstItem.year,
      month: firstItem.month,
    },
    generateKey(val) {
      return `${val.year}-${val.month}`;
    },
    parseKey(key) {
      const [yearString, monthString] = key.split("-");
      return {
        year: parseInt(yearString!),
        month: parseInt(monthString!),
      };
    },
  });

  return (
    <Stack spacing={0}>
      <Title order={4} align="start">
        {`${months[activeValue.month]} ${activeValue.year}`}
      </Title>
      <ScrollArea.Autosize
        ref={wrapperRef}
        maxHeight="calc(100vh - var(--mantine-footer-height) - var(--mantine-header-height) - 64px)"
        onScrollPositionChange={onScrollPositionChange}
      >
        {data.map((m, i) => (
          <PlanMonth
            isFirst={i === 0}
            lessons={m.lessons}
            monthRef={itemRefs.current[generateKey(m)]!}
          />
        ))}
      </ScrollArea.Autosize>
    </Stack>
  );
};

Page.getLayout = (page) => {
  return <MobileLayout activeTab="plan">{page}</MobileLayout>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await i18nGetServerSideProps(context, [
        "pages/plans/index",
        "user/common",
      ])),
    },
  };
};

const exampleData: Lesson[] = [
  {
    id: "1",
    title: "Something",
    date: new Date("2023-02-21"),
    start: 8 * 60,
    end: 9 * 60 + 30,
  },
  {
    id: "2",
    title: "Hello world",
    date: new Date("2022-02-21"),
    start: 8 * 60,
    end: 9 * 60 + 30,
  },
  {
    id: "3",
    title: "Something else",
    date: new Date("2023-04-21"),
    start: 8 * 60,
    end: 9 * 60 + 30,
  },
  {
    id: "3",
    title: "Test",
    date: new Date("2022-12-26"),
    start: 8 * 60,
    end: 9 * 60 + 30,
  },
  {
    id: "4",
    title: "Abc",
    date: new Date("2023-02-23"),
    start: 8 * 60,
    end: 9 * 60 + 30,
  },
  {
    id: "5",
    title: "Geometrie",
    date: new Date("2023-02-22"),
    start: 8 * 60,
    end: 9 * 60 + 30,
  },
  {
    id: "6",
    title: "Journalismus",
    date: new Date("2023-02-21"),
    start: 6 * 60,
    end: 7 * 60 + 30,
  },
  {
    id: "7",
    title: "Arbeitsrecht",
    date: new Date("2023-02-21"),
    start: 10 * 60,
    end: 11 * 60 + 30,
  },
  {
    id: "8",
    title: "IDPA",
    date: new Date("2023-01-21"),
    start: 8 * 60,
    end: 9 * 60 + 30,
  },
  {
    id: "9",
    title: "Elektrizität",
    date: new Date("2023-03-21"),
    start: 8 * 60,
    end: 9 * 60 + 30,
  },
];
