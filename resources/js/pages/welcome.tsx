import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const appUrl = 'https://picperf.io/https://media.riffandrefine.fm';

type SubscribeForm = {
    email: string;
};

export default function Welcome() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm<Required<SubscribeForm>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('subscribe'), {
            onFinish: () => reset('email'),
        });
    };

    return (
        <>
            <Head title="Coming Soon">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="mx-auto flex w-3/4 max-w-screen-lg gap-x-12 gap-y-8 pt-8 md:pt-12 lg:pt-20">
                <div className="w-9/10 shrink-0 md:w-56 lg:w-64">
                    <picture>
                        <source srcSet={`${appUrl}/cover.webp 1x, ${appUrl}/cover@2x.webp 2x`} type="image/webp" />
                        <img
                            src={`${appUrl}/cover.webp`}
                            alt="Cover"
                            className="ring-brand-blue/60 shadow-brand-blue/30 aspect-square w-full shadow-lg ring-1 backdrop-blur-3xl transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                        />
                    </picture>
                </div>
                <div className="flex flex-col gap-2 md:text-sm lg:text-base">
                    <p>Hey friends,</p>
                    <p>
                        Welcome to the show for explorers and makers. If that is you, you're in the right place. We are making it our mission to
                        explore everything that it takes to make...well everything.
                    </p>
                    <p>
                        <a
                            className="hover:text-brand-red underline"
                            href="https://www.youtube.com/@riffandrefine"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Check out our live show every Friday at 2:30pm EST on YouTube
                        </a>{' '}
                        and let's have fun. If you miss any of the shows you can hop on our newsletter below to get summaries, project updates, and
                        more every week.
                    </p>
                    {wasSuccessful ? (
                        <p className="bg-brand-green text-brand-green-foreground mt-5 rounded-md px-4 py-2">Thank you for subscribing!</p>
                    ) : (
                        <form className="mt-5 flex flex-col" onSubmit={submit}>
                            <div className="grid items-end gap-2 lg:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <Button type="submit" className="w-full capitalize" tabIndex={5} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Subscribe for updates
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
