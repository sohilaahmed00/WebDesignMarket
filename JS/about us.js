// Example: Simple count animation for stats
document.querySelectorAll('.stat-number').forEach(stat => {
    let target = parseFloat(stat.textContent);
    let count = 0;
    let increment = target / 50; // Speed of count
    let timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            stat.textContent = target + 'k';
            clearInterval(timer);
        } else {
            stat.textContent = count.toFixed(1) + 'k';
        }
    }, 50);
});
