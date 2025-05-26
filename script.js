// Update current time
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", { hour12: false });
  document.getElementById("current-time").textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

// Update countdown to market close
function updateCountdown() {
  const now = new Date();
  const closeTime = new Date();
  closeTime.setHours(16, 0, 0, 0); // Market closes at 4 PM

  if (now > closeTime) {
    closeTime.setDate(closeTime.getDate() + 1); // Set to next day if already past close
  }

  const diff = closeTime - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("countdown-hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("countdown-minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("countdown-seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  // Change color to red when less than 1 hour remains
  if (hours === 0) {
    document
      .getElementById("countdown-hours")
      .classList.add("cyber-countdown", "danger");
    document
      .getElementById("countdown-minutes")
      .classList.add("cyber-countdown", "danger");
    document
      .getElementById("countdown-seconds")
      .classList.add("cyber-countdown", "danger");
  } else {
    document.getElementById("countdown-hours").classList.remove("danger");
    document.getElementById("countdown-minutes").classList.remove("danger");
    document.getElementById("countdown-seconds").classList.remove("danger");
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Sample stock data
const stocks = [
  {
    symbol: "ARAS",
    name: "Arasaka Corp",
    price: 245.67,
    change: 3.45,
    percentChange: 1.42,
    volume: "4.5M",
    chartData: [
      240, 242, 243, 244, 245, 246, 245, 244, 245, 246, 245, 244, 245, 246, 245,
    ],
  },
  {
    symbol: "MILT",
    name: "Militech Intl",
    price: 187.32,
    change: -2.34,
    percentChange: -1.23,
    volume: "3.2M",
    chartData: [
      190, 189, 188, 187, 186, 187, 186, 187, 188, 187, 186, 187, 188, 187, 186,
    ],
  },
  {
    symbol: "KANG",
    name: "Kang Tao Arms",
    price: 92.45,
    change: 1.87,
    percentChange: 2.06,
    volume: "1.8M",
    chartData: [90, 91, 92, 91, 92, 93, 92, 91, 92, 93, 92, 91, 92, 93, 92],
  },
  {
    symbol: "NETW",
    name: "NetWatch",
    price: 156.78,
    change: 5.67,
    percentChange: 3.75,
    volume: "2.7M",
    chartData: [
      150, 152, 154, 155, 156, 157, 156, 155, 156, 157, 156, 155, 156, 157, 156,
    ],
  },
  {
    symbol: "BIOT",
    name: "Biotechnica",
    price: 78.23,
    change: -0.45,
    percentChange: -0.57,
    volume: "1.2M",
    chartData: [78, 79, 78, 77, 78, 79, 78, 77, 78, 79, 78, 77, 78, 79, 78],
  },
  {
    symbol: "TRAU",
    name: "Trauma Team",
    price: 134.56,
    change: 2.34,
    percentChange: 1.77,
    volume: "2.1M",
    chartData: [
      132, 133, 134, 133, 134, 135, 134, 133, 134, 135, 134, 133, 134, 135, 134,
    ],
  },
  {
    symbol: "ZETT",
    name: "Zetatech",
    price: 67.89,
    change: -1.23,
    percentChange: -1.78,
    volume: "3.5M",
    chartData: [69, 68, 67, 68, 69, 68, 67, 68, 69, 68, 67, 68, 69, 68, 67],
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 42876,
    change: -1245,
    percentChange: -2.82,
    volume: "24.5K",
    chartData: [
      44000, 43500, 43000, 42500, 43000, 42500, 43000, 42500, 43000, 42500,
      43000, 42500, 43000, 42500, 43000,
    ],
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2876,
    change: 45,
    percentChange: 1.6,
    volume: "18.7K",
    chartData: [
      2800, 2820, 2840, 2860, 2880, 2860, 2840, 2860, 2880, 2860, 2840, 2860,
      2880, 2860, 2840,
    ],
  },
];

// Render stock table
function renderStockTable() {
  const tableBody = document.getElementById("stock-table");
  tableBody.innerHTML = "";

  stocks.forEach((stock) => {
    const isCrypto = stock.symbol === "BTC" || stock.symbol === "ETH";
    const row = document.createElement("tr");
    row.className =
      "border-b border-gray-800 hover:bg-gray-900 hover:bg-opacity-50";

    const changeClass = stock.change >= 0 ? "stock-up" : "stock-down";
    const changeSymbol = stock.change >= 0 ? "+" : "";

    // Create mini sparkline chart
    const canvas = document.createElement("canvas");
    canvas.width = 80;
    canvas.height = 30;
    canvas.className = "sparkline-chart";

    const ctx = canvas.getContext("2d");
    drawSparkline(
      ctx,
      stock.chartData,
      changeClass.includes("up") ? "#00ff9d" : "#ff0000"
    );

    row.innerHTML = `
                    <td class="py-3">
                        <div class="font-bold ${
                          isCrypto ? "neon-text-blue" : "neon-text-pink"
                        }">${stock.symbol}</div>
                        <div class="text-xs text-gray-400">${stock.name}</div>
                    </td>
                    <td class="py-3 font-orbitron">₡ ${stock.price.toLocaleString()}</td>
                    <td class="py-3 font-orbitron ${changeClass}">${changeSymbol}${
      stock.change
    }</td>
                    <td class="py-3 font-orbitron ${changeClass}">${changeSymbol}${
      stock.percentChange
    }%</td>
                    <td class="py-3 text-gray-400">${stock.volume}</td>
                    <td class="py-3">
                        <div class="w-20 h-8">${canvas.outerHTML}</div>
                    </td>
                    <td class="py-3">
                        <div class="flex space-x-2">
                            <button class="cyber-button bg-green-900 bg-opacity-20 text-green-400 text-xs py-1 px-2 rounded border border-green-500 cyber-tooltip" data-tooltip="Buy ${
                              stock.symbol
                            }">
                                <i class="fas fa-arrow-up mr-1"></i>
                            </button>
                            <button class="cyber-button bg-red-900 bg-opacity-20 text-red-400 text-xs py-1 px-2 rounded border border-red-500 cyber-tooltip" data-tooltip="Sell ${
                              stock.symbol
                            }">
                                <i class="fas fa-arrow-down mr-1"></i>
                            </button>
                            <button class="cyber-button bg-gray-800 text-white text-xs py-1 px-2 rounded cyber-tooltip view-details" data-tooltip="View Details" data-symbol="${
                              stock.symbol
                            }">
                                <i class="fas fa-chart-bar"></i>
                            </button>
                        </div>
                    </td>
                `;

    tableBody.appendChild(row);
  });

  // Add event listeners to view details buttons
  document.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", () => {
      const symbol = button.getAttribute("data-symbol");
      showAssetModal(symbol);
    });
  });
}

