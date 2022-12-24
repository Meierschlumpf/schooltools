import { getCookie, setCookie } from "cookies-next";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { LOCALE_COOKIE_KEY } from "../constants/cookies";
import nextI18nConfig from "../../next-i18next.config.js";
import {
  defaultI18nNamespaces,
  i18nNamespaceType,
} from "../constants/i18n-namespaces";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

export const i18nGetServerSideProps = async <
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
>(
  { req, res }: GetServerSidePropsContext<Q, D>,
  specificNamespaces?: i18nNamespaceType[number][],
) => {
  const locale = getCookie(LOCALE_COOKIE_KEY, { req, res }) as string;
  const defaultLocale = nextI18nConfig.i18n.defaultLocale;

  if (!locale) {
    setCookie(LOCALE_COOKIE_KEY, defaultLocale, {
      req,
      res,
      maxAge: 365 * 24 * 60,
    });
  }

  return await serverSideTranslations(
    locale ?? "en",
    [...defaultI18nNamespaces, ...(specificNamespaces ?? [])],
    nextI18nConfig as any,
    ["en", "de"],
  );
};
