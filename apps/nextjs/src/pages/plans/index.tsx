import { Card, Group, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { createRef, RefObject, useRef, useState } from "react";
import { Lesson } from "../../components/plan/mobile/lesson";
import { months, PlanMonth } from "../../components/plan/mobile/month";
import { i18nGetServerSideProps } from "../../helpers/i18nGetServerSidePropsMiddleware";
import { MobileLayout } from "../../layout/mobile/mobile-layout";
import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const ref = useRef<Record<string, RefObject<HTMLDivElement>>>({});

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

  const refKeys = data.map((i) => `${i.year}-${i.month}`);

  refKeys.forEach((m) => {
    ref.current[m] = createRef<HTMLDivElement>();
  });

  const [active, setActive] = useState(
    `${months[data.at(0)!.month]} ${data.at(0)!.year}`,
  );

  const onScrollPositionChange = () => {
    const res = Object.entries(ref.current).reduce(
      (previous: { value: string | null; max: number }, [k, v]) => {
        const top = v.current?.getBoundingClientRect().top ?? 125;
        if (top >= 125) return previous;
        if (previous.max >= top) return previous;

        const [yearString, monthString] = k.split("-");

        return {
          value: `${months[parseInt(monthString!)]} ${yearString}`,
          max: top,
        };
      },
      { value: null, max: -Infinity },
    );
    setActive(res.value ?? `${months[data.at(0)!.month]} ${data.at(0)!.year}`);
  };

  return (
    <Stack spacing={0}>
      <Title order={4} align="start">
        {active ? active : refKeys[0]}
      </Title>
      <ScrollArea.Autosize
        maxHeight="calc(100vh - var(--mantine-footer-height) - var(--mantine-header-height) - 64px)"
        onScrollPositionChange={onScrollPositionChange}
      >
        {data.map((m, i) => (
          <PlanMonth
            isFirst={i === 0}
            lessons={m.lessons}
            monthRef={ref.current[`${m.year}-${m.month}`]!}
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
