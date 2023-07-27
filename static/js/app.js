

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

function metadata(x){
    d3.json(url).then((data)=>{

        var metadata = data.metadata;
        var results = metadata.filter(sample=> sample.id ==x);
        console.log(results);

        var result = results[0];

        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");
        for (key in result){
            PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
          };

         
 })};


function charts(x){
    d3.json(url).then((data)=>{

        var samples = data.samples;
        var results = samples.filter(sample=> sample.id ==x);
        console.log(results);

        var result = results[0];

        var otu_ids = result.otu_ids;
        console.log(otu_ids);

        var sample_values = result.sample_values;
        console.log(sample_values);

        var otu_labels = result.otu_labels;
        console.log(otu_labels);



        // Plotting bar chart
        var trace1 = {
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x: sample_values.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: "h", 

        };

        var data = [trace1];
        
        var layout = {
            title: 'Top 10 OTU'
            
        };

        Plotly.newPlot("bar", data, layout);


        // Bubblechart plotting
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker:{
                color: otu_ids,
                size: sample_values,

            }

        };
        var data = [trace2];


        var layout2 = {
            
                title: 'Bubble Chart'
        };

        Plotly.newPlot("bubble", data, layout2);
         
})};



// Getting a reference to the button on the page with the id property
function newdemoinfo(){
    let button = d3.select("#selDataset");

    d3.json(url).then((data)=>{

        var names1 = data.names
        for(let i = 0; i < names1.length; i++){
            button
            .append('option')
            .text(names1[i])
            .property("value",names1[i]);


        };
        var firstID = names1[0];
        metadata(firstID);
        charts(firstID);

    })

    

};

function optionChanged(x){
    metadata(x);
    charts(x);


}

newdemoinfo();




