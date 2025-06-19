# ELT Pipeline for Movie Recommendation System

TMDB-Pipeline-Recommendation is a Data Engineering project that builds a complete ELT pipeline to support:

- A movie recommendation system based on personal rating history
- Analytical dashboards for movie information

The project focuses on designing a full-fledged ELT pipeline, starting from data collection (Kaggle, TMDB API), transformation using Apache Spark following Lakehouse architecture, storage in PostgreSQL, data modeling with DBT, and visualization with Streamlit. Dagster is used as the data orchestrator.



### 1.Streamlit Interface

![Streamlit UI](/projects/TMDB/images/output.jpg)



### 2.Project Overview

#### 2.1.Data Pipeline Design

![Pipeline Diagram](/huyentrang.github.io/projects/TMDB/images/pipeline.png)

##### 1. Data Sources

- Movie data is collected from two main sources:

  - `TMDB API`: Retrieves movie info from TMDB’s official API, including user-rated favorite movies.
  - `Kaggle`: Dataset (~1M) containing TMDB movie information.

- `MySQL`: Raw, unprocessed Kaggle dataset (~1M rows) is first loaded into MySQL.
##### 2. Lakehouse

  - `Apache Spark`: High-speed big data processing, structured into multiple layers:
    - **Bronze**: Stores raw ingested data
    - **Silver**: Cleaned and normalized data
    - **Gold**: Enriched and structured data ready for analytics

  - `Polars`: Used for lightweight, efficient pre-processing tasks.

  - `Spark MLlib`: Used for simple ML techniques or content-based recommendation.


##### 3. Data Warehouse

- Once processed, data flows from Bronze → Silver → Gold, then into a PostgreSQL data warehouse.

  - `DBT`: Builds intermediate data models to simplify queries for the frontend.

##### 4. Streamlit – User Interface

- Streamlit is used to create the user interface, with three main features:
  - **Recommendations**: Suggest movies based on behavior/content
  - **Visualizations**: Dashboards and charts from movie data
  - **Search Information**: Filter movies by rating, genre, release year



#### 2.2.Data Lineage

Dagster is used as the **orchestrator**. It allows managing, scheduling, and visualizing data pipelines.

![Data lineage](/huyentrang.github.io/projects/TMDB/images/lineage.jpg)

   - The raw data is loaded from MySQL and the TMDB API.
   - At the silver level, the data is cleaned, normalized, and the tables are split in preparation for recommendations at the gold level.
   - At the gold level, recommendations are implemented, combining several tables containing movie information.
   - The data is then loaded into the warehouse (PostgreSQL) to prepare for analysis.

   (In the warehouse, a slight transformation is performed using dbt.)


##### Detailed Breakdown by Layer

###### 2.2.1. Bronze Layer

![Bronze Layer](/huyentrang.github.io/projects/TMDB/images/bronze_layer.jpg)

- `bronze_movies`: dataset ~1M rows from MySQL
- `bronze_genre_track`: dataset self-collected to support transformation
- `bronze_favorite_movies`: calls TMDB API (utils/TMDBLoader) to fetch personal favorite movies

###### 2.2.2. Silver Layer

![Silver Layer](/huyentrang.github.io/projects/TMDB/images/silver.jpg)

- `silver_movies_cleaned`, `silver_favorite_track`: clean, normalize, and transform data from `bronze_movies` and `bronze_favorite_movies` using Apache Spark
- `silver_movies_vectors`: extract features for recommendation from `silver_movies_cleaned`
- `silver_my_vector`: extract necessary features (columns) for recommendation

###### 2.2.3. Gold Layer

![Gold Layer](/huyentrang.github.io/projects/TMDB/images/gold.jpg)

- `gold_movies_infor` / `rating` / `genres`: split information respectively for infor, rating, and genres from `silver_movies_cleaned`
- `gold_my_vector`: transform personal movie vector data and combine all features into a single vector (ML Spark)
- `gold_movies_vector`: transform `silver_movies_vectors` for each movie to generate movie vectors
- `gold_recommendations`: create recommendation scores based on `gold_my_vector` and `gold_movies_vector`

