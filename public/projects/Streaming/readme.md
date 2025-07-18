# Pizza Sales Streaming Pipeline


The Pizza Sales Streaming Pipeline is designed to showcase real-time data processing capabilities by simulating pizza sales data. The pipeline ingests streaming data through `Apache Kafka`, processes it using Apache `Spark Streaming`, stores raw and processed data in `MinIO` and `PostgreSQL` respectively, orchestrates workflows with Apache `Airflow`, and provides business insights through `Power BI` dashboards. 

This project applies the `Medallion Architecture` (Bronze - Silver - Gold) to implement the ELT process effectively


##  Architecture


![Architecture Diagram](/projects/Streaming/images/data_pipeline.png)
The pipeline follows a modern data architecture pattern with the following components:


- **Real-time Data Streaming**: `Kafka` producers simulate continuous pizza sales transactions
- **Stream Processing**: `Spark` Streaming processes data in near real-time
- **Medallion Architecture**: Implements Bronze, Silver, and Gold data layers
- **Data Lake Storage**: `MinIO` serves as the data lake for saving data from 3 layer
- **Data Warehouse**: `PostgreSQL` stores processed, analytics-ready data
- **Workflow Orchestration**: `Airflow` manages and schedules data pipelines
- **Business Intelligence**: `Power BI` dashboards for data visualization and insights
- **Containerized Deployment**: `Docker`-based setup for easy deployment and scalability


---
## Folder Struture

```
   Streaming Pipeline
    ├── dags/                       # Airflow DAGs for each pipeline layer (bronze, silver, gold)
    │   ├── bronze_dag.py          
    │   ├── full_pipeline.py        # DAG combining all layers: Bronze → Silver → Gold
    │   ├── gold_dag.py             
    │   └── silver_dag.py         
    ├── dataset/                    # raw dataset
    ├── images/                     # Images used in readme
    ├── dockerimages/spark/        # Custom Spark Docker image or configuration
    ├── kafka_streaming/
    │   ├── utils/
    │   │   ├── constants.py        # Constant variables for Kafka configs, paths, etc.
    │   │   └── kafka_func.py       # Kafka consumer/producer helper functions
    │   └── streaming.py            # Main logic for streaming pipeline with Kafka
    ├── load_dataset/              #  schema definitions to load data into PostgreSQL
    ├── spark_job/
    │   ├── jobs/
    │   │   ├── gold_layer.py       # generate features or aggregated outputs
    │   │   ├── kafka_to_bronze.py  # bronze_layer: read Kafka and write to Bronze layer
    │   │   ├── silver_layer.py     # silver_layer: clean and enrich data
    │   │   └── warehouse.py        # load to psql
    │   └── resources/
    │       ├── minio_manager.py    # Helper to interact with MinIO storage
    │       └── spark_manager.py    # SparkSession manager and configuration
    ├── .env                        
    ├── .gitignore        
    ├── Makefile                    # Command shortcuts for build, test, run, etc.
    ├── README.md                
    ├── docker-compose.yml          # Compose setup for others services (airflow, psql)
    ├── requirements.txt            # Python dependencies
    └── stream-docker-compose.yml   # Compose file focused on streaming components(Minio, Spark, Kafka)

```


##  Data Flow & Lineage

**Apache Airflow** used for orchestrating complex data pipelines

![Data Lineage](/projects/Streaming/images/data_lineage.png)


1. **Messages from Kafka**:  
   - Raw streaming data produced by upstream services  
   - Queued messages ready to be ingested into the Bronze layer
2. **Bronze Layer (Raw Data)**: 
![bronze](/projects/Streaming/images/bronze.png)

   - Kafka topic `pizza_sales` receives raw streaming order data.
   - Data is parsed using a predefined schema and enriched with `ingest_time`.
   - Only one MinIO bucket (`lakehouse`) is used across all layers; no need to duplicate per layer.


3. **Silver Layer (Cleaned Data)**:

![silver](/projects/Streaming/images/silver.png)

   - The raw data from the Bronze layer is cleaned, validated, and transformed into structured tables.
   - Includes deduplication and strict schema enforcement.
   - Data is enriched with additional calculated fields.

   - The resulting tables include:

      - **`silver_cleaned`**: cleaned data derived from bronze_pizza_sales.
      - **`silver_order_items`**: extracts detailed information about each order.
      - **`silver_pizza_catalog`**: extracts detailed information about each type of pizza.
      - **`silver_timestamp`**: extracts and computes additional time-related attributes.
   
4. **Gold Layer (Aggregated Data)**:
![gold](/projects/Streaming/images/gold.png)

The **Gold Layer** contains aggregated and transformed data structured into dimensional models. Data is organized into **dimension tables** and **fact tables** for analytics and reporting.

 **Dimension Tables**

- **`gold_dim_date`**:  
  Derived from `silver_timestampt`.  
  Includes: `date_id`, `order_date`, `day`, `month`, `year`, `quarter`, `week_of_year`, `weekday_num`, `weekday_name`.  
  Supports time-based analysis across various intervals.

- **`gold_dim_time`**:  
  Also derived from `silver_timestampt`.  
  Helps analyze customer behavior by specific time periods (e.g., hour of day).

- **`gold_dim_pizza`**:  
  Contains detailed information on each pizza, built from `silver_pizza_catalog`.  
  Includes a synthetic key `pizza_sk` for joining with fact tables.

