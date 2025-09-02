// Initialize Mermaid once. Do not automatically start on load; we'll render diagrams manually.
mermaid.initialize({ startOnLoad: false });

// Utility to clamp numbers between 0 and 100
function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

// Generic function to build a bar chart for our metrics
function buildChart(ctx) {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Performance', 'Scalability', 'Fault Tolerance', 'Cost Efficiency', 'Simplicity'],
      datasets: [{
        label: 'Score (0‑100)',
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#1e3a8a', '#3b82f6', '#14b8a6', '#f59e0b', '#ef4444'],
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Score',
          },
        },
        x: {
          title: {
            display: false,
          },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });
}

// Compute metrics for URL Shortener scenario
function computeUrlMetrics(opts) {
  // baseline values
  let perf = 60;
  let scalability = 50;
  let fault = 60;
  let cost = 70;
  let simplicity = 80;

  // Database selection
  if (opts.db === 'NoSQL') {
    perf += 10;
    scalability += 15;
    fault += 5;
    cost -= 5;
    simplicity -= 5;
  }

  // Sharding
  if (opts.shard === 'sharded') {
    perf += 10;
    scalability += 20;
    fault += 10;
    cost -= 10;
    simplicity -= 15;
  }

  // Caching
  if (opts.cache === 'cache') {
    perf += 20;
    scalability += 10;
    fault += 5;
    cost -= 10;
    simplicity -= 5;
  }

  return {
    performance: clamp(perf),
    scalability: clamp(scalability),
    faultTolerance: clamp(fault),
    costEfficiency: clamp(cost),
    simplicity: clamp(simplicity),
    finalScore: clamp((perf * 0.4 + scalability * 0.25 + fault * 0.2 + cost * 0.1 + simplicity * 0.05)),
  };
}

// Compute metrics for E‑commerce scenario
function computeEcomMetrics(opts) {
  let perf = 50;
  let scalability = 40;
  let fault = 60;
  let cost = 70;
  let simplicity = 70;

  if (opts.arch === 'Microservices') {
    perf += 10;
    scalability += 20;
    fault += 10;
    cost -= 10;
    simplicity -= 20;
  }
  if (opts.region === 'multi') {
    perf += 10;
    scalability += 15;
    fault += 20;
    cost -= 10;
    simplicity -= 10;
  }
  if (opts.cache === 'redis') {
    perf += 15;
    scalability += 10;
    fault += 5;
    cost -= 5;
    simplicity -= 5;
  } else if (opts.cache === 'cdn') {
    perf += 20;
    scalability += 15;
    fault += 5;
    cost -= 5;
    simplicity -= 5;
  }
  if (opts.db === 'NoSQL') {
    perf += 10;
    scalability += 15;
    fault += 10;
    cost -= 5;
    simplicity -= 5;
  }
  return {
    performance: clamp(perf),
    scalability: clamp(scalability),
    faultTolerance: clamp(fault),
    costEfficiency: clamp(cost),
    simplicity: clamp(simplicity),
    finalScore: clamp((perf * 0.35 + scalability * 0.25 + fault * 0.2 + cost * 0.15 + simplicity * 0.05)),
  };
}

// Compute metrics for Social Media scenario
function computeSocialMetrics(opts) {
  let perf = 40;
  let scalability = 40;
  let fault = 60;
  let cost = 70;
  let simplicity = 60;

  if (opts.consistency === 'Eventual') {
    perf += 15;
    scalability += 15;
    fault += 10;
    simplicity -= 10;
  }
  if (opts.db === 'NoSQL') {
    perf += 10;
    scalability += 20;
    fault += 10;
    cost -= 5;
    simplicity -= 5;
  }
  if (opts.partition === 'horizontal') {
    perf += 10;
    scalability += 20;
    fault += 10;
    cost -= 5;
    simplicity -= 15;
  }
  if (opts.cache === 'cache') {
    perf += 20;
    scalability += 10;
    fault += 5;
    cost -= 10;
    simplicity -= 5;
  }
  return {
    performance: clamp(perf),
    scalability: clamp(scalability),
    faultTolerance: clamp(fault),
    costEfficiency: clamp(cost),
    simplicity: clamp(simplicity),
    finalScore: clamp((perf * 0.35 + scalability * 0.25 + fault * 0.2 + cost * 0.1 + simplicity * 0.1)),
  };
}

