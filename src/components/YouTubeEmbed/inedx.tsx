import { FC } from "react";

interface Props {
  videoId: string;
}

export const YouTubeEmbed: FC<Props> = ({ videoId }) => {
  return (
    <div className="relative max-w-2xl w-full">
      <div style={{ paddingTop: "50%" }}>
        <iframe
          className="absolute top-0 bottom-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
};
