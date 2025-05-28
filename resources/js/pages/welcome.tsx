import { TextScramble, TextScrambleProvider } from '@/components/ui/text-scramble';
import cover from '@images/cover.webp?url';
import cover2x from '@images/cover@2x.webp?url';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Coming Soon">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="bg flex h-dvh flex-col items-center justify-center">
                <div>
                    <picture>
                        <source srcSet={`${cover} 1x, ${cover2x} 2x`} type="image/webp" />
                        <img
                            src={cover}
                            alt="Cover"
                            className="ring-brand-blue/60 shadow-brand-blue/30 shadow-lg ring-1 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
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