// Generate summary for URL Shortener
function updateUrlSummary(opts, metrics) {
  const summary = document.getElementById('urlSummary');
  let html = `<h4>Summary & Trade‑offs</h4>`;
  html += `<p><strong>Final score:</strong> ${metrics.finalScore.toFixed(1)} / 100</p>`;
  html += '<ul>';
  // Database
  if (opts.db === 'SQL') {
    html += '<li>Using a relational database offers ACID transactions and a rigid schema for strong consistency【284378203236144†L396-L437】 but typically scales vertically and may become a bottleneck【284378203236144†L444-L458】.</li>';
  } else {
    html += '<li>Using a NoSQL store provides flexible schemas and horizontal scalability【284378203236144†L468-L524】 but lacks a standardized query language and may only provide eventual consistency【284378203236144†L528-L556】.</li>';
  }
  // Sharding
  if (opts.shard === 'sharded') {
    html += '<li>Sharding distributes data across partitions to improve throughput and scalability, but it introduces significant operational complexity.</li>';
  } else {
    html += '<li>A single database is simple to manage but can limit scalability as the system grows.</li>';
  }
  // Caching
  if (opts.cache === 'cache') {
    html += '<li>Adding a cache keeps frequently used data close to the application, dramatically reducing latency【447981731188611†L166-L175】. It is most effective when the underlying data is static or remote【447981731188611†L177-L184】. However, it adds complexity and risks stale reads.</li>';
  } else {
    html += '<li>No caching keeps the architecture simple but may increase response times.</li>';
  }
  html += '</ul>';
  // AI recommendation (simple heuristic)
  if (metrics.finalScore > 80) {
    html += '<p><em>Recommendation:</em> Your configuration achieves a good balance between performance and maintainability. Consider monitoring cost if you have enabled multiple features.</p>';
  } else if (metrics.finalScore > 60) {
    html += '<p><em>Recommendation:</em> The design is reasonable but could be improved by enabling caching or sharding depending on your workload.</p>';
  } else {
    html += '<p><em>Recommendation:</em> This configuration may struggle at scale. Consider introducing sharding or caching and evaluate whether a NoSQL database better suits your workload.</p>';
  }
  summary.innerHTML = html;
}

// Generate summary for E‑commerce
function updateEcomSummary(opts, metrics) {
  const summary = document.getElementById('ecomSummary');
  let html = '<h4>Summary & Trade‑offs</h4>';
  html += `<p><strong>Final score:</strong> ${metrics.finalScore.toFixed(1)} / 100</p>`;
  html += '<ul>';
  // Architecture
  if (opts.arch === 'Monolithic') {
    html += '<li>Monolithic architecture is easier to develop initially but becomes difficult to maintain as the system grows【872567736884915†L165-L220】.</li>';
  } else {
    html += '<li>Microservices allow independent deployment and scaling, increasing flexibility【872567736884915†L198-L221】 but adding complexity through service communication and deployment orchestration.</li>';
  }
  // Region
  if (opts.region === 'single') {
    html += '<li>A single region keeps deployment simple but can increase latency for users far from the data centre and provides limited fault tolerance.</li>';
  } else {
    html += '<li>Multi‑region reduces latency for global users and improves fault tolerance【692082087127976†L170-L184】. It allows independent scaling per region【692082087127976†L185-L190】 but increases deployment complexity and cost【692082087127976†L194-L203】.</li>';
  }
  // Cache
  if (opts.cache === 'none') {
    html += '<li>No caching keeps the system simple but may lead to higher latency and load on the database.</li>';
  } else if (opts.cache === 'redis') {
    html += '<li>Redis caching reduces database load and speeds up dynamic data access. It introduces additional infrastructure to manage.</li>';
  } else if (opts.cache === 'cdn') {
    html += '<li>A CDN caches static assets close to users, improving load times worldwide. However, it only benefits static content and adds cost.</li>';
  }
  // Database
  if (opts.db === 'SQL') {
    html += '<li>Relational databases offer strong consistency and a mature ecosystem【284378203236144†L396-L437】 but typically scale vertically and may face performance bottlenecks on large datasets【284378203236144†L444-L458】.</li>';
  } else {
    html += '<li>NoSQL databases provide horizontal scalability and flexible schemas【284378203236144†L468-L524】 but lack standardization and may only provide eventual consistency【284378203236144†L528-L556】.</li>';
  }
  html += '</ul>';
  if (metrics.finalScore > 80) {
    html += '<p><em>Recommendation:</em> This configuration offers a balanced trade‑off between user experience and maintainability. Monitor costs if you deploy multi‑region and caching.</p>';
  } else if (metrics.finalScore > 60) {
    html += '<p><em>Recommendation:</em> Consider enabling Redis or CDN caching and evaluating a multi‑region deployment for global users.</p>';
  } else {
    html += '<p><em>Recommendation:</em> The current design may not scale well. Evaluate a microservices architecture or adopt a NoSQL database and caching to improve scalability.</p>';
  }
  summary.innerHTML = html;
}

