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

    tech: "Spark    Dagster     DBT ",
  },
  "streaming-data-pipeline":{
    title: "Streaming-Data-pipeline",
    githubUrl: "https://github.com/huyentranq/Streaming-Data-pipeline",
    description:"A Streaming pipeline showcase real-time data processing by sales pizza dataset",
    // stars: 2,
    tech: "Kafka    Spark     Python",
  }
};

export default projectsMeta;
