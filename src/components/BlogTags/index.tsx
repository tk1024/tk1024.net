interface BlogTagsProps {
  tags: string[];
}

export const BlogTags = ({ tags }: BlogTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-2.5 py-0.5 text-xs font-medium text-forest-dark bg-forest-pale/60 rounded-full border border-forest/10 transition-colors duration-200 hover:bg-forest-pale"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};