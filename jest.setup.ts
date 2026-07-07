import "@testing-library/jest-dom";

// Mock next-intl with a translator that resolves real English messages, so
// components using useTranslations render the same text they show in prod.
jest.mock("next-intl", () => {
  const messagesModule = jest.requireActual("./messages/en.json");
  const messages = messagesModule.default ?? messagesModule;

  const resolve = (namespace: string | undefined, key: string) => {
    const path = namespace ? `${namespace}.${key}` : key;
    const value = path
      .split(".")
      .reduce<unknown>(
        (node, part) =>
          node && typeof node === "object"
            ? (node as Record<string, unknown>)[part]
            : undefined,
        messages
      );
    return typeof value === "string" ? value : undefined;
  };

  const useTranslations = (namespace?: string) => {
    const t = (key: string, values?: Record<string, string | number>) => {
      let message = resolve(namespace, key) ?? key;
      for (const [name, value] of Object.entries(values ?? {})) {
        message = message.replaceAll(`{${name}}`, String(value));
      }
      return message;
    };
    t.has = (key: string) => resolve(namespace, key) !== undefined;
    return t;
  };

  return {
    useTranslations,
    useLocale: () => "en",
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
      children,
  };
});

// Mock next/router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return "";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession() {
    return { data: null, status: "unauthenticated" };
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
}));