// Generate summary for Social Media
function updateSocialSummary(opts, metrics) {
  const summary = document.getElementById('socialSummary');
  let html = '<h4>Summary & Trade‑offs</h4>';
  html += `<p><strong>Final score:</strong> ${metrics.finalScore.toFixed(1)} / 100</p>`;
  html += '<ul>';
  // Consistency
  if (opts.consistency === 'Strong') {
    html += '<li>Strong consistency ensures all replicas see the same data but can increase latency and decrease availability.</li>';
  } else {
    html += '<li>Eventual consistency allows replicas to diverge temporarily but guarantees convergence over time【547208730996788†L194-L246】, offering better availability and performance at the cost of stale reads.</li>';
  }
  // Storage
  if (opts.db === 'SQL') {
    html += '<li>Relational databases provide ACID guarantees but may struggle to scale horizontally【284378203236144†L396-L447】.</li>';
  } else {
    html += '<li>NoSQL databases scale horizontally and handle large unstructured datasets【284378203236144†L468-L524】 but can complicate complex queries and transactions【284378203236144†L528-L556】.</li>';
  }
  // Partitioning
  if (opts.partition === 'horizontal') {
    html += '<li>Horizontal partitioning (sharding) distributes users or data across nodes, improving scalability but adding complexity.</li>';
  } else {
    html += '<li>Vertical partitioning groups tables by domain; it is easier to implement but may create hotspots under heavy load.</li>';
  }
  // Cache
  if (opts.cache === 'cache') {
    html += '<li>Caching user timelines and profiles reduces latency【447981731188611†L166-L175】 but introduces potential staleness and management overhead.</li>';
  } else {
    html += '<li>No caching means every request hits the storage layer, which may increase latency and database load.</li>';
  }
  html += '</ul>';
  if (metrics.finalScore > 80) {
    html += '<p><em>Recommendation:</em> Good balance of scalability and reliability. Monitor consistency requirements if using eventual consistency.</p>';
  } else if (metrics.finalScore > 60) {
    html += '<p><em>Recommendation:</em> Consider enabling caching or switching to eventual consistency to improve performance.</p>';
  } else {
    html += '<p><em>Recommendation:</em> The current configuration may suffer under heavy social traffic. Evaluate horizontal partitioning, caching and a NoSQL database.</p>';
  }
  summary.innerHTML = html;
}

// Render Mermaid diagram for URL Shortener
function updateUrlDiagram(opts) {
  let code = 'graph LR\n';
  code += 'User((User)) --> LB[Load Balancer]\n';
  if (opts.cache === 'cache') {
    code += 'LB --> Cache{{Cache}}\n';
    code += 'Cache --> App[Application] \n';
  } else {
    code += 'LB --> App[Application] \n';
  }
  if (opts.shard === 'sharded') {
    code += `App --> DB1[${opts.db} Shard 1] \n`;
    code += `App --> DB2[${opts.db} Shard 2] \n`;
  } else {
    code += `App --> DB[${opts.db}] \n`;
  }
  const el = document.getElementById('urlDiagram');
  el.className = 'mermaid';
  el.textContent = code;
  // Render diagram. Provide a unique id per render to avoid collisions
  mermaid.run({ nodes: [el] });
}

