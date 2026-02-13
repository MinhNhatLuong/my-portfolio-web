interface SkillCategoryProps {
  title: string;
  items?: string[];
}

export function SkillCategory({ title, items }: SkillCategoryProps) {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-muted-foreground pl-1">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary/40 border border-border text-foreground transition-all hover:border-foreground/30 hover:bg-secondary/60 cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}