import { MantineThemeOverride } from "@mantine/core";
import { SelectDefaultProps } from "./defaultProps/select";
export const mantineTheme: MantineThemeOverride = {
  colorScheme: "dark",
  primaryColor: "indigo",
  components: {
    Select: {
      defaultProps: SelectDefaultProps,
    },
  },
};
