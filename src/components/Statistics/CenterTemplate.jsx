const CenterTemplate = (pieChart) => {

    const formatNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
    }).format;

    function calculateTotal(pieChart) {
        return formatNumber(
            pieChart
                .getAllSeries()[0]
                .getVisiblePoints()
                .reduce((s, p) => s + Number(p.originalValue), 0),
        );
    }
    const { country } = pieChart.getAllSeries()[0].getVisiblePoints()[0].data;
    return (
        <svg>
            <circle
                cx="100"
                cy="100"
                r={pieChart.getInnerRadius() - 6}
                fill="#eee"
            ></circle>
            <text
                textAnchor="middle"
                x="100"
                y="90"
                style={{ fontSize: 18, fill: '#494949' }}
            >
                <tspan
                    x="100"
                    dy="20px"
                    style={{ fontWeight: 600, fontSize:"40px" }}
                >
                    {calculateTotal(pieChart)}h
                </tspan>
            </text>
        </svg>
    );
}

export default CenterTemplate;