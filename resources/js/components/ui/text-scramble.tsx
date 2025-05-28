import { PropsWithClassName } from '@/types';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';

interface TextScrambleContextType {
    register: (id: string) => void;
    unregister: (id: string) => void;
    complete: (id: string) => void;
    current: string | null;
}

const TextScrambleContext = createContext<TextScrambleContextType | null>(null);

export function TextScrambleProvider({ children }: PropsWithChildren) {
    const [sequence, setSequence] = useState<string[]>([]);

    const register = useCallback((id: string) => {
        setSequence(prev => {
            if (prev.includes(id)) return prev;
            return [...prev, id];
        });
    }, []);

    const unregister = useCallback((id: string) => {
        setSequence(prev => prev.filter(item => item !== id));
    }, []);

    const complete = useCallback((id: string) => {
        setSequence(prev => prev.filter(item => item !== id));
    }, []);

    const current = useMemo(() => sequence[0] ?? null, [sequence]);

    return (
        <TextScrambleContext.Provider value={{ register, unregister, complete, current }}>
            {children}
        </TextScrambleContext.Provider>
    );
}

function useTextScramble() {
    const context = useContext(TextScrambleContext);
    if (!context) {
        throw new Error('useTextScramble must be used within a TextScrambleProvider');
    }
    return context;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyz';

interface TextScrambleProps extends PropsWithClassName {
    children: string;
}

export function TextScramble({ children, className }: TextScrambleProps) {
    const id = useId();
    const { register, unregister, complete, current } = useTextScramble();
    const [displayText, setDisplayText] = useState(children);
    const revealedCount = useRef<number>(0);

    useEffect(() => {
        register(id);
        return () => unregister(id);
    }, [id, register, unregister]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const animate = () => {
            const newText = children.split('').map((char, i) => {
                if (revealedCount.current > i) {
                    return char;
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join('');

            setDisplayText(newText);

            if (current === id) {
            revealedCount.current++;
            }

            if (revealedCount.current < children.length) {
                interval = setTimeout(animate, 90);
            } else {
                complete(id);
            }
        };

        animate();

        return () => {
            clearTimeout(interval);
        };
    }, [children, current, complete, id]);

    return (
        <span className={className} aria-label={children}>
            {displayText}
        </span>
    );
}
