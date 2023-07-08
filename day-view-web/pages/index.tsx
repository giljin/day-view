import Head from 'next/head';
import { Inter } from 'next/font/google';
import { GetServerSidePropsContext } from 'next';
import Main from '../component/mainPage';
import styled from 'styled-components';
import { getStyledThemProperty } from '@/shared/styles/util';
import { getAccessToken, getUser } from '@/shared/api';
import {
  isSetAccessToken,
  setAccessToken,
  setCookie,
} from '@/shared/util/axios';

const inter = Inter({ subsets: ['latin'] });

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainWrap>
        <Main />
      </MainWrap>
    </>
  );
}

const MainWrap = styled.div`
  height: 100%;
  ${getStyledThemProperty('box', 'flexCenterBox')};
  flex-direction: column;
`;

export const getServerSideProps = async ({
  req,
  res,
  ...rest
}: GetServerSidePropsContext) => {
  try {
    const isAllowLogin = await isSetAccessToken(req?.headers?.cookie || '');
    if (isAllowLogin) {
      return {
        redirect: {
          permanent: false,
          destination: '/calendar',
        },
      };
    }
  } catch (e) {
    console.log('main', e);
  }
  return {
    props: {},
  };
};
