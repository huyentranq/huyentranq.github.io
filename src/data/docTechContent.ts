export type KnowledgeBlock =
  | { type: 'text'; content: string[] }
  | { type: 'points'; title: string; items: string[] }
  | { type: 'flow'; title: string; steps: string[] }
  | { type: 'table'; title: string; headers: string[]; rows: string[][] }
  | { type: 'code'; title?: string; content: string }
  | { type: 'image'; src: string; alt: string };

export interface KnowledgeTopic {
  id: string;
  title: string;
  summary: string;
  details: KnowledgeBlock[];
}

export interface KnowledgeCategory {
  id: string;
  title: string;
  description: string;
  source: string;
  image?: string;
  topics: KnowledgeTopic[];
}

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: 'kafka',
    title: 'Apache Kafka',
    description: 'Distributed event streaming, delivery guarantees, partitioning, and reliable consumer design.',
    source: 'CV/Kafka.pdf',
    image: '/images/kafka/airchitechture.png',
    topics: [
      {
        id: 'kafka-core',
        title: 'Kafka Overview',
        summary: 'Why Kafka exists, what problem it solves, and where it fits in a data platform.',
        details: [
          {
            type: 'text',
            content: [
              'Apache Kafka is a distributed event-streaming platform. It allows independent systems to publish, retain, and consume ordered streams of events without requiring producers and consumers to run at the same speed.',
              'Unlike a traditional task queue, Kafka keeps events for a configurable retention period after they are consumed. This durable log enables replay, multiple consumer applications, and recovery from downstream failures.',
            ],
          },
          {
            type: 'points',
            title: 'Problems Kafka solves',
            items: [
              'Decouples data producers from downstream consumers.',
              'Absorbs traffic spikes between systems running at different speeds.',
              'Distributes event processing across multiple machines.',
              'Retains an immutable event history that can be replayed.',
              'Provides a shared backbone for streaming ETL, CDC, monitoring, and event-driven applications.',
            ],
          },
          {
            type: 'table',
            title: 'Kafka compared with a traditional queue',
            headers: ['Dimension', 'Kafka', 'Traditional queue'],
            rows: [
              ['Storage model', 'Durable append-only log', 'Messages commonly disappear after acknowledgement'],
              ['Consumption', 'Many consumer groups can read the same event', 'A message is commonly assigned to one worker'],
              ['Replay', 'Native through offsets and retention', 'Usually limited or application-specific'],
              ['Best fit', 'Event streams and data integration', 'Task distribution and commands'],
            ],
          },
          {
            type: 'points',
            title: 'Use Kafka when',
            items: [
              'Several systems need the same stream of events.',
              'Events must be replayed or audited later.',
              'High throughput and horizontal scaling are important.',
              'The organization can operate a distributed streaming platform.',
            ],
          },
        ],
      },
      {
        id: 'kafka-cli',
        title: 'Kafka Architecture',
        summary: 'How producers, brokers, topics, partitions, replicas, and consumers work together.',
        details: [
          {
            type: 'flow',
            title: 'End-to-end event path',
            steps: [
              'A producer creates an event and selects a topic.',
              'The event key is mapped to a partition.',
              'The partition leader appends the event to its ordered log.',
              'Follower replicas copy the event for fault tolerance.',
              'A consumer polls its assigned partitions and processes the event.',
              'The consumer commits an offset after reaching the required processing guarantee.',
            ],
          },
          {
            type: 'image',
            src: '/images/kafka/airchitechture.png',
            alt: 'Apache Kafka architecture showing producers, brokers, topics, partitions, and consumers',
          },
          {
            type: 'points',
            title: 'Core components',
            items: [
              'Broker: a server that stores partitions and handles client requests.',
              'Topic: a named stream of related events.',
              'Partition: an ordered, append-only log and the unit of parallelism.',
              'Leader replica: the replica that handles reads and writes for a partition.',
              'Follower replica: a copy that can become leader after a failure.',
              'ISR: replicas sufficiently synchronized with the current leader.',
              'Controller: coordinates partition leadership and cluster metadata.',
            ],
          },
          {
            type: 'points',
            title: 'Architecture rule to remember',
            items: [
              'Ordering is guaranteed inside one partition, not across an entire topic.',
              'Partition count limits the maximum useful parallelism of one consumer group.',
              'Replication improves availability; it does not increase consumer parallelism.',
            ],
          },
        ],
      },
      {
        id: 'kafka-python',
        title: 'Producer and Event Design',
        summary: 'How to design event keys, schemas, batching, acknowledgements, and retry behavior.',
        details: [
          {
            type: 'points',
            title: 'A useful event contract',
            items: [
              '`event_id` uniquely identifies the event for deduplication.',
              '`event_time` records when the business event happened.',
              '`source` identifies the producing system.',
              '`schema_version` supports controlled contract evolution.',
              'The payload contains business data rather than presentation-specific fields.',
            ],
          },
          {
            type: 'text',
            content: [
              'The event key controls partition placement. Events that must remain ordered, such as updates for the same order, should use the same stable business key.',
              'Batching and compression improve throughput by reducing request overhead. They also add a small amount of latency, so producer settings should match the workload rather than be copied blindly.',
            ],
          },
          {
            type: 'table',
            title: 'Important producer decisions',
            headers: ['Decision', 'Safer default', 'Trade-off'],
            rows: [
              ['Acknowledgement', '`acks=all`', 'Higher durability with additional latency'],
              ['Idempotence', 'Enabled', 'Prevents duplicates caused by retries in one producer session'],
              ['Compression', 'Snappy or LZ4', 'Less network usage with CPU cost'],
              ['Key strategy', 'Stable business key', 'Preserves per-entity ordering but may create skew'],
            ],
          },
          {
            type: 'code',
            title: 'Minimal producer configuration',
            content: `producer = Producer({
    "bootstrap.servers": "kafka:9092",
    "acks": "all",
    "enable.idempotence": True,
    "compression.type": "snappy",
})`,
          },
        ],
      },
      {
        id: 'kafka-consumer-groups',
        title: 'Consumer Groups and Offsets',
        summary: 'Parallel consumption, offset management, rebalancing, and event replay.',
        details: [
          {
            type: 'text',
            content: [
              'A consumer group represents one logical application. Kafka assigns each partition to at most one consumer in that group, allowing the application to scale while preventing two group members from processing the same partition concurrently.',
              'An offset is the position of an event inside a partition. The committed offset records the consumer group progress and determines where processing resumes after a restart.',
            ],
          },
          {
            type: 'flow',
            title: 'Consumer lifecycle',
            steps: [
              'Join a consumer group and subscribe to topics.',
              'Receive partition assignments during rebalance.',
              'Poll a batch of events.',
              'Validate and process each event.',
              'Write results to the downstream system.',
              'Commit offsets at the point required by the delivery guarantee.',
            ],
          },
          {
            type: 'points',
            title: 'Operational concepts',
            items: [
              'Consumer lag is the distance between the latest partition offset and the committed group offset.',
              'A growing lag indicates that consumers are slower than producers or are repeatedly failing.',
              'Rebalancing pauses assignment while partitions move between consumers.',
              'More consumers than partitions do not increase throughput; extra consumers remain idle.',
              'Resetting offsets enables replay but requires idempotent downstream processing.',
            ],
          },
        ],
      },
      {
        id: 'kafka-reliability',
        title: 'Delivery and Reliability',
        summary: 'How replication, acknowledgements, commits, and idempotency shape delivery guarantees.',
        details: [
          {
            type: 'table',
            title: 'Delivery semantics',
            headers: ['Guarantee', 'Behavior', 'Typical design'],
            rows: [
              ['At-most-once', 'An event may be lost but is not retried', 'Commit before processing'],
              ['At-least-once', 'An event is retried and may be duplicated', 'Process first, then commit'],
              ['Exactly-once effect', 'The final business result appears once', 'Transactions or idempotent sink writes'],
            ],
          },
          {
            type: 'text',
            content: [
              'Most practical data pipelines use at-least-once delivery and make downstream writes idempotent. A stable event identifier, deduplication rule, and deterministic upsert are usually easier to operate than a distributed transaction across every system.',
            ],
          },
          {
            type: 'points',
            title: 'Reliability checklist',
            items: [
              'Use an appropriate replication factor and monitor under-replicated partitions.',
              'Require acknowledgements from in-sync replicas for important events.',
              'Define retention based on recovery and replay requirements.',
              'Separate malformed events into a dead-letter topic with failure context.',
              'Measure producer error rate, consumer lag, processing latency, and rebalance frequency.',
            ],
          },
        ],
      },
      {
        id: 'kafka-troubleshooting',
        title: 'Patterns and Troubleshooting',
        summary: 'Common Kafka use cases, design techniques, and a practical diagnostic sequence.',
        details: [
          {
            type: 'points',
            title: 'Common architecture patterns',
            items: [
              'Streaming ETL: Kafka → stream processor → lakehouse or warehouse.',
              'Change Data Capture: database changes → Kafka → search, cache, analytics, or services.',
              'Event-driven integration: domain events trigger independent downstream workflows.',
              'Log aggregation: services publish operational events into centralized processing.',
            ],
          },
          {
            type: 'flow',
            title: 'Diagnostic sequence',
            steps: [
              'Verify broker connectivity and advertised listener configuration.',
              'Confirm topic existence, partition leaders, and replica health.',
              'Produce and consume one test event with console tools.',
              'Inspect the real consumer group assignments and lag.',
              'Validate serializer, deserializer, and schema compatibility.',
              'Check retry, timeout, authentication, and authorization logs.',
            ],
          },
          {
            type: 'points',
            title: 'Frequent failure signals',
            items: [
              'No events inside Docker: `localhost` refers to the current container; use the Kafka service name.',
              'Repeated rebalances: processing exceeds the poll interval or group membership is unstable.',
              'Uneven throughput: a poor event key creates a hot partition.',
              'Missing older events: offsets were already committed or retention has expired.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'spark',
    title: 'Apache Spark / PySpark',
    description: 'Distributed computation, execution plans, DataFrames, streaming, and lakehouse processing.',
    source: 'CV/pySpark.pdf',
    image: '/images/spark/architecture.png',
    topics: [
      {
        id: 'spark-architecture',
        title: 'Spark Overview and Architecture',
        summary: 'What Spark is and how drivers, executors, jobs, stages, and tasks cooperate.',
        details: [
          {
            type: 'text',
            content: [
              'Apache Spark is a distributed processing engine for batch analytics, streaming, machine learning, and SQL workloads. It divides a computation into tasks that run in parallel across a cluster.',
              'Spark is valuable when data or computation exceeds a single machine, when the same pipeline must scale across environments, or when a shared execution engine is needed for several analytical workloads.',
            ],
          },
          {
            type: 'image',
            src: '/images/spark/architecture.png',
            alt: 'Apache Spark architecture showing driver, cluster manager, workers, and executors',
          },
          {
            type: 'flow',
            title: 'From application to task',
            steps: [
              'The driver creates a SparkSession and builds the logical computation.',
              'The cluster manager allocates resources to the application.',
              'Executors start on worker nodes and receive tasks from the driver.',
              'An action creates a job from the pending transformations.',
              'Shuffle boundaries divide the job into stages.',
              'Each stage runs multiple tasks, usually one task per partition.',
            ],
          },
          {
            type: 'points',
            title: 'Component responsibilities',
            items: [
              'Driver: plans work, tracks execution, and holds application-level state.',
              'Executor: executes tasks and stores cached or shuffle data.',
              'Cluster manager: allocates CPU and memory across applications.',
              'Job: computation created by an action.',
              'Stage: a set of tasks that can run without another shuffle boundary.',
              'Task: the smallest unit of work sent to an executor.',
            ],
          },
        ],
      },
      {
        id: 'spark-session',
        title: 'Execution Model',
        summary: 'Lazy evaluation, lineage, logical plans, physical plans, and the Catalyst optimizer.',
        details: [
          {
            type: 'text',
            content: [
              'Spark transformations are lazy. Calling `select`, `filter`, or `join` builds a plan but does not immediately scan all data. Execution starts when an action such as `count`, `show`, or `write` requires a result.',
              'Lazy evaluation gives Spark an opportunity to optimize the complete pipeline rather than executing each statement independently.',
            ],
          },
          {
            type: 'flow',
            title: 'Query planning pipeline',
            steps: [
              'Unresolved logical plan records the requested DataFrame operations.',
              'The analyzer resolves columns, tables, functions, and data types.',
              'Catalyst applies rules such as predicate pushdown and column pruning.',
              'Spark compares possible physical execution strategies.',
              'The selected physical plan is translated into stages and tasks.',
            ],
          },
          {
            type: 'points',
            title: 'Review techniques',
            items: [
              'Use `df.explain("formatted")` before guessing at performance problems.',
              'Filter early and select only required columns to reduce data movement.',
              'Avoid repeated actions because each action can trigger a new job.',
              'Persist an intermediate result only when it is reused and expensive to recompute.',
            ],
          },
        ],
      },
      {
        id: 'spark-transform',
        title: 'RDD, DataFrame, and Dataset',
        summary: 'Spark data abstractions and why DataFrame is normally the best PySpark interface.',
        details: [
          {
            type: 'table',
            title: 'Data abstractions',
            headers: ['Abstraction', 'Characteristics', 'Best use'],
            rows: [
              ['RDD', 'Low-level distributed collection without schema optimization', 'Custom processing that cannot use structured APIs'],
              ['DataFrame', 'Distributed rows with a schema and Catalyst optimization', 'ETL, analytics, streaming, and most PySpark workloads'],
              ['Dataset', 'Typed structured API available mainly in Scala and Java', 'Compile-time type safety on the JVM'],
            ],
          },
          {
            type: 'points',
            title: 'DataFrame concepts',
            items: [
              'A schema defines column names, types, and nullability.',
              'Column expressions describe transformations without processing rows in Python one by one.',
              'Built-in Spark functions remain visible to Catalyst and are preferable to Python UDFs.',
              'DataFrames are immutable; each transformation returns a new logical DataFrame.',
              'Window functions calculate rankings, moving values, or aggregates while preserving row detail.',
            ],
          },
          {
            type: 'code',
            title: 'A small DataFrame pipeline',
            content: `clean_orders = (
    orders
    .filter(col("quantity") > 0)
    .dropDuplicates(["order_id"])
    .withColumn("revenue", col("quantity") * col("unit_price"))
)`,
          },
        ],
      },
      {
        id: 'spark-window',
        title: 'Transformations and Shuffle',
        summary: 'Narrow and wide transformations, partition movement, and stage boundaries.',
        details: [
          {
            type: 'table',
            title: 'Transformation types',
            headers: ['Type', 'Behavior', 'Examples'],
            rows: [
              ['Narrow', 'Each output partition depends on a small number of input partitions', '`select`, `filter`, `withColumn`, `map`'],
              ['Wide', 'Records move across the cluster and create a shuffle', '`groupBy`, `join`, `distinct`, `orderBy`'],
            ],
          },
          {
            type: 'text',
            content: [
              'Shuffle is one of the most expensive Spark operations because records are serialized, transferred over the network, sorted, and often written to disk. A shuffle also creates a stage boundary.',
            ],
          },
          {
            type: 'points',
            title: 'Methods for reducing shuffle cost',
            items: [
              'Filter and project columns before joins and aggregations.',
              'Broadcast a genuinely small dimension table.',
              'Partition data using keys that match common downstream access patterns.',
              'Aggregate before joining when full row-level detail is unnecessary.',
              'Detect skewed keys instead of only increasing cluster resources.',
            ],
          },
        ],
      },
      {
        id: 'spark-performance',
        title: 'Partitioning, Joins, and Performance',
        summary: 'How partition count, join strategy, caching, and data skew affect execution.',
        details: [
          {
            type: 'points',
            title: 'Partitioning principles',
            items: [
              'Too few partitions underuse the cluster and create large tasks.',
              'Too many partitions increase scheduling overhead and generate small output files.',
              '`repartition` performs a shuffle and can increase or decrease partitions.',
              '`coalesce` usually reduces partitions with less data movement.',
              'Storage partitioning enables partition pruning when filters use the partition column.',
            ],
          },
          {
            type: 'table',
            title: 'Common join strategies',
            headers: ['Strategy', 'When it works well', 'Main risk'],
            rows: [
              ['Broadcast hash join', 'One side is small enough for every executor', 'Executor memory pressure'],
              ['Sort-merge join', 'Two large equi-join inputs', 'Shuffle and sorting cost'],
              ['Shuffle hash join', 'A partitioned side fits in memory', 'Skew and memory pressure'],
            ],
          },
          {
            type: 'flow',
            title: 'Performance investigation order',
            steps: [
              'Confirm correctness and expected input volume.',
              'Inspect the formatted physical plan.',
              'Use Spark UI to find the slow job and stage.',
              'Compare task duration, shuffle size, spills, and failed executors.',
              'Check skew, partition count, join strategy, and repeated scans.',
              'Change one design decision and measure again.',
            ],
          },
        ],
      },
      {
        id: 'spark-streaming',
        title: 'Structured Streaming',
        summary: 'Incremental DataFrames, micro-batches, checkpoints, watermarks, and stateful processing.',
        details: [
          {
            type: 'text',
            content: [
              'Structured Streaming models an incoming stream as an unbounded DataFrame. Developers use the same structured transformations as batch processing while Spark incrementally updates the result as new data arrives.',
              'Most deployments use micro-batches: Spark periodically reads available events, executes a small batch plan, and commits progress to a checkpoint.',
            ],
          },
          {
            type: 'flow',
            title: 'Streaming query lifecycle',
            steps: [
              'Read events from a source such as Kafka.',
              'Deserialize the payload using an explicit schema.',
              'Apply validation, transformation, joins, or aggregations.',
              'Manage event-time state using watermarks when required.',
              'Write each result to a sink using an appropriate output mode.',
              'Persist progress and state in a durable checkpoint location.',
            ],
          },
          {
            type: 'points',
            title: 'Concepts that prevent production failures',
            items: [
              'Event time describes when data was generated; processing time describes when Spark received it.',
              'A watermark limits how long Spark waits for late data and how much state it retains.',
              'Checkpoint paths belong to one query and should not be casually reused or deleted.',
              'The sink must support the delivery and idempotency requirements of the pipeline.',
            ],
          },
        ],
      },
      {
        id: 'spark-delta',
        title: 'Lakehouse and Delta Lake',
        summary: 'Medallion layers, transaction logs, ACID writes, incremental updates, and time travel.',
        details: [
          {
            type: 'flow',
            title: 'Medallion architecture',
            steps: [
              'Bronze preserves raw source data, ingestion metadata, and replayability.',
              'Silver validates schema, standardizes values, deduplicates records, and applies reusable business rules.',
              'Gold organizes facts, dimensions, and aggregates for analytics or downstream applications.',
            ],
          },
          {
            type: 'points',
            title: 'What Delta Lake adds',
            items: [
              'A transaction log that coordinates reliable table updates.',
              'ACID transactions for concurrent reads and writes.',
              'Schema enforcement and controlled schema evolution.',
              '`MERGE` for incremental upserts and idempotent pipeline reruns.',
              'Table history and time travel for debugging or recovery.',
            ],
          },
          {
            type: 'points',
            title: 'Design guidance',
            items: [
              'Define the grain and business key before implementing a `MERGE`.',
              'Keep raw data immutable enough to support reprocessing.',
              'Avoid turning every temporary transformation into a permanent layer.',
              'Monitor small files, table growth, data freshness, and failed transactions.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'airflow',
    title: 'Apache Airflow',
    description: 'Workflow orchestration, scheduling semantics, resilient DAG design, and operations.',
    source: 'CV/Airflow.pdf',
    image: '/images/airflow/airlow_im.png',
    topics: [
      {
        id: 'airflow-cli',
        title: 'Airflow Role and Architecture',
        summary: 'What an orchestrator does and how Airflow coordinates distributed workflow execution.',
        details: [
          {
            type: 'text',
            content: [
              'Airflow is a workflow orchestrator. It schedules tasks, records their state, applies dependencies, and coordinates retries. It does not replace Spark, Kafka, or a database; it tells those systems when and how to run.',
            ],
          },
          {
            type: 'image',
            src: '/images/airflow/airlow_im.png',
            alt: 'Apache Airflow architecture and workflow components',
          },
          {
            type: 'points',
            title: 'Architecture components',
            items: [
              'Scheduler creates DAG runs and queues task instances whose dependencies are satisfied.',
              'Executor determines how queued tasks are launched.',
              'Workers execute task processes in distributed executor setups.',
              'Metadata database stores DAG run, task, connection, and scheduling state.',
              'Webserver presents operational state and controls to users.',
            ],
          },
        ],
      },
      {
        id: 'airflow-dag',
        title: 'Scheduling and DAG Design',
        summary: 'Logical dates, data intervals, catchup, dependencies, and idempotent tasks.',
        details: [
          {
            type: 'text',
            content: [
              'A DAG describes dependencies between tasks. It should express orchestration rather than contain a large amount of business transformation code.',
              'A scheduled DAG run usually represents a completed data interval. The logical date identifies that interval; it is not simply the wall-clock moment when the task starts.',
            ],
          },
          {
            type: 'points',
            title: 'Reliable DAG principles',
            items: [
              'Make each task idempotent so rerunning it produces the same final result.',
              'Pass partition dates and storage paths instead of large datasets between tasks.',
              'Keep tasks small enough to retry independently but meaningful enough to monitor.',
              'Use explicit dependencies and avoid relying on task execution timing.',
              'Design backfills before enabling catchup on historical intervals.',
            ],
          },
          {
            type: 'table',
            title: 'Scheduling concepts',
            headers: ['Concept', 'Meaning'],
            rows: [
              ['Schedule', 'Rule that defines successive data intervals'],
              ['Catchup', 'Creates missing historical DAG runs from the start date'],
              ['Backfill', 'Explicitly reruns a selected historical period'],
              ['Trigger rule', 'Controls when a task may run based on upstream states'],
            ],
          },
        ],
      },
      {
        id: 'airflow-xcom',
        title: 'Operators, XCom, and Operations',
        summary: 'Task building blocks, metadata exchange, retries, monitoring, and failure handling.',
        details: [
          {
            type: 'table',
            title: 'Airflow building blocks',
            headers: ['Component', 'Purpose'],
            rows: [
              ['Operator', 'Template for one task type'],
              ['Sensor', 'Waits for an external condition or resource'],
              ['Hook', 'Reusable interface to an external system'],
              ['Connection', 'Centrally managed endpoint and credentials'],
              ['XCom', 'Small metadata exchanged between task instances'],
            ],
          },
          {
            type: 'points',
            title: 'Operational practices',
            items: [
              'Store datasets in object storage or a database; pass only paths, row counts, or status through XCom.',
              'Set retries, retry delay, execution timeout, and failure notifications intentionally.',
              'Use sensors in reschedule or deferrable mode when waits may be long.',
              'Monitor schedule delay, task duration, retry rate, SLA misses, and queue time.',
              'Preserve enough context in logs to identify the partition, source, and failed operation.',
            ],
          },
          {
            type: 'flow',
            title: 'Failure investigation',
            steps: [
              'Identify the first failed task rather than only the final downstream failure.',
              'Read logs with the DAG run and data interval in mind.',
              'Classify the failure as transient, data-related, code-related, or infrastructure-related.',
              'Verify that retrying the task is safe and idempotent.',
              'Rerun the smallest valid scope and confirm downstream freshness.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'data-governance',
    title: 'Data Fundamentals',
    description: 'Data platforms, modeling, pipeline patterns, quality, metadata, and governance.',
    source: 'CV/KHDL.pdf',
    topics: [
      {
        id: 'governance',
        title: 'Data Platforms and Processing Models',
        summary: 'Warehouse, lake, lakehouse, OLTP, OLAP, batch, and streaming models.',
        details: [
          {
            type: 'table',
            title: 'Analytical data platforms',
            headers: ['Platform', 'Strength', 'Typical use'],
            rows: [
              ['Data warehouse', 'Structured governance and fast analytical SQL', 'BI, reporting, and dimensional models'],
              ['Data lake', 'Low-cost storage for diverse raw data', 'Exploration, ML, and long-term source retention'],
              ['Lakehouse', 'Lake flexibility with table reliability features', 'Unified BI, streaming, and ML workloads'],
            ],
          },
          {
            type: 'table',
            title: 'Processing models',
            headers: ['Model', 'Best fit', 'Primary concern'],
            rows: [
              ['Batch', 'Bounded data processed on a schedule', 'Freshness and efficient recomputation'],
              ['Streaming', 'Continuous events requiring low latency', 'State, ordering, late data, and recovery'],
              ['Micro-batch', 'Small bounded batches at short intervals', 'Balance between latency and operational simplicity'],
            ],
          },
          {
            type: 'points',
            title: 'System distinctions',
            items: [
              'OLTP systems optimize many small, concurrent transactions.',
              'OLAP systems optimize large scans, aggregations, and historical analysis.',
              'Operational databases should not become the primary engine for heavy analytical reporting.',
            ],
          },
        ],
      },
      {
        id: 'dw-dl-etl',
        title: 'ETL, ELT, and Data Modeling',
        summary: 'Pipeline stages, incremental loading, facts, dimensions, grain, and historical change.',
        details: [
          {
            type: 'table',
            title: 'ETL compared with ELT',
            headers: ['Pattern', 'Flow', 'Useful when'],
            rows: [
              ['ETL', 'Extract → transform → load', 'Data must be standardized before entering the target'],
              ['ELT', 'Extract → load → transform', 'The analytical platform can efficiently transform retained raw data'],
            ],
          },
          {
            type: 'flow',
            title: 'A production pipeline',
            steps: [
              'Extract data with source and ingestion metadata.',
              'Validate schema, required fields, and source freshness.',
              'Load raw data into a replayable landing layer.',
              'Clean, standardize, deduplicate, and apply business rules.',
              'Model facts, dimensions, aggregates, or serving tables.',
              'Publish to BI tools, APIs, ML features, or downstream applications.',
              'Monitor volume, quality, latency, failures, and lineage.',
            ],
          },
          {
            type: 'points',
            title: 'Dimensional modeling principles',
            items: [
              'Declare the grain before selecting facts and dimensions.',
              'Facts represent measurable business events at that grain.',
              'Dimensions provide descriptive context for analysis.',
              'A star schema favors understandable and efficient analytical queries.',
              'Slowly changing dimensions preserve selected forms of historical change.',
            ],
          },
        ],
      },
      {
        id: 'quality',
        title: 'Data Quality, Metadata, and Governance',
        summary: 'How teams make data trustworthy, discoverable, controlled, and explainable.',
        details: [
          {
            type: 'table',
            title: 'Quality dimensions',
            headers: ['Dimension', 'Question'],
            rows: [
              ['Completeness', 'Are required records and fields present?'],
              ['Validity', 'Do values follow the expected type, range, and format?'],
              ['Uniqueness', 'Are business keys duplicated unexpectedly?'],
              ['Consistency', 'Do related systems and fields agree?'],
              ['Timeliness', 'Is the data recent enough for its consumer?'],
              ['Accuracy', 'Does the data represent the real business event?'],
            ],
          },
          {
            type: 'points',
            title: 'Metadata and lineage',
            items: [
              'Technical metadata describes schemas, types, locations, and partitions.',
              'Business metadata defines meaning, ownership, and approved usage.',
              'Operational metadata records runs, freshness, volume, failures, and quality results.',
              'Lineage connects source fields, transformations, datasets, and downstream consumers.',
            ],
          },
          {
            type: 'points',
            title: 'Governance in practice',
            items: [
              'Assign clear data owners and stewards for critical domains.',
              'Apply least-privilege access and classify sensitive data.',
              'Define retention, archival, and deletion policies across the lifecycle.',
              'Treat quality rules and contracts as versioned engineering assets.',
              'Connect alerts to an owner and a documented remediation path.',
            ],
          },
        ],
      },
    ],
  },
];
