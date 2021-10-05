import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
} from 'next';
import type { AppProps } from 'next/app';
import type { CompletePrivateRouteInfo } from 'next/dist/shared/lib/router/router';
import type { Router } from 'next/dist/client/router';
import { ReactNode } from 'react';

declare module 'next' {
  // NextPage with layout module exported in function
  export declare type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module 'next/app' {
  // AppProps taking in component with layout function
  export declare type AppLayoutProps<P = {}> = AppProps<P> & {
    Component: NextPageWithLayout<P>;
  };
}

// sources for declaration merging to use next's layout modules w typescript
// -----------------------------------------------------------------------
// https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
// https://github.com/tomasgil123/persistent-layout-typescript/tree/master/pages
// https://stackoverflow.com/questions/62115518/persistent-layout-in-next-js-with-typescript-and-hoc
// https://nextjs.org/docs/basic-features/layouts#per-page-layouts
// https://github.com/ippo012/nextjs-starter
// https://dev.to/ofilipowicz/next-js-per-page-layouts-and-typescript-lh5