###### 2.2.4. Warehouse Layer

![Warehouse Layer](/huyentrang.github.io/projects/TMDB/images/warehouse.jpg)

- `movies_infor` / `genres` / `rating`: load data from `gold_movies_infor` / `rating` / `genres` from the Gold layer
- `favorite_track`: load from `silver_favorite_track`, containing personal favorite movies (cleaned)
- `recommendations`: load the `gold_recommendations` table to display


### 3.Installation & Deployment Steps

#### 3.1.Prerequisites

- Docker & Docker Compose
- DBeaver or any SQL management tool (for PostgreSQL and MySQL)
- Python 3

#### 3.2.Setup Steps

1. **Clone the Repository:**
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Download the Dataset:**
   - Download the dataset from Kaggle ([Dataset link](https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies)) and place the files into the `dataset` directory.

3. **Prepare the ENV File:**
   - Fill in the necessary details in the ENV file. For example, for TMDB, visit [TMDB](https://www.themoviedb.org/) to create an account, add some favorite movies, and then go to Settings/API to obtain your **API Access Token**. Add this token in your ENV file.
   - *(Feel free to customize the ENV file for additional configurations as needed.)*
   - ![API Access Token](/huyentrang.github.io/projects/TMDB/images/API.jpg)

4. **Set Up the Virtual Environment & Verify Python Installation:**
   ```sh
   python3 -V        # Check your Python version
   python3 -m venv venv  # Create a virtual environment
   source venv/bin/activate
   ```

5. **Build & Start the Containers:**
   - Build each component sequentially as specified in the Makefile:
     ```sh
     make build-dagster
     make build-spark
     make build-pipeline
     make build-streamlit
     
     make build
     ```
   - Start the containers:
     ```sh
     make up
     ```
   - Once running, use Docker Desktop to monitor container progress.




#### 3.3.Load Dataset into MySQL & PostgreSQL


**Loading Dataset into MySQL**

1. Access the MySQL Container as Root:
   ```sh
   make to_mysql_root
   ```
2. Set Up MySQL Configuration:
   ```sql
   SET GLOBAL local_infile=TRUE;
   SHOW VARIABLES LIKE "local_infile";
   exit
   ```
3. Import the Dataset:
   ```sh
   make to_mysql
   source /tmp/mysql_schemas.sql;
   show tables;
   source /tmp/load_dataset/mysql_load.sql;
   exit
   ```
4. Verify the Data:
   Connect using DBeaver (or another SQL tool) to check that the data has been successfully uploaded to MySQL.

**Creating the Database for PostgreSQL**

1. Access the PostgreSQL Container:
   ```sh
   make to_psql
   ```
2. Execute the Database Creation Script:
   ```sql
   source /tmp/load_dataset/psql_datasource.sql;
   ```
3. Verify the Imported Data:
   Use DBeaver (or another SQL tool) to connect to PostgreSQL and verify the database schema and data.


### 4.Automate Jobs with Dagster

- Open Dagster UI: `http://localhost:3001`
- Run and monitor ELT assets
- Use the Dagster interface to track the pipeline’s progress, execute individual assets, and review logs to ensure everything is running smoothly.

### 5.Build Query Models Using DBT

- After loading data into the warehouse, navigate to the dbt project folder and build your models sequentially:
   ```sh
   cd elt_pipeline/dbt_movies
   dbt debug
   dbt build
   ```



### 6.Explore with Streamlit

- Access the Streamlit interface to view dashboards, movie recommendations, and visualizations.
   ![Streamlit Interface](/huyentrang.github.io/projects/TMDB/images/streamlit.jpg)



### 7.Conclusion

This is my second Data Pipeline project, through which I’ve had the opportunity to learn and implement new technologies within the Data Engineering field. We hope that this source code serves as a valuable reference for developers and learners exploring data-driven solutions.

**Happy Coding!**