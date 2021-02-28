import Script from "next/script";
import { FC, useEffect } from "react";

interface Props {
  dataId: string;
}

export const SpeakerdeckEmbed: FC<Props> = ({ dataId }) => {
  return (
    <>
      <div className="max-w-4xl">
        <div className="speakerdeck-embed" data-id={dataId} />
      </div>
      <Script defer src="//speakerdeck.com/assets/embed.js" />
    </>
  );
};
