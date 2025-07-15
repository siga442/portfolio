// charts.js

// Méretek és margók
const width = 300, height = 300, margin = 40;
const radius = Math.min(width, height) / 2 - margin;
const chartTitles = [
  { key: 'team size', label: 'Team Size' },
  { key: 'Customer Type', label: 'Customer Type' },
  { key: 'technology', label: 'Technology' }
];

// Színek (egységes paletta)
const colorPalette = d3.schemeSet2;

// Tooltip létrehozása
const tooltip = d3.select('body')
  .append('div')
  .attr('class', 'chart-tooltip')
  .style('position', 'absolute')
  .style('background', '#fff')
  .style('border', '1px solid #999')
  .style('padding', '8px 12px')
  .style('border-radius', '8px')
  .style('pointer-events', 'none')
  .style('opacity', 0);

// Diagramok kirajzolása
fetch('projects_data.json')
  .then(res => res.json())
  .then(data => {
    // Kategóriák összegyűjtése minden diagramhoz
    const allCategories = {};
    chartTitles.forEach(({ key }) => {
      allCategories[key] = Array.from(new Set(data.map(d => d[key])));
    });
    // Összes egyedi kategória a színekhez
    const uniqueCategories = Array.from(new Set([
      ...allCategories['team size'],
      ...allCategories['Customer Type'],
      ...allCategories['technology']
    ]));
    // Színskála
    const color = d3.scaleOrdinal()
      .domain(uniqueCategories)
      .range(colorPalette.concat(d3.schemeSet3, d3.schemeTableau10));

    // Konténer
    const container = d3.select('#charts')
      .style('display', 'flex')
      .style('gap', '32px')
      .style('justify-content', 'center');

    chartTitles.forEach(({ key, label }) => {
      // Csoportosítás kategóriánként
      const grouped = d3.groups(data, d => d[key]);
      // Szeletekhez: érték = elemszám
      const pieData = grouped.map(([cat, arr]) => ({
        category: cat,
        count: arr.length,
        avgLength: d3.mean(arr, d => +d['Lenght (m)'])
      }));
      // SVG létrehozása
      const svg = container.append('div')
        .style('text-align', 'center')
        .append('svg')
        .attr('width', width)
        .attr('height', height + 40);
      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);
      // Pie generátor
      const pie = d3.pie()
        .value(d => d.count)
        .sort(null);
      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
      // Szeletek
      g.selectAll('path')
        .data(pie(pieData))
        .join('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.category))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .on('mousemove', (event, d) => {
          tooltip
            .style('opacity', 1)
            .html(`<strong>${d.data.category}</strong><br>Átlagos hossz: ${d.data.avgLength.toFixed(1)} hónap`)
            .style('left', (event.pageX + 15) + 'px')
            .style('top', (event.pageY - 20) + 'px');
        })
        .on('mouseleave', () => {
          tooltip.style('opacity', 0);
        });
      // Cím
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 30)
        .attr('text-anchor', 'middle')
        .attr('font-size', '1.1rem')
        .attr('fill', '#1a2a6c')
        .text(label);
    });

    // Legenda
    const legend = container.append('div')
      .style('margin-left', '32px')
      .append('svg')
      .attr('width', 180)
      .attr('height', uniqueCategories.length * 24 + 10);
    uniqueCategories.forEach((cat, i) => {
      legend.append('rect')
        .attr('x', 10)
        .attr('y', 10 + i * 24)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', color(cat));
      legend.append('text')
        .attr('x', 36)
        .attr('y', 24 + i * 24)
        .attr('font-size', '1rem')
        .attr('fill', '#333')
        .text(cat);
    });
  });

// Tooltip stílus CSS-hez javaslat:
// .chart-tooltip { font-family: Roboto, sans-serif; font-size: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); z-index: 1000; }