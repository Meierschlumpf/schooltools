import { Button, Container, TextInput } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { i18nGetServerSideProps } from "../helpers/i18nGetServerSidePropsMiddleware";
import { prefetchTrpcQueries } from "../helpers/prefetchTrpcQueries";
import { useChannelEvent } from "../helpers/pusher/use-channel-event";
import { MobileLayout } from "../layout/mobile/mobile-layout";
import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "./_app";

const Chat: NextPageWithLayout = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const { mutateAsync } = trpc.chat.sendMessage.useMutation();
  useChannelEvent("chat", "message", (data) => {
    console.log(data);
    setMessages((messages) => [...messages, `${data.message} send by ${data.user}`]);
  });

  return (
    <Container>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}

      <TextInput placeholder="Type your message" value={message} onChange={(event) => setMessage(event.currentTarget.value)} />
      <Button
        onClick={async () => {
          await mutateAsync({ message });
          setMessage("");
        }}
      >
        Senden
      </Button>
    </Container>
  );
};

Chat.getLayout = (page) => {
  return <MobileLayout activeTab="home">{page}</MobileLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      trpcState: await prefetchTrpcQueries(context),
      ...(await i18nGetServerSideProps(context, ["pages/index", "user/common"])),
    },
  };
};

export default Chat;
