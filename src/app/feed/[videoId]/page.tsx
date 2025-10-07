interface pageProps {
  params: Promise<{ videoId: string }>;
}

const Page = async ({ params }: pageProps) => {
  const { videoId } = await params;

  return <div>Video Id : {videoId}</div>;
};

export default Page;
