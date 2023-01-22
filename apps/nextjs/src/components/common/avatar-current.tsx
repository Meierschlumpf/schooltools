import { Avatar, AvatarProps } from "@mantine/core";
import { trpc } from "../../utils/trpc";

type CurrentAvatarProps = Omit<AvatarProps, "src" | "alt">;

export const CurrentAvatar = (props: CurrentAvatarProps) => {
  const { data } = trpc.user.me.useQuery();

  const src = data?.image ?? undefined;
  const alt = data?.name ?? undefined;

  return <Avatar src={src} alt={alt} {...props} />;
};
