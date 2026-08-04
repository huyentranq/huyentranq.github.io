import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Database, GitBranch, Hash, Search, Terminal, Workflow } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import { knowledgeCategories, type KnowledgeBlock } from '../data/docTechContent';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('python', python);
hljs.registerLanguage('sql', sql);

type DetailBlock = KnowledgeBlock;

interface Topic {
  id: string;
  title: string;
  summary: string;
  details: DetailBlock[];
}

interface Category {
  id: string;
  title: string;
  description: string;
  source: string;
  image?: string;
  icon: React.ElementType;
  topics: Topic[];
}

const legacyCategories: Category[] = [
  {
    id: 'kafka',
    title: 'Kafka',
    description: 'Pub-sub, topic, partition, consumer group, offset, producer/consumer commands.',
    source: 'CV/Kafka.pdf',
    image: '/images/kafka/airchitechture.png',
    icon: GitBranch,
    topics: [
      {
        id: 'kafka-core',
        title: 'Core Concepts',
        summary: 'Những ý cần nhớ trước khi viết producer/consumer.',
        details: [
          {
            type: 'text',
            content: [
              'Kafka là hệ thống pub-sub phân tán. Producer gửi message vào topic, topic được chia thành nhiều partition để tăng throughput.',
              'Broker lưu trữ và xử lý partition. Một Kafka cluster có ít nhất một broker, thường nhiều broker để scale và replication.',
              'Consumer group dùng để chia tải: trong cùng một group, một partition chỉ được đọc bởi một consumer tại một thời điểm.',
              'Offset là vị trí của message trong partition, giúp consumer biết đã đọc tới đâu.',
              'Replication tạo bản sao partition trên broker khác. Leader replica nhận ghi/đọc chính, follower replica dùng để backup và failover.',
            ],
          },
          {
            type: 'image',
            src: '/images/kafka/airchitechture.png',
            alt: 'Kafka architecture',
          },
        ],
      },
      {
        id: 'kafka-cli',
        title: 'CLI Commands',
        summary: 'Các lệnh Kafka hay dùng khi test topic, producer, consumer.',
        details: [
          {
            type: 'code',
            title: 'Create topic',
            content: `/usr/bin/kafka-topics --create \\
  --topic books \\
  --bootstrap-server localhost:9092 \\
  --partitions 1 \\
  --replication-factor 1`,
          },
          {
            type: 'code',
            title: 'List and describe topics',
            content: `/usr/bin/kafka-topics --list --bootstrap-server localhost:9092

/usr/bin/kafka-topics --describe \\
  --topic books \\
  --bootstrap-server localhost:9092`,
          },
          {
            type: 'code',
            title: 'Console producer',
            content: `/usr/bin/kafka-console-producer \\
  --topic books \\
  --bootstrap-server localhost:9092`,
          },
          {
            type: 'code',
            title: 'Producer with key',
            content: `kafka-console-producer \\
  --bootstrap-server localhost:9092 \\
  --topic books \\
  --property parse.key=true \\
  --property key.separator=:`,
          },
          {
            type: 'code',
            title: 'Consumer from beginning',
            content: `docker exec -it kafka bash

/usr/bin/kafka-console-consumer \\
  --topic bank_transactions \\
  --bootstrap-server localhost:9092 \\
  --from-beginning`,
          },
          {
            type: 'code',
            title: 'Consumer with timestamp, key, value',
            content: `kafka-console-consumer \\
  --bootstrap-server localhost:9092 \\
  --topic bank_transactions \\
  --from-beginning \\
  --formatter kafka.tools.DefaultMessageFormatter \\
  --property print.timestamp=true \\
  --property print.key=true \\
  --property print.value=true`,
          },
        ],
      },
      {
        id: 'kafka-python',
        title: 'Python Producer Notes',
        summary: 'Những chỗ hay quên khi dùng Kafka Python client.',
        details: [
          {
            type: 'text',
            content: [
              '`produce()` thường đẩy message vào buffer trước, không đồng nghĩa message đã tới broker ngay.',
              '`flush()` ép producer gửi hết message đang chờ trong buffer. Nếu chương trình kết thúc mà chưa flush, có thể mất message.',
              '`callback` chạy sau khi message gửi thành công hoặc lỗi. `poll()` gọi callback cho các delivery report đã sẵn sàng.',
              'Các config tối ưu batch thường gặp: `linger.ms`, `batch.size`, `compression.type`.',
            ],
          },
          {
            type: 'code',
            title: 'Producer pattern',
            content: `from confluent_kafka import Producer

def delivery_report(err, msg):
    if err is not None:
        print(f"Delivery failed: {err}")
    else:
        print(f"Delivered to {msg.topic()} [{msg.partition()}] @ {msg.offset()}")

producer = Producer({
    "bootstrap.servers": "localhost:9092",
    "linger.ms": 50,
    "batch.size": 32768,
    "compression.type": "snappy",
})

producer.produce(
    topic="bank_transactions",
    key="user_001",
    value='{"amount": 120000, "type": "transfer"}',
    callback=delivery_report,
)

producer.poll(0)
producer.flush()`,
          },
        ],
      },
      {
        id: 'kafka-consumer-groups',
        title: 'Consumer Groups and Offsets',
        summary: 'Theo dõi lag, reset offset và hiểu rebalance.',
        details: [
          {
            type: 'text',
            content: [
              'Consumer lag là khoảng cách giữa latest offset của partition và offset consumer đã commit. Lag tăng liên tục thường cho thấy consumer xử lý chậm hơn tốc độ dữ liệu vào.',
              'Khi số consumer trong group thay đổi, Kafka thực hiện rebalance để phân phối lại partition. Trong thời gian rebalance, việc đọc có thể tạm dừng ngắn.',
              'Số consumer xử lý song song hiệu quả không vượt quá số partition của topic. Consumer dư sẽ ở trạng thái idle.',
            ],
          },
          {
            type: 'code',
            title: 'Inspect consumer group and lag',
            content: `kafka-consumer-groups \\
  --bootstrap-server localhost:9092 \\
  --list

kafka-consumer-groups \\
  --bootstrap-server localhost:9092 \\
  --group analytics-consumer \\
  --describe`,
          },
          {
            type: 'code',
            title: 'Reset offsets for replay',
            content: `# Preview before applying
kafka-consumer-groups \\
  --bootstrap-server localhost:9092 \\
  --group analytics-consumer \\
  --topic bank_transactions \\
  --reset-offsets --to-earliest --dry-run

# Apply after stopping the consumer group
kafka-consumer-groups \\
  --bootstrap-server localhost:9092 \\
  --group analytics-consumer \\
  --topic bank_transactions \\
  --reset-offsets --to-earliest --execute`,
          },
        ],
      },
      {
        id: 'kafka-reliability',
        title: 'Reliability and Delivery',
        summary: 'At-most-once, at-least-once, idempotence và cấu hình an toàn.',
        details: [
          {
            type: 'text',
            content: [
              'At-most-once ưu tiên không trùng nhưng có thể mất message. At-least-once tránh mất message nhưng downstream phải xử lý duplicate. Exactly-once cần phối hợp transaction, idempotent producer và sink phù hợp.',
              '`acks=all` yêu cầu toàn bộ in-sync replicas xác nhận. `enable.idempotence=true` giúp producer tránh ghi trùng do retry trong cùng phiên.',
              'Với pipeline dữ liệu, cách thực tế thường là at-least-once kết hợp event key ổn định, deduplication và idempotent write ở Silver/Gold.',
            ],
          },
          {
            type: 'code',
            title: 'Safer producer configuration',
            content: `producer = Producer({
    "bootstrap.servers": "localhost:9092",
    "acks": "all",
    "enable.idempotence": True,
    "retries": 10,
    "compression.type": "snappy",
    "linger.ms": 20,
})`,
          },
          {
            type: 'code',
            title: 'Topic retention and cleanup',
            content: `kafka-configs \\
  --bootstrap-server localhost:9092 \\
  --entity-type topics \\
  --entity-name bank_transactions \\
  --alter \\
  --add-config retention.ms=604800000,cleanup.policy=delete

kafka-configs \\
  --bootstrap-server localhost:9092 \\
  --entity-type topics \\
  --entity-name bank_transactions \\
  --describe`,
          },
        ],
      },
      {
        id: 'kafka-troubleshooting',
        title: 'Troubleshooting Checklist',
        summary: 'Rà nhanh khi producer, consumer hoặc broker không hoạt động như mong đợi.',
        details: [
          {
            type: 'code',
            title: 'Quick diagnostic flow',
            content: `1. Check broker connectivity and advertised.listeners
2. Confirm topic exists and inspect partition leaders
3. Produce one test message from console
4. Consume with --from-beginning using a new group
5. Describe the real consumer group and inspect lag
6. Check serializer/deserializer and message schema
7. Review timeout, retry, authentication and ACL logs`,
          },
          {
            type: 'text',
            content: [
              '`localhost` bên trong Docker container trỏ về chính container đó. Các service trong cùng Docker network thường phải dùng service name như `kafka:9092`.',
              'Nếu consumer không thấy message cũ, kiểm tra `auto.offset.reset`, group id đã từng commit offset hay chưa, và dữ liệu có còn trong retention window không.',
              'Nếu message cùng key bị sai thứ tự, kiểm tra chúng có thực sự đi vào cùng partition hay không.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'spark',
    title: 'Spark / PySpark',
    description: 'Spark architecture, RDD, lazy evaluation, structured streaming, schema, transformations.',
    source: 'CV/pySpark.pdf',
    image: '/images/spark/architecture.png',
    icon: Database,
    topics: [
      {
        id: 'spark-architecture',
        title: 'Architecture and RDD',
        summary: 'Driver, executors, cluster manager, RDD, lazy evaluation.',
        details: [
          {
            type: 'text',
            content: [
              'Spark app thường có Driver Program điều phối job, SparkContext/SparkSession làm entry point, executors chạy task trên worker nodes.',
              'RDD là Resilient Distributed Dataset: phân tán, bất biến, có khả năng phục hồi qua lineage.',
              'Transformations như `filter`, `select`, `withColumn`, `groupBy` được lazy. Spark chỉ thực thi khi gặp action như `show`, `count`, `collect`, `write`.',
              'Spark nhanh hơn MapReduce trong nhiều case vì xử lý in-memory và tối ưu DAG trước khi chạy.',
            ],
          },
          {
            type: 'image',
            src: '/images/spark/architecture.png',
            alt: 'Spark architecture',
          },
        ],
      },
      {
        id: 'spark-session',
        title: 'Spark Session Setup',
        summary: 'Một SparkSession dùng chung cho Bronze, Silver, Gold.',
        details: [
          {
            type: 'code',
            title: 'SparkSession with Kafka, Delta, MinIO',
            content: `from pyspark.sql import SparkSession

spark = (
    SparkSession.builder
    .appName("pizza-sales-streaming")
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")
    .config("spark.hadoop.fs.s3a.endpoint", "http://minio:9000")
    .config("spark.hadoop.fs.s3a.access.key", "minioadmin")
    .config("spark.hadoop.fs.s3a.secret.key", "minioadmin")
    .config("spark.hadoop.fs.s3a.path.style.access", "true")
    .getOrCreate()
)`,
          },
          {
            type: 'text',
            content: [
              'Dùng một SparkSession nhất quán giúp tránh tạo nhiều SparkContext và dễ reuse config cho Kafka, MinIO, Delta Lake, PostgreSQL.',
              'Delta configs hỗ trợ MERGE, UPDATE, time travel. S3A configs giúp Spark đọc/ghi MinIO như S3-compatible storage.',
            ],
          },
        ],
      },
      {
        id: 'spark-streaming',
        title: 'Kafka to Bronze Streaming',
        summary: 'Read Kafka, parse JSON, write with checkpoint.',
        details: [
          {
            type: 'code',
            title: 'Read stream from Kafka',
            content: `raw_stream = (
    spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "kafka:9092")
    .option("subscribe", "pizza_sales")
    .option("startingOffsets", "earliest")
    .load()
)`,
          },
          {
            type: 'code',
            title: 'Parse JSON with schema',
            content: `from pyspark.sql.functions import col, from_json
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, DoubleType

schema = StructType([
    StructField("order_id", StringType()),
    StructField("pizza_id", StringType()),
    StructField("quantity", IntegerType()),
    StructField("unit_price", DoubleType()),
    StructField("order_time", StringType()),
])

bronze_df = (
    raw_stream
    .selectExpr("CAST(value AS STRING) AS json_value")
    .select(from_json(col("json_value"), schema).alias("data"))
    .select("data.*")
)`,
          },
          {
            type: 'code',
            title: 'Write stream with checkpoint',
            content: `query = (
    bronze_df.writeStream
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "s3a://lakehouse/checkpoints/bronze_pizza_sales")
    .start("s3a://lakehouse/bronze/pizza_sales")
)

query.awaitTermination()`,
          },
        ],
      },
      {
        id: 'spark-transform',
        title: 'Transformations Cheat Sheet',
        summary: 'Các lệnh DataFrame hay dùng khi làm Silver/Gold.',
        details: [
          {
            type: 'code',
            title: 'Select, filter, withColumn',
            content: `from pyspark.sql.functions import col, lit, to_timestamp

df.select("order_id", "pizza_id", "quantity").show()

df.filter(col("quantity") > 0)

df.withColumn("source_system", lit("kafka"))

df.withColumn("order_ts", to_timestamp(col("order_time")))`,
          },
          {
            type: 'code',
            title: 'Deduplicate and aggregate',
            content: `clean_df = df.dropDuplicates(["order_id", "pizza_id"])

daily_sales = (
    clean_df
    .groupBy("order_date")
    .agg({"quantity": "sum", "total_price": "sum"})
)`,
          },
          {
            type: 'code',
            title: 'Join dimensions and facts',
            content: `fact_order_item = (
    order_items.alias("f")
    .join(pizza_dim.alias("p"), col("f.pizza_id") == col("p.pizza_id"), "left")
    .join(date_dim.alias("d"), col("f.order_date") == col("d.date"), "left")
)`,
          },
          {
            type: 'code',
            title: 'UDF pattern',
            content: `from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

normalize_size = udf(lambda x: x.strip().lower() if x else None, StringType())

df = df.withColumn("pizza_size_norm", normalize_size(col("pizza_size")))`,
          },
        ],
      },
      {
        id: 'spark-window',
        title: 'Window Functions',
        summary: 'Ranking, running totals và lấy bản ghi mới nhất theo business key.',
        details: [
          {
            type: 'code',
            title: 'Latest record per key',
            content: `from pyspark.sql import Window
from pyspark.sql.functions import col, row_number

latest_window = (
    Window
    .partitionBy("order_id")
    .orderBy(col("updated_at").desc())
)

latest_orders = (
    orders
    .withColumn("row_num", row_number().over(latest_window))
    .filter(col("row_num") == 1)
    .drop("row_num")
)`,
          },
          {
            type: 'code',
            title: 'Running total',
            content: `from pyspark.sql.functions import sum as spark_sum

running_window = (
    Window
    .partitionBy("customer_id")
    .orderBy("order_ts")
    .rowsBetween(Window.unboundedPreceding, Window.currentRow)
)

df.withColumn(
    "customer_running_revenue",
    spark_sum("total_price").over(running_window),
)`,
          },
        ],
      },
      {
        id: 'spark-performance',
        title: 'Performance Review',
        summary: 'Partitioning, shuffle, cache, broadcast join và Spark UI.',
        details: [
          {
            type: 'text',
            content: [
              'Các thao tác như `groupBy`, `join`, `distinct` và `orderBy` thường tạo shuffle. Shuffle tốn network, disk và dễ làm stage chậm.',
              'Dùng `broadcast()` khi dimension table đủ nhỏ để tránh shuffle hai phía. Không broadcast bảng lớn vì có thể làm executor thiếu bộ nhớ.',
              '`repartition()` có shuffle và phù hợp khi cần phân phối lại dữ liệu; `coalesce()` thường dùng để giảm số partition với ít shuffle hơn.',
              'Chỉ `cache()` DataFrame được tái sử dụng nhiều lần. Sau khi dùng xong nên `unpersist()` để giải phóng bộ nhớ.',
            ],
          },
          {
            type: 'code',
            title: 'Common performance patterns',
            content: `from pyspark.sql.functions import broadcast

# Small dimension join
result = fact_orders.join(broadcast(dim_pizza), "pizza_id", "left")

# Control output parallelism
partitioned = df.repartition(16, "order_date")
smaller_output = partitioned.coalesce(4)

# Cache only when reused
clean_df.cache()
clean_df.count()  # materialize cache
clean_df.unpersist()`,
          },
          {
            type: 'code',
            title: 'Before optimizing',
            content: `df.explain("formatted")

# Review in Spark UI
# Jobs -> Stages -> Tasks
# Look for: long shuffle read/write, skewed tasks,
# spills to disk, failed executors and excessive small files`,
          },
        ],
      },
      {
        id: 'spark-delta',
        title: 'Delta Lake Operations',
        summary: 'Upsert, time travel và xử lý incremental load.',
        details: [
          {
            type: 'code',
            title: 'MERGE for idempotent upsert',
            content: `from delta.tables import DeltaTable

target = DeltaTable.forPath(spark, "s3a://lakehouse/silver/orders")

(
    target.alias("t")
    .merge(updates.alias("s"), "t.order_id = s.order_id")
    .whenMatchedUpdateAll()
    .whenNotMatchedInsertAll()
    .execute()
)`,
          },
          {
            type: 'code',
            title: 'Read an earlier version',
            content: `previous = (
    spark.read
    .format("delta")
    .option("versionAsOf", 3)
    .load("s3a://lakehouse/silver/orders")
)

history = DeltaTable.forPath(
    spark,
    "s3a://lakehouse/silver/orders",
).history()` ,
          },
          {
            type: 'text',
            content: [
              'Dùng business key và timestamp cập nhật rõ ràng để MERGE có kết quả xác định khi chạy lại.',
              'Checkpoint của Structured Streaming và transaction log của Delta giải quyết hai vai trò khác nhau; không nên xóa checkpoint tùy tiện khi pipeline đang vận hành.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'airflow',
    title: 'Airflow',
    description: 'DAG syntax, schedule interval, catchup/backfill, XCom, useful CLI commands.',
    source: 'CV/Airflow.pdf',
    image: '/images/airflow/airlow_im.png',
    icon: Workflow,
    topics: [
      {
        id: 'airflow-cli',
        title: 'CLI and Local Debug',
        summary: 'Các lệnh kiểm tra DAG/task trong container.',
        details: [
          {
            type: 'code',
            title: 'Enter Airflow container',
            content: `docker exec -it airflow bash`,
          },
          {
            type: 'code',
            title: 'List, trigger, test',
            content: `airflow dags list

airflow dags trigger pizza_sales_pipeline

airflow tasks list pizza_sales_pipeline

airflow tasks test pizza_sales_pipeline silver_transform 2025-06-20`,
          },
          {
            type: 'text',
            content: [
              '`tasks test` rất hữu ích khi debug logic Python/operator mà không cần đợi scheduler.',
              'Khi DAG không hiện trên UI, kiểm tra syntax Python, path trong `dags/`, import error và scheduler logs.',
            ],
          },
        ],
      },
      {
        id: 'airflow-dag',
        title: 'DAG Skeleton',
        summary: 'Mẫu DAG cơ bản cho pipeline Bronze → Silver → Gold.',
        details: [
          {
            type: 'code',
            title: 'DAG with dependencies',
            content: `from datetime import datetime
from airflow import DAG
from airflow.operators.python import PythonOperator

def bronze_ingest():
    print("run Kafka to Bronze")

def silver_transform():
    print("clean and validate Bronze data")

def gold_aggregate():
    print("build fact and dimension tables")

with DAG(
    dag_id="pizza_sales_pipeline",
    start_date=datetime(2025, 6, 20),
    schedule_interval="0 * * * *",
    catchup=False,
    tags=["streaming", "spark"],
) as dag:
    bronze = PythonOperator(task_id="bronze_ingest", python_callable=bronze_ingest)
    silver = PythonOperator(task_id="silver_transform", python_callable=silver_transform)
    gold = PythonOperator(task_id="gold_aggregate", python_callable=gold_aggregate)

    bronze >> silver >> gold`,
          },
          {
            type: 'text',
            content: [
              '`schedule_interval` có thể dùng cron. Ví dụ `0 * * * *` chạy đầu mỗi giờ, `0 0 * * *` chạy mỗi ngày lúc 00:00.',
              '`catchup=False` thường dùng khi không muốn Airflow tự chạy bù toàn bộ lịch quá khứ.',
              'Backfill/catchup hữu ích khi cần chạy lại dữ liệu lịch sử, nhưng phải cẩn thận nếu task ghi đè dữ liệu downstream.',
            ],
          },
        ],
      },
      {
        id: 'airflow-xcom',
        title: 'XCom',
        summary: 'Truyền metadata nhỏ giữa các task.',
        details: [
          {
            type: 'code',
            title: 'Push and pull XCom',
            content: `def extract(**context):
    context["ti"].xcom_push(key="row_count", value=1200)

def validate(**context):
    row_count = context["ti"].xcom_pull(
        task_ids="extract",
        key="row_count",
    )
    print(f"rows: {row_count}")`,
          },
          {
            type: 'text',
            content: [
              'Chỉ dùng XCom cho metadata nhỏ: row count, path output, partition date, status flag.',
              'Không nên đẩy DataFrame/dataset lớn qua XCom. Hãy ghi ra storage rồi truyền path.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'data-governance',
    title: 'Data Fundamentals',
    description: 'Data governance, data quality, data lifecycle, DW/DL, ETL review notes.',
    source: 'CV/KHDL.pdf',
    icon: BookOpen,
    topics: [
      {
        id: 'governance',
        title: 'Governance Checklist',
        summary: 'Các ý cần rà khi nói về quản trị dữ liệu.',
        details: [
          {
            type: 'text',
            content: [
              'Data governance là kế hoạch tổng thể để tổ chức, sử dụng, quản lý và bảo vệ dữ liệu.',
              'Các mảng chính: strategy, roles/responsibilities, policy, data quality, access control, architecture, metadata, master data, lifecycle.',
              'Metadata giúp hiểu nguồn gốc, cấu trúc, ý nghĩa và lineage của dữ liệu. Đây là nền tảng để tìm kiếm và tái sử dụng dữ liệu.',
              'Data lifecycle thường gồm: planning, design, collection/build, operation/use, monitoring, evaluation/improvement, archive/delete.',
            ],
          },
        ],
      },
      {
        id: 'quality',
        title: 'Data Quality Checks',
        summary: 'Accuracy, completeness, consistency, timeliness qua SQL/PySpark checks.',
        details: [
          {
            type: 'text',
            content: [
              'Chất lượng dữ liệu gồm accuracy, completeness, consistency, timeliness.',
              'Khi làm ETL, nên có checks cho missing values, duplicates, invalid values, schema drift, và record count giữa các layer.',
            ],
          },
          {
            type: 'code',
            title: 'SQL checks',
            content: `-- Missing values
SELECT COUNT(*) AS missing_order_id
FROM orders
WHERE order_id IS NULL;

-- Duplicate primary key
SELECT order_id, COUNT(*) AS cnt
FROM orders
GROUP BY order_id
HAVING COUNT(*) > 1;

-- Invalid business rule
SELECT *
FROM order_items
WHERE quantity <= 0 OR total_price < 0;`,
          },
          {
            type: 'code',
            title: 'PySpark checks',
            content: `from pyspark.sql.functions import col, count

missing = df.filter(col("order_id").isNull()).count()

dupes = (
    df.groupBy("order_id")
    .agg(count("*").alias("cnt"))
    .filter(col("cnt") > 1)
)

invalid = df.filter((col("quantity") <= 0) | (col("total_price") < 0))`,
          },
        ],
      },
      {
        id: 'dw-dl-etl',
        title: 'DW, DL, ETL',
        summary: 'Phân biệt nhanh Data Warehouse, Data Lake và ETL flow.',
        details: [
          {
            type: 'text',
            content: [
              'Data Warehouse phù hợp dữ liệu đã cấu trúc, phục vụ BI/reporting, thường dùng schema rõ và truy vấn nhanh.',
              'Data Lake linh hoạt hơn, chứa structured, semi-structured, unstructured data như logs, images, videos; phù hợp ML/AI và raw data retention.',
              'ETL/ELT flow cơ bản: collect/extract → clean → transform/process → load/serve → visualize/monitor.',
              'Trong medallion architecture: Bronze giữ raw, Silver làm sạch/chuẩn hóa, Gold phục vụ analytics/downstream apps.',
            ],
          },
          {
            type: 'code',
            title: 'Simple ETL checklist',
            content: `1. Extract source data
2. Validate schema and required fields
3. Clean missing/duplicate/invalid records
4. Transform business fields
5. Load to warehouse or downstream app
6. Add monitoring: row count, error count, freshness`,
          },
        ],
      },
    ],
  },
];

const categoryIcons: Record<string, React.ElementType> = {
  kafka: GitBranch,
  spark: Database,
  airflow: Workflow,
  'data-governance': BookOpen,
};

const categories: Category[] = knowledgeCategories.map((category) => ({
  ...category,
  icon: categoryIcons[category.id],
}));

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const DocTech: React.FC = () => {
  const location = useLocation();
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0].id);
  const [activeTopicId, setActiveTopicId] = useState<string>(categories[0].topics[0].id);
  const [query, setQuery] = useState('');

  const activeCategory = categories.find((category) => category.id === activeCategoryId) || categories[0];
  const selectedTopic = useMemo(() => {
    if (!activeTopicId) return activeCategory.topics[0];
    return activeCategory.topics.find((topic) => topic.id === activeTopicId) || activeCategory.topics[0];
  }, [activeCategory, activeTopicId]);

  const visibleCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return categories;

    return categories
      .map((category) => ({
        ...category,
        topics: category.topics.filter((topic) =>
          `${category.title} ${topic.title} ${topic.summary}`.toLowerCase().includes(normalizedQuery),
        ),
      }))
      .filter((category) => category.topics.length > 0);
  }, [query]);

  const openTopic = (category: Category, topic: Topic) => {
    setActiveCategoryId(category.id);
    setActiveTopicId(topic.id);
  };

  useEffect(() => {
    const topicId = new URLSearchParams(location.search).get('topic');
    if (!topicId) return;

    const category = categories.find((item) => item.topics.some((topic) => topic.id === topicId));
    const topic = category?.topics.find((item) => item.id === topicId);
    if (category && topic) openTopic(category, topic);
  }, [location.search]);

  const renderInlineCode = (content: string) =>
    content.split(/(`[^`]+`)/g).map((part, index) =>
      part.startsWith('`') && part.endsWith('`') ? (
        <code key={`${part}-${index}`} className="bg-[#25131e] px-1.5 py-0.5 text-[12px] text-[#ff8fc8]">
          {part.slice(1, -1)}
        </code>
      ) : (
        <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
      ),
    );

  const renderBlock = (block: DetailBlock, index: number) => {
    if (block.type === 'text') {
      return (
        <div key={index} className="space-y-3 border-l border-[#3e2433] pl-4">
          {block.content.map((paragraph) => (
            <p key={paragraph} className="text-[13px] leading-6 text-[#b8c3bb]">
              {renderInlineCode(paragraph)}
            </p>
          ))}
        </div>
      );
    }

    if (block.type === 'image') {
      return (
        <img
          key={index}
          src={block.src}
          alt={block.alt}
          className="max-h-80 w-full border border-[#3e2433] bg-[#110c10] object-contain p-4 opacity-90"
        />
      );
    }

    if (block.type === 'points') {
      return (
        <section key={index} className="border-l border-[#4a2d3b] pl-4 sm:pl-5">
          <h3 className="text-[11px] font-bold uppercase text-[#ff67b0]">:: {block.title}</h3>
          <ul className="mt-3 space-y-2.5">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3 text-[12px] leading-6 text-[#b8adb3]">
                <span className="mt-0.5 shrink-0 text-[#ff4fa3]">›</span>
                <span>{renderInlineCode(item)}</span>
              </li>
            ))}
          </ul>
        </section>
      );
    }

    if (block.type === 'flow') {
      return (
        <section key={index}>
          <h3 className="text-[11px] font-bold uppercase text-[#ff67b0]">:: {block.title}</h3>
          <ol className="mt-4 grid gap-0">
            {block.steps.map((step, stepIndex) => (
              <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <div className="flex flex-col items-center">
                  <span className="flex h-6 w-6 items-center justify-center border border-[#743650] text-[9px] text-[#ff7fbd]">
                    {String(stepIndex + 1).padStart(2, '0')}
                  </span>
                  {stepIndex < block.steps.length - 1 && <span className="min-h-5 flex-1 border-l border-[#412833]" />}
                </div>
                <p className="pb-4 text-[12px] leading-6 text-[#b8adb3]">{renderInlineCode(step)}</p>
              </li>
            ))}
          </ol>
        </section>
      );
    }

    if (block.type === 'table') {
      return (
        <section key={index}>
          <h3 className="text-[11px] font-bold uppercase text-[#ff67b0]">:: {block.title}</h3>
          <div className="mt-4 overflow-x-auto border-y border-[#3d2933]">
            <table className="w-full min-w-[560px] border-collapse text-left text-[11px] leading-5">
              <thead>
                <tr className="border-b border-[#4a2d3b] bg-[#120c10] text-[#ff8fc5]">
                  {block.headers.map((header) => (
                    <th key={header} className="px-3 py-2.5 font-bold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={`${row[0]}-${rowIndex}`} className="border-b border-[#2b2227] last:border-0 hover:bg-[#110c10]">
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`} className={`px-3 py-3 align-top ${cellIndex === 0 ? 'text-[#e2d9de]' : 'text-[#9f9299]'}`}>
                        {renderInlineCode(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    }

    const highlightedCode = hljs.highlightAuto(block.content, ['python', 'sql', 'bash']).value;
    const lineCount = block.content.split('\n').length;

    return (
      <section key={index} className="doc-tech-code border-l-2 border-[#ff4fa3] py-1 pl-4 sm:pl-5">
        {block.title && (
          <div className="mb-2 flex items-center gap-2 text-[10px] text-[#c17499]">
            <span className="text-[#ff4fa3]">//</span>
            {block.title.toLowerCase().replaceAll(' ', '_')}
          </div>
        )}
        <div className="grid grid-cols-[2rem_minmax(0,1fr)] overflow-x-auto">
          <div className="select-none pr-3 text-right text-[10px] leading-6 text-[#513542]" aria-hidden="true">
            {Array.from({ length: lineCount }, (_, lineIndex) => (
              <span key={lineIndex} className="block">{String(lineIndex + 1).padStart(2, '0')}</span>
            ))}
          </div>
          <pre className="!m-0 min-w-max !overflow-visible !rounded-none !bg-transparent !p-0 text-[12px] leading-6">
            <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        </div>
      </section>
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-[#0c1013] text-[#e5e9e6]"
      style={{ fontFamily: '"Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace' }}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="mx-auto min-h-screen max-w-[1180px]">
        <aside className="hidden">
          <div className="sticky top-0 flex max-h-screen flex-col px-6 py-8">
            <div className="flex items-center gap-3 border-b border-[#3a2631] pb-5">
              <Terminal className="h-5 w-5 text-[#ff4fa3]" />
              <div>
                <p className="text-sm font-bold text-white">tech.doc</p>
                <p className="mt-0.5 text-[10px] text-[#66736b]">data_notes / v1.0</p>
              </div>
            </div>

            <label className="mt-5 flex items-center gap-2 border border-[#3e2734] bg-[#120c10] px-3 py-2 focus-within:border-[#ff4fa3]/70">
              <Search className="h-3.5 w-3.5 text-[#657269]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="search_notes..."
                className="min-w-0 flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-[#526057]"
              />
              <span className="text-[9px] text-[#526057]">/</span>
            </label>

            <nav className="mt-6 flex-1 space-y-6 overflow-y-auto pr-2" aria-label="Tech documentation">
              {visibleCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.id}>
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase text-[#d8dfda]">
                      <Icon className="h-3.5 w-3.5 text-[#ff4fa3]" />
                      {category.title}
                    </div>
                    <div className="space-y-0.5 border-l border-[#432b37] pl-3">
                      {category.topics.map((topic) => {
                        const isActive = category.id === activeCategory.id && topic.id === selectedTopic.id;
                        return (
                          <button
                            key={topic.id}
                            onClick={() => openTopic(category, topic)}
                            className={`block w-full py-1.5 text-left text-[11px] leading-4 ${
                              isActive
                                ? 'translate-x-1 text-[#ff67b0]'
                                : 'text-[#849088] hover:translate-x-1 hover:text-[#d4dbd6]'
                            }`}
                          >
                            <span className="mr-2 text-[#3c4941]">{isActive ? '>' : '·'}</span>
                            {topic.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {visibleCategories.length === 0 && (
                <p className="text-[11px] text-[#68736c]">no_match_found;</p>
              )}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 px-5 py-8 sm:px-8 lg:px-14 lg:py-12 xl:px-20">
          <div className="mx-auto max-w-4xl">
            <header className="border-b border-[#3a2631] pb-8">
              <div className="flex items-center gap-2 text-[10px] text-[#6f7c74]">
                <span className="text-[#ff4fa3]">huyen@tech-doc</span>
                <span>:</span>
                <span>~/{activeCategory.id}</span>
                <span className="text-[#ff4fa3]">$</span>
                <span>open {selectedTopic.id}.md</span>
                <span className="h-3 w-1.5 animate-pulse bg-[#ff4fa3]" />
              </div>

              <pre className="mt-7 hidden !overflow-hidden !rounded-none !bg-transparent !p-0 text-[10px] leading-[1.15] text-[#ff4fa3] sm:block md:text-[10px] lg:text-xs" aria-hidden="true">{`████████╗███████╗ ██████╗██╗  ██╗    ██████╗  ██████╗  ██████╗
╚══██╔══╝██╔════╝██╔════╝██║  ██║    ██╔══██╗██╔═══██╗██╔════╝
   ██║   █████╗  ██║     ███████║    ██║  ██║██║   ██║██║     
   ██║   ██╔══╝  ██║     ██╔══██║    ██║  ██║██║   ██║██║     
   ██║   ███████╗╚██████╗██║  ██║    ██████╔╝╚██████╔╝╚██████╗
   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝  ╚═════╝`}</pre>

              <div className="mt-7 md:hidden">
                <label className="mb-2 block text-[10px] text-[#6f7c74]">select_note:</label>
                <select
                  value={`${activeCategory.id}/${selectedTopic.id}`}
                  onChange={(event) => {
                    const [categoryId, topicId] = event.target.value.split('/');
                    const category = categories.find((item) => item.id === categoryId);
                    const topic = category?.topics.find((item) => item.id === topicId);
                    if (category && topic) openTopic(category, topic);
                  }}
                  className="w-full border border-[#4a2b3b] bg-[#100a0e] px-3 py-2.5 text-[11px] text-[#ff9bca] outline-none"
                >
                  {categories.map((category) => (
                    <optgroup key={category.id} label={category.title}>
                      {category.topics.map((topic) => (
                        <option key={topic.id} value={`${category.id}/${topic.id}`}>
                          {topic.title}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px]">
                <span className="border border-[#6f3150] bg-[#25101c] px-2 py-1 text-[#ff7fbd]">{activeCategory.title}</span>
                <span className="text-[#657269]">source: {activeCategory.source}</span>
                <span className="text-[#657269]">{activeCategory.topics.length} notes</span>
              </div>
            </header>

            <motion.article
              key={selectedTopic.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="py-9"
            >
              <div className="flex items-start gap-3">
                <Hash className="mt-1.5 h-4 w-4 shrink-0 text-[#ff4fa3]" />
                <div>
                  <h1 className="text-xl font-bold text-[#f2f5f3] sm:text-2xl">{selectedTopic.title}</h1>
                  <p className="mt-3 max-w-2xl text-[12px] leading-6 text-[#829087]">// {selectedTopic.summary}</p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {selectedTopic.details.map((block, index) => renderBlock(block, index))}
              </div>

              <div className="mt-10 border-t border-[#3a2631] pt-5 text-[10px] text-[#6c5360]">
                eof · {activeCategory.source} · updated_for_review
              </div>
            </motion.article>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default DocTech;