// Draw sparkline chart
function drawSparkline(ctx, data, color) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const step = width / (data.length - 1);

  ctx.beginPath();

  data.forEach((value, index) => {
    const x = index * step;
    const y = height - ((value - min) / range) * height;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}

// Initialize charts
function initCharts() {
  // Mini chart
  const miniCtx = document.getElementById("miniChart").getContext("2d");
  const miniChart = new Chart(miniCtx, {
    type: "line",
    data: {
      labels: Array.from({ length: 15 }, (_, i) => i + 1),
      datasets: [
        {
          data: [
            240, 242, 243, 244, 245, 246, 245, 244, 245, 246, 245, 244, 245,
            246, 245,
          ],
          borderColor: "#05d9e8",
          borderWidth: 1,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  });

  // Main chart
  const mainCtx = document.getElementById("mainChart").getContext("2d");
  const mainChart = new Chart(mainCtx, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Arasaka Corp",
          data: [210, 215, 220, 218, 225, 230, 235, 240, 238, 242, 245, 250],
          borderColor: "#ff2a6d",
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        },
        {
          label: "Night City Index",
          data: [
            4000, 4100, 4150, 4200, 4250, 4300, 4280, 4320, 4300, 4350, 4320,
            4400,
          ],
          borderColor: "#05d9e8",
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "rgba(255, 255, 255, 0.5)",
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "rgba(255, 255, 255, 0.5)",
          },
        },
      },
    },
  });
}

// Show asset modal
function showAssetModal(symbol) {
  const asset = stocks.find((s) => s.symbol === symbol);
  if (!asset) return;

  document.getElementById(
    "modalAssetName"
  ).textContent = `${asset.name} (${asset.symbol})`;
  document.getElementById(
    "modalAssetPrice"
  ).textContent = `₡ ${asset.price.toLocaleString()}`;

  const changeClass = asset.change >= 0 ? "stock-up" : "stock-down";
  const changeSymbol = asset.change >= 0 ? "+" : "";
  document.getElementById(
    "modalAssetChange"
  ).textContent = `${changeSymbol}${asset.change} (${changeSymbol}${asset.percentChange}%)`;
  document.getElementById(
    "modalAssetChange"
  ).className = `text-sm ${changeClass}`;

  // Update modal chart
  const modalCtx = document.getElementById("modalChart").getContext("2d");
  if (window.modalChart) {
    window.modalChart.destroy();
  }

  window.modalChart = new Chart(modalCtx, {
    type: "line",
    data: {
      labels: Array.from({ length: asset.chartData.length }, (_, i) => i + 1),
      datasets: [
        {
          data: asset.chartData,
          borderColor: changeClass.includes("up") ? "#00ff9d" : "#ff0000",
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  });

  document.getElementById("assetModal").style.display = "flex";
}

// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("assetModal").style.display = "none";
});

// Simulate stock price changes
function simulateMarket() {
  // Randomly update some metrics
  const randomMetric = Math.floor(Math.random() * 4);
  const metricElement = document.querySelectorAll("#market-metrics > div")[
    randomMetric
  ];
  metricElement.classList.add("glow-blue");
  setTimeout(() => metricElement.classList.remove("glow-blue"), 1000);
}
