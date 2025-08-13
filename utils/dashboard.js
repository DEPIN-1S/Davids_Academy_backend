module.exports.calculateGrowth = (data) => {
    const { current_month, last_month, total_count } = data;
    const increase = current_month - last_month;

    if (last_month === 0) {
        return {
            percent: 100, // 100% growth if last month was zero
            increase,
            total_count
        };
    }

    const percent = ((increase / last_month) * 100).toFixed(2);
    return { percent, increase, total_count };
};
