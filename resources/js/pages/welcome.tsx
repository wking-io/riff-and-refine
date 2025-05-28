import { TextScramble, TextScrambleProvider } from '@/components/ui/text-scramble';
import { Head } from '@inertiajs/react';

const appUrl = 'https://picperf.io/https://media.riffandrefine.fm';

export default function Welcome() {
    return (
        <>
            <Head title="Coming Soon">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="bg flex h-dvh flex-col items-center justify-center">
                <div className="w-9/10 md:w-[500px]">
                    <picture>
                        <source srcSet={`${appUrl}/cover.webp 1x, ${appUrl}/cover@2x.webp 2x`} type="image/webp" />
                        <img
                            src={`${appUrl}/cover.webp`}
                            alt="Cover"
                            className="ring-brand-blue/60 shadow-brand-blue/30 aspect-square w-full shadow-lg ring-1 backdrop-blur-3xl transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                        />
                    </picture>
                    <div className="mt-3 flex w-full justify-between font-mono text-2xl opacity-90 mix-blend-screen">
                        <TextScrambleProvider>
                            <TextScramble>Coming Soon</TextScramble>
                            <TextScramble>5/30</TextScramble>
                        </TextScrambleProvider>
                    </div>
                </div>
            </div>
        </>
    );
}
