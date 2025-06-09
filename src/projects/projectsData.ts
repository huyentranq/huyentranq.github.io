export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  features: string[];
  challenges: string[];
  learnings: string[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Real-time Data Pipeline",
    description: "Built a scalable data pipeline using Apache Spark and Kafka for processing streaming data from multiple sources.",
    longDescription: "This project demonstrates a complete real-time data processing pipeline that ingests data from multiple sources, processes it using Apache Spark, and stores the results in a data lake architecture. The system handles high-throughput data streams and provides real-time analytics capabilities.",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400",
    technologies: ["Apache Spark", "Kafka", "Python", "AWS S3", "Docker", "Kubernetes"],
    githubUrl: "https://github.com/huyentranq/realtime-data-pipeline",
    liveUrl: "#",
    features: [
      "Real-time data ingestion from multiple sources",
      "Stream processing with Apache Spark Streaming",
      "Fault-tolerant message queuing with Kafka",
      "Scalable storage on AWS S3",
      "Containerized deployment with Docker",
      "Monitoring and alerting system"
    ],
    challenges: [
      "Handling high-volume data streams without data loss",
      "Implementing exactly-once processing semantics",
      "Optimizing Spark job performance for low latency",
      "Managing backpressure in the streaming pipeline"
    ],
    learnings: [
      "Deep understanding of stream processing concepts",
      "Experience with distributed systems architecture",
      "Performance tuning for big data applications",
      "Best practices for data pipeline monitoring"
    ]
  },
  {
    id: 2,
    title: "ETL Data Warehouse",
    description: "Designed and implemented a comprehensive ETL solution using dbt and Snowflake for business intelligence.",
    image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=400",
    longDescription: "A modern data warehouse solution built with dbt and Snowflake, featuring automated ETL processes, data quality checks, and comprehensive business intelligence capabilities.",
    technologies: ["dbt", "Snowflake", "SQL", "Python", "Airflow", "Great Expectations"],
    githubUrl: "https://github.com/huyentranq/etl-data-warehouse",
    liveUrl: "#",
    features: [
      "Automated ETL processes with dbt",
      "Data quality validation and testing",
      "Dimensional modeling for analytics",
      "Incremental data loading strategies",
      "Comprehensive documentation and lineage"
    ],
    challenges: [
      "Designing efficient dimensional models",
      "Implementing data quality checks at scale",
      "Optimizing query performance in Snowflake"
    ],
    learnings: [
      "Modern data warehouse architecture patterns",
      "dbt best practices and advanced features",
      "Data modeling for analytics workloads"
    ]
  },
  {
    id: 3,
    title: "Data Lake Architecture",
    description: "Architected a modern data lake solution on AWS with automated data ingestion and transformation processes.",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
    longDescription: "A comprehensive data lake implementation on AWS that provides scalable storage, automated data processing, and flexible analytics capabilities for structured and unstructured data.",
    technologies: ["AWS", "Lambda", "S3", "Glue", "Athena", "CloudFormation"],
    githubUrl: "https://github.com/huyentranq/aws-data-lake",
    liveUrl: "#",
    features: [
      "Serverless data processing with AWS Lambda",
      "Automated data cataloging with AWS Glue",
      "Query capabilities with Amazon Athena",
      "Infrastructure as Code with CloudFormation"
    ],
    challenges: [
      "Designing cost-effective storage strategies",
      "Implementing proper data governance",
      "Optimizing query performance across large datasets"
    ],
    learnings: [
      "AWS data services ecosystem",
      "Serverless architecture patterns",
      "Data lake design principles"
    ]
  }
];