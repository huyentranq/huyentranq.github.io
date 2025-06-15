interface ProjectMeta {
  title: string;
  githubUrl?: string;
  description?: string;
  stars?: number;
  forks?: number;
  tech?: string;
}

const projectsMeta: Record<string, ProjectMeta> = {
  "movie-recommendation-system": {
    title: "Movie Recommendation System",
    githubUrl: "https://github.com/huyentranq/TMDB-Pipeline-Recommendation",
    description:
      "ELT Pipeline for Movie Recommendation System",
    stars: 2,

    tech: "Python Dockerfile Makefile",
  },
};

export default projectsMeta;
