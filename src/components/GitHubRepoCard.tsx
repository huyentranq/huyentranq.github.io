import { Star, GitFork } from 'lucide-react';

interface Props {
  url: string;
  description?: string;
  stars?: number;
  forks?: number;
  tech?: string;
  name: string;
}

const GitHubRepoCard = ({ url, name, description, stars, forks, tech }: Props) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-zinc-700 bg-gradient-to-r from-[#1f2937] to-[#111827] p-5 shadow-xl hover:shadow-2xl transition"
    >
      <div className="text-white text-lg font-semibold mb-1">
        <span className="text-gray-400 mr-2">GitHub /</span> {name}
      </div>
      {description && <p className="text-gray-400 text-sm mb-4">{description}</p>}
      <div className="flex items-center gap-6 text-sm text-gray-300">
        {stars !== undefined && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {stars}
          </div>
        )}
        {forks !== undefined && (
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            {forks}
          </div>
        )}
        {tech && <div className="text-400">{tech}</div>}
      </div>
    </a>
  );
};

export default GitHubRepoCard;