**Fact Tables**

- **`gold_fact_order_item`**:  
  The main fact table capturing item-level order details.  
  Created by joining `silver_order_items` with dimension tables `gold_dim_date`, `gold_dim_time`, and `gold_dim_pizza` using foreign keys.

--- 
## Sales Insight Dashboard by Power BI 

![Power BI Dashboard Screenshot](/projects/Streaming/images/dashboard.png)

**Key Features**:
   - **Revenue Analytics**: Total revenue by time, pizza type, and order channel.
   - **Best Seller Insights**: Top-selling pizzas and categories.
   - **Operational Metrics**: Number of orders, average order value, and peak order hours.
   - **Dynamic Filtering**: Slicers allow filtering by date, pizza category, and order source.

**Some Measure function**


        #avarage order in a day 
        Average_Orders_Per_Day = 
        DIVIDE(
            COUNTROWS('pizza_sales fact_order_item'),
            DISTINCTCOUNT('pizza_sales fact_order_item'[order_date])
        )

        # Best seller
        Top_Pizza = 
        CALCULATE(
            MAX('pizza_sales dim_pizza'[pizza_name]),
            TOPN(
                1,
                ADDCOLUMNS(
                    VALUES('pizza_sales dim_pizza'[pizza_name]),
                    "TotalSales", 
                    CALCULATE(SUM('pizza_sales fact_order_item'[total_price]))
                ),
                [TotalSales], DESC
            )
        )

        # Avarage price per order
        Avg_Price_Perorder = 
        DIVIDE(
            SUM('pizza_sales fact_order_item'[total_price]),
            SUM('pizza_sales fact_order_item'[quantity])
        )



##  Installation & Deployment

### Prerequisites

   - Docker Desktop
   - 8GB+ RAM recommended
   - python 3.8
   - Power BI Desktop
### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/huyentranq/Streaming-Data-pipeline.git
   cd Streaming-Data-pipeline
   ```

2. **Set up environment variables**
   ```bash
   # Edit .env file with your configuration
   ```

3. **Initialize all container**

   ```bash
   #note: run one by one
   make install 
   make build_stream
   make up_stream
   make up

   ```
   **Port Mappings & Service Access**

    - Apache Airflow    http://localhost:8080     
    - Kafka UI          http://localhost:8081   
    - MinIO Console     http://localhost:9000    
    - PostgreSQL        http://localhost:5432    

4. **Start kafka streaming**
   ```bash
   make kafka_stream
   ```
   Visit http://localhost:8081 to monitor messages streamed from the producer.
5. **Initialize the data warehouse**
   ```bash
   make psql_create
   ```
   - Connect PostgreSQL to DBeaver (desktop app) for managing the database with a graphical interface.
6. **Launch Airflow to Manage DAGs**
   http://localhost:8080

   From there, you can view, trigger, and monitor all available DAGs
   
7. **connect Power BI(desktop)**

   You can download my dashboard in github: images/dashboard.pbix

   **Access the Dashboard**:

   - Make sure the PostgreSQL connection is properly configured in Power BI (check credentials and host settings).
   - Open my dashboard in your Power BI Desktop to open and interact with the report.

   **Try build your own dashboard**



### Makefile Commands
`Makefile` to simplify setup, deployment, and testing. Below is a summary of the available commands:

    ```
    #Install Python dependencies from `requirements.txt`      
    make install

    #Start all services defined in `docker-compose.yml`   
    make up 

    # Stop and remove all core services in `docker-compose.yml`  
    make down 

    #Start streaming services in stream-docker-compose.yml  (Kafka, Spark Streaming,Minio etc.)
    make up_stream

    #Stop and remove streaming services and volumes in stream-docker-compose.yml 
    make down_stream

    # Run the Kafka producer to stream data into Kafka topic   
    make kafka_stream

    # test layer's job
    make test_bronze
    make test_silver
    make test_gold
    make test_warehouse

    #Connect to the PostgreSQL database (using variables from .env)
    make to_psql

    #Connect to the PostgreSQL server without selecting a database 
    make to_psql_no_db

    # Initialize PostgreSQL schema using /tmp/load_dataset/psql_schema.sql
    make psql_create

    ```


>  **Tip:** Ensure your `.env` file is correctly configured before executing any command.

---


##  Limitations & Future Improvements

### Current Limitations

1. **Scalability**: Single-node setup limits processing capacity
3. **Error Handling**: Basic error handling and retry mechanisms
4. **Security**: Default credentials and minimal security configuration
5. **Monitoring**: Limited observability and alerting capabilities

### How you can make it better

1. **Enhanced Scalability**
   - Multi-node Kafka and Spark clusters
   - Kubernetes deployment for auto-scaling
   - Partitioning strategies for large datasets


2. **Data Quality & Governance**
   - Data lineage tracking
   - Automated data profiling and validation

3. **Integerate CI/CD**
   - logic testing
   - schema validation


## Conclusion
   Through this streaming pipeline project, I had the opportunity to explore advanced technologies such as Kafka, Spark         Streaming,Airflow, Power BI.

   Each of them is incredibly powerful — and quite challenging to get hands-on immediately.

   After three weeks of effort, I finally completed the project and learned a great deal.

   This is my third Data Engineering project on my journey to becoming a Data Engineer, and I truly hope it will be useful to you as  well.



---

**Happy coding!**