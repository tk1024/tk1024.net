import { preload } from "react-dom";

export default function HOME() {
  preload("/path/to/image.ext", {
    as: "image",
  });

  return <div>Hello World</div>;
}