// Render Mermaid diagram for E‑commerce
function updateEcomDiagram(opts) {
  let code = 'graph TD\n';
  // Handle CDN
  if (opts.cache === 'cdn') {
    code += 'User((User)) --> CDN[CDN]\n';
    code += 'CDN --> LB[Load Balancer]\n';
  } else {
    code += 'User((User)) --> LB[Load Balancer]\n';
  }
  // Architecture
  if (opts.arch === 'Monolithic') {
    code += 'LB --> App[Monolithic Application]\n';
    // Cache between application and database
    if (opts.cache === 'redis') {
      code += 'App --> Cache{{Redis}}\n';
      code += `Cache --> DB[${opts.db}] \n`;
    } else {
      code += `App --> DB[${opts.db}] \n`;
    }
  } else {
    // Microservices with API gateway
    code += 'LB --> API[API Gateway]\n';
    const services = ['Catalog', 'Order', 'User'];
    services.forEach((svc, idx) => {
      const svcId = `S${idx}`;
      code += `API --> ${svcId}[${svc} Service] \n`;
      if (opts.cache === 'redis') {
        code += `${svcId} --> C${idx}{{Redis}} \n`;
        code += `C${idx} --> ${svcId}DB[${svc} ${opts.db}] \n`;
      } else {
        code += `${svcId} --> ${svcId}DB[${svc} ${opts.db}] \n`;
      }
    });
  }
  // Region duplication
  if (opts.region === 'multi') {
    // Wrap existing code into two subgraphs. We'll simply duplicate the components.
    code = 'graph TD\n';
    code += 'subgraph Region1\n';
    if (opts.cache === 'cdn') {
      code += 'User1((User)) --> CDN1[CDN]\n';
      code += 'CDN1 --> LB1[Load Balancer]\n';
    } else {
      code += 'User1((User)) --> LB1[Load Balancer]\n';
    }
    if (opts.arch === 'Monolithic') {
      code += 'LB1 --> App1[Monolithic Application]\n';
      if (opts.cache === 'redis') {
        code += 'App1 --> Cache1{{Redis}}\n';
        code += `Cache1 --> DB1[${opts.db}] \n`;
      } else {
        code += `App1 --> DB1[${opts.db}] \n`;
      }
    } else {
      code += 'LB1 --> API1[API Gateway]\n';
      services.forEach((svc, idx) => {
        const sid = `R1S${idx}`;
        code += `API1 --> ${sid}[${svc} Service] \n`;
        if (opts.cache === 'redis') {
          code += `${sid} --> R1C${idx}{{Redis}} \n`;
          code += `R1C${idx} --> R1DB${idx}[${svc} ${opts.db}] \n`;
        } else {
          code += `${sid} --> R1DB${idx}[${svc} ${opts.db}] \n`;
        }
      });
    }
    code += 'end\n';
    code += 'subgraph Region2\n';
    if (opts.cache === 'cdn') {
      code += 'User2((User)) --> CDN2[CDN]\n';
      code += 'CDN2 --> LB2[Load Balancer]\n';
    } else {
      code += 'User2((User)) --> LB2[Load Balancer]\n';
    }
    if (opts.arch === 'Monolithic') {
      code += 'LB2 --> App2[Monolithic Application]\n';
      if (opts.cache === 'redis') {
        code += 'App2 --> Cache2{{Redis}}\n';
        code += `Cache2 --> DB2[${opts.db}] \n`;
      } else {
        code += `App2 --> DB2[${opts.db}] \n`;
      }
    } else {
      code += 'LB2 --> API2[API Gateway]\n';
      services.forEach((svc, idx) => {
        const sid = `R2S${idx}`;
        code += `API2 --> ${sid}[${svc} Service] \n`;
        if (opts.cache === 'redis') {
          code += `${sid} --> R2C${idx}{{Redis}} \n`;
          code += `R2C${idx} --> R2DB${idx}[${svc} ${opts.db}] \n`;
        } else {
          code += `${sid} --> R2DB${idx}[${svc} ${opts.db}] \n`;
        }
      });
    }
    code += 'end\n';
  }
  const el = document.getElementById('ecomDiagram');
  el.className = 'mermaid';
  el.textContent = code;
  mermaid.run({ nodes: [el] });
}

