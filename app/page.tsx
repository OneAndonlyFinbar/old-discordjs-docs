import Navbar from '@/components/Navbar';
import Banner from '@/components/home/Banner';
import Infos from '@/components/home/Infos';

export default function Home() {

  return (
    <html>
    <body className="w-screen min-h-screen flex flex-col">
    <Navbar/>
    <Banner/>
    <Infos/>
    </body>
    </html>
  );
}