import VideoCards from "./VideoCards"

const HeroSection = () => {
  return (
    <section>
        <h1 className="text-3xl text-center md:text-4xl font-bold text-slate-950">Your Videos</h1>
        <VideoCards/>
    </section>
  )
}

export default HeroSection