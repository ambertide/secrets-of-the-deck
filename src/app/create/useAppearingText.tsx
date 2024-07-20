import {
  createRef,
  RefObject,
  useEffect,
  ReactNode,
  useMemo,
  useState
} from "react";

type UseAppearingReturn = {
  paragraphs: ReactNode[],
  isFinished: boolean
};

type UseAppearingText = (texts: string[]) => UseAppearingReturn;

const animation = [
  { opacity: 0 },
  { opacity: 1 }
];

const animationOptions = {
  duration: 3000,
  fill: 'forwards' as const
};

/**
 * Given an array of texts create a group of paragraphs and
 * return it.
 * 
 * @param texts list of texts.
 * @returns 
 */
export const useAppearingText: UseAppearingText = (texts) => {
  const [isFinished, setIsFinished] = useState(false);

  // This looks horrifying but essantially create an array of
  // paragraph tags and references to those paragraph tags.
  const [refs, paragraphs] = useMemo(
    () => texts.reduce<[RefObject<HTMLParagraphElement>[], ReactNode[]]>(
      ([refs, paragraphs], text) => {
        const paragraphReferance = createRef<HTMLParagraphElement>();
        return [
          [...refs, paragraphReferance],
          [...paragraphs, (<p
            className=" opacity-0"
            key={text}
            ref={paragraphReferance}
          >
            {text}
          </p>
          )]];
      },
      [[], []]
    ),
    [texts]
  );

  // Now, for the actual eldritch abomination, take we will have to go through
  // each tag and add a animation, than to its onfinish caller add a callback
  // that adds an animation to the following tag, and so on.

  useEffect(() => {
    // Function that schedules an animation for HTML Paragraph elements recursively
    const scheduleAnimation = (currentIndex: number) => {
      const currentRef = refs[currentIndex];
      const currentAnimation = currentRef.current?.animate(animation, animationOptions);
      currentAnimation?.addEventListener('finish', () => {
        if (currentIndex === refs.length - 1) {
          setIsFinished(true);
        } else {
          scheduleAnimation(currentIndex + 1);
        }
      });
    };

    scheduleAnimation(0);
  }, [refs]);
  return {
    paragraphs,
    isFinished
  };
};