// Render Mermaid diagram for Social Media
function updateSocialDiagram(opts) {
  let code = 'graph LR\n';
  code += 'User((User)) --> LB[Load Balancer]\n';
  // Service layer
  if (opts.cache === 'cache') {
    code += 'LB --> Service[Backend Service] \n';
    code += 'Service --> Cache{{Cache}} \n';
  } else {
    code += 'LB --> Service[Backend Service] \n';
  }
  // Partitioning and storage
  let storageLabel = opts.db;
  if (opts.consistency === 'Eventual') {
    storageLabel += ' (eventual)';
  }
  if (opts.partition === 'horizontal') {
    if (opts.cache === 'cache') {
      code += `Cache --> DB1[${storageLabel} Shard 1] \n`;
      code += `Cache --> DB2[${storageLabel} Shard 2] \n`;
    } else {
      code += `Service --> DB1[${storageLabel} Shard 1] \n`;
      code += `Service --> DB2[${storageLabel} Shard 2] \n`;
    }
  } else {
    if (opts.cache === 'cache') {
      code += `Cache --> DB[${storageLabel}] \n`;
    } else {
      code += `Service --> DB[${storageLabel}] \n`;
    }
  }
  const el = document.getElementById('socialDiagram');
  el.className = 'mermaid';
  el.textContent = code;
  mermaid.run({ nodes: [el] });
}

// Update the URL Shortener scenario when options change
function setupUrlScenario() {
  const ctx = document.getElementById('urlChart').getContext('2d');
  const chart = buildChart(ctx);
  function update() {
    const opts = {
      db: document.querySelector('input[name="url-db"]:checked').value,
      shard: document.querySelector('input[name="url-shard"]:checked').value,
      cache: document.querySelector('input[name="url-cache"]:checked').value,
    };
    const metrics = computeUrlMetrics(opts);
    chart.data.datasets[0].data = [metrics.performance, metrics.scalability, metrics.faultTolerance, metrics.costEfficiency, metrics.simplicity];
    chart.update();
    updateUrlDiagram(opts);
    updateUrlSummary(opts, metrics);
  }
  document.querySelectorAll('input[name="url-db"], input[name="url-shard"], input[name="url-cache"]').forEach(el => {
    el.addEventListener('change', update);
  });
  update();
}

// Update the E‑commerce scenario
function setupEcomScenario() {
  const ctx = document.getElementById('ecomChart').getContext('2d');
  const chart = buildChart(ctx);
  function update() {
    const opts = {
      arch: document.querySelector('input[name="ecom-arch"]:checked').value,
      region: document.querySelector('input[name="ecom-region"]:checked').value,
      cache: document.querySelector('input[name="ecom-cache"]:checked').value,
      db: document.querySelector('input[name="ecom-db"]:checked').value,
    };
    const metrics = computeEcomMetrics(opts);
    chart.data.datasets[0].data = [metrics.performance, metrics.scalability, metrics.faultTolerance, metrics.costEfficiency, metrics.simplicity];
    chart.update();
    updateEcomDiagram(opts);
    updateEcomSummary(opts, metrics);
  }
  document.querySelectorAll('input[name="ecom-arch"], input[name="ecom-region"], input[name="ecom-cache"], input[name="ecom-db"]').forEach(el => {
    el.addEventListener('change', update);
  });
  update();
}

// Update the Social Media scenario
function setupSocialScenario() {
  const ctx = document.getElementById('socialChart').getContext('2d');
  const chart = buildChart(ctx);
  function update() {
    const opts = {
      consistency: document.querySelector('input[name="social-consistency"]:checked').value,
      db: document.querySelector('input[name="social-db"]:checked').value,
      partition: document.querySelector('input[name="social-partition"]:checked').value,
      cache: document.querySelector('input[name="social-cache"]:checked').value,
    };
    const metrics = computeSocialMetrics(opts);
    chart.data.datasets[0].data = [metrics.performance, metrics.scalability, metrics.faultTolerance, metrics.costEfficiency, metrics.simplicity];
    chart.update();
    updateSocialDiagram(opts);
    updateSocialSummary(opts, metrics);
  }
  document.querySelectorAll('input[name="social-consistency"], input[name="social-db"], input[name="social-partition"], input[name="social-cache"]').forEach(el => {
    el.addEventListener('change', update);
  });
  update();
}

// Initialize all scenarios on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setupUrlScenario();
  setupEcomScenario();
  setupSocialScenario();
});