# Interactive System Design Learning Platform

This repository contains a **fully interactive learning platform** for system design.  
It is designed to run directly from **GitHub Pages** (or via an automated GitHub Actions deployment) so learners can explore system‑design topics without installing any software locally.  

## Project goals

The platform aims to demystify system design by letting learners:

1. **Visualize system architectures** – Each scenario includes diagrams rendered with [Mermaid](https://mermaid.js.org/), making it easy to see how components relate to each other.  
   You can update these diagrams in real time by choosing different design options.
2. **Mock real‑world scenarios** – Build and experiment with designs for a URL shortener, an e‑commerce platform and a social‑media backend.  
   These scenarios highlight different design trade‑offs such as load balancing, microservices versus monolithic architectures and data‑consistency models.
3. **Experiment with design choices** – Each scenario exposes configuration options (SQL vs NoSQL, single region vs multi‑region, caching strategies, sharding, etc.).  
   When you adjust these options the platform recalculates a set of metrics – performance, scalability, fault tolerance, cost efficiency and simplicity – and updates charts and diagrams accordingly.
4. **Understand trade‑offs** – For every decision the platform explains advantages and disadvantages.  
   For example, relational databases provide ACID guarantees but typically scale **vertically**【284378203236144†L396-L447】, whereas NoSQL databases offer **horizontal scalability** and flexible schema definitions【284378203236144†L468-L524】 but may sacrifice standardization and strong consistency【284378203236144†L528-L556】.  
   Likewise, adding a load balancer improves availability and scalability【527821987704086†L333-L355】 but introduces extra complexity and a potential single point of failure【527821987704086†L357-L377】.
5. **Receive AI‑powered hints** – The platform provides guidance suggesting why one design might be better suited to a particular scenario, based on the selected options and the underlying research.
6. **Learn core concepts** – Embedded explanations, references and citations help you understand key system‑design concepts such as sharding, caching, fault tolerance, scalability and consistency models (e.g. eventual consistency【547208730996788†L194-L246】 versus strong consistency).

## Repository structure

```
├── .github/workflows/deploy.yml  # GitHub Actions pipeline for automatic deployment
├── assets/
│   └── network-illustration.png  # Decorative header image used on the homepage
├── index.html                    # Main HTML entry point with interactive scenarios
├── script.js                     # All client‑side logic for interactivity and metrics
├── styles.css                    # Styling for the platform
└── README.md                     # Project documentation (this file)
```

### GitHub Pages vs GitHub Actions

GitHub offers two ways to serve a static site:

* **GitHub Pages** – If your repository is public you can serve the content directly from the default branch (`main`) or from a `docs/` folder.  
  To use this method simply enable **Pages** in your repository settings and select the branch/folder containing `index.html`.  
  Pages will handle deployment automatically whenever you push changes.
* **GitHub Actions** – This repository includes a workflow (`.github/workflows/deploy.yml`) that packages and deploys the site to the `gh‑pages` branch each time the `main` branch is updated.  
  This approach works whether the repository is public or private and gives you more control over build steps.  The workflow uses the official [`actions/deploy-pages`](https://github.com/actions/deploy-pages) action.

### Running the project locally

This project is designed to run directly in the browser via GitHub Pages.  However, if you want to preview it locally, run a lightweight HTTP server in the project root:

```sh
# Python 3
python3 -m http.server 8000

# Node.js (http-server must be installed)
npx http-server .
```

Then open `http://localhost:8000` in your browser.

## Scenarios and options

### URL Shortener

The URL shortener scenario models a simple service like TinyURL.  It allows you to choose:

* **Database** – SQL (relational) vs NoSQL.  
  Relational databases enforce schemas and ACID transactions but usually scale vertically【284378203236144†L396-L447】.  NoSQL databases trade some consistency for horizontal scalability and flexible schemas【284378203236144†L468-L524】.
* **Sharding** – No sharding (single database) vs sharding across multiple partitions.  Sharding improves scalability by distributing data but adds complexity.
* **Caching** – No caching vs caching layer.  Caching improves performance and reduces latency by keeping frequently accessed data close to the application【447981731188611†L166-L184】, especially when the source data is relatively static or remote【447981731188611†L177-L184】.

### E‑commerce Platform

This scenario models an online store with cart management, payment processing and product catalog.  Options include:

* **Architecture** – Monolithic vs microservices.  A monolithic architecture packages all functionality into a single deployment; it is easier to develop initially but becomes harder to maintain as the system grows【872567736884915†L165-L220】.  Microservices break the application into independently deployable services, allowing better scalability and flexibility at the cost of increased complexity and inter‑service communication【872567736884915†L198-L221】.
* **Region** – Single region vs multi‑region.  Multi‑region deployments reduce latency for geographically distributed users and provide higher reliability and fault tolerance【692082087127976†L170-L184】 while allowing independent scaling in each region【692082087127976†L185-L190】.  They can also optimize cost by placing resources near the majority of users【692082087127976†L194-L203】 but introduce additional deployment complexity and data‑replication costs.
* **Cache** – No cache, Redis (application caching) or CDN (edge caching).  Caching improves performance but adds complexity and potential consistency challenges.
* **Database** – SQL vs NoSQL (see above).

### Social Media Backend

The social‑media backend scenario focuses on handling user posts, follows and timelines.  Options include:

* **Consistency model** – Strong/ACID consistency vs eventual consistency.  Eventual consistency allows replicas to diverge temporarily but guarantees convergence over time【547208730996788†L194-L246】, enabling higher availability and scalability.  Strong consistency ensures all replicas see the same data at the cost of latency.
* **Storage** – SQL vs NoSQL (as described above).
* **Partitioning** – Vertical (different tables for different entities) vs horizontal (sharding by user ID).  Horizontal partitioning improves scalability but adds complexity.
* **Caching** – Enable or disable caching.

## Interacting with the platform

1. Navigate to the scenario you want to explore via the navigation bar.
2. Select your preferred options using the radio buttons.  As you change each option:
   * The **Mermaid diagram** updates to reflect the architecture (e.g. SQL vs NoSQL database, caching layers, sharded partitions, multi‑region replicas).
   * A **bar chart** redraws to show relative scores for performance, scalability, fault tolerance, cost efficiency and simplicity.  These scores are computed using a simple heuristic to help you reason about trade‑offs.  For example, adding a load balancer improves availability and scalability but introduces extra complexity【527821987704086†L333-L355】【527821987704086†L357-L377】.
   * A **summary panel** lists advantages and disadvantages of your selections, citing the research used to build the model.
3. Review the AI‑generated recommendation at the bottom of each scenario, which suggests whether your choices are balanced or highlights potential improvements.

## Extending the platform

This project serves as a foundation that you can extend.  To add new scenarios or options:

1. Add a new `<section>` in `index.html` with a unique ID and controls for your options.
2. Write a corresponding update function in `script.js` to compute metrics, generate the Mermaid diagram and update the chart.
3. Update navigation links if necessary.

## Deployment configuration

The included GitHub Actions workflow builds and deploys the site whenever you push to the `main` branch.  It uses the [Deploy to GitHub Pages action](https://github.com/actions/deploy-pages) and does not require any external services.  If you prefer to use GitHub Pages directly, you can disable the workflow and enable Pages in your repository settings.

## References

* Relational (SQL) databases use rigid schemas, follow ACID properties and typically scale **vertically**【284378203236144†L396-L447】, offering data integrity and transactional reliability【284378203236144†L396-L437】 but suffering from scalability limitations and performance issues on unstructured data【284378203236144†L444-L458】.  NoSQL databases feature flexible schemas, **horizontal scalability** and high performance【284378203236144†L468-L524】, but may lack standardization, guarantee only eventual consistency and can complicate complex transactions【284378203236144†L528-L556】.
* A monolithic architecture is simple to develop but can become difficult to maintain as an application grows【872567736884915†L165-L220】, whereas microservices break functionality into independently deployable services, offering better scalability and flexibility【872567736884915†L198-L221】.
* Load balancing distributes client requests across multiple servers to improve availability, scalability and fault tolerance【527821987704086†L333-L355】; however, it introduces complexity and can be a single point of failure【527821987704086†L357-L377】.
* Caching stores frequently accessed data close to the application, significantly improving response times and scalability【447981731188611†L166-L184】.  It works best when the underlying data is relatively static, slow or subject to high contention【447981731188611†L177-L184】.
* Multi‑region deployments reduce latency and improve fault tolerance by hosting services close to users and duplicating data across regions【692082087127976†L170-L184】, allow independent scaling in each area【692082087127976†L185-L190】 and can optimise costs by placing resources near the majority of users【692082087127976†L194-L203】.
* Eventual consistency allows replicas in distributed systems to diverge temporarily while ensuring they eventually converge to the same value【547208730996788†L194-L246】.  It improves availability and performance but requires applications to tolerate stale reads and relaxed ordering of updates.

---

Feel free to tailor this platform to your specific learning goals or integrate it into courses and workshops.  Contributions and feedback are welcome!