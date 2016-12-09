var ColumnChart = function(container, chartTitle, series, categories) {
  var chart = new Highcharts.Chart({
    
    chart: {
      type: 'column',
      renderTo: container
    },

    title: {
      text: chartTitle,
    },

    series: series,

    xAxis: {
      categories: categories
    }
  });
}