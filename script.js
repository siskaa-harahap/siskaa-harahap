// ===== Chart Data =====
const ctx = document.getElementById("ikmChart");
new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["TW I", "TW II"],
        datasets: [{
            label: "Nilai IKM",
            data: [95.50, 88.00],
            backgroundColor: ["#b88a00", "#b88a00"]
        }]
    },
    options: {
        scales: {
            y: { beginAtZero: true }
        }
    }
});