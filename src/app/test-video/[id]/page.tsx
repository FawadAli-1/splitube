import { getOneVideo } from '@/actions';
import TestVideo from '@/components/shared/TestVideo'
import { YoutubeData } from '@/types';
import { Metadata } from "next";

export async function generateMetadata({ params: { id } }: { params: { id: string } }) : Promise<Metadata>{
  const data: YoutubeData = await getOneVideo(id)

  const videoTitle = data.items[0].snippet.title

  return {
    title: videoTitle
  }
}

const TestVideoPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <section>
      <TestVideo params={id}/>
    </section>
  )
}

export default TestVideoPage