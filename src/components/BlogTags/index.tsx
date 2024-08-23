interface BlogTagsProps {
  tags: string[];
}

export const BlogTags = ({ tags }: BlogTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
