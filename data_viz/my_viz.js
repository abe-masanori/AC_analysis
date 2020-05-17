function plot_speed(my_x, my_y, cpu_x, cpu_y, divId, title_y){
    var data_me = {
        x: my_x,
        y: my_y,
        mode: 'lines',
        name: 'me'
    };

    var data_cpu = {
        x: cpu_x,
        y: cpu_y,
        mode: 'lines',
        name: 'cpu'
    };

    var layout = {
        autosize: false,
        yaxis: {title: title_y},
        width: 600,
        height: 250,
        margin: {l: 70, r: 70, b: 25, t: 25}
    };

    Plotly.newPlot(divId, [data_me, data_cpu], layout);
}

my_data_distance = Array.from(my_data, x => x[2]);
cpu_data_distance = Array.from(cpu_data, x => x[2]);

my_data_speed = Array.from(my_data, x => x[3]);
cpu_data_speed = Array.from(cpu_data, x => x[3]);
plot_speed(
    my_data_distance, my_data_speed, cpu_data_distance, cpu_data_speed, 
    'div-speed', '速度 (km/h)'
);

my_data_throttle = Array.from(my_data, x => x[4]);
cpu_data_throttle = Array.from(cpu_data, x => x[4]);
plot_speed(
    my_data_distance, my_data_throttle, cpu_data_distance, cpu_data_throttle, 
    'div-throttle', 'アクセル開度'
);

my_data_throttle = Array.from(my_data, x => x[5]);
cpu_data_throttle = Array.from(cpu_data, x => x[5]);
plot_speed(
    my_data_distance, my_data_throttle, cpu_data_distance, cpu_data_throttle, 
    'div-brake', 'ブレーキ開度'
);

my_data_throttle = Array.from(my_data, x => x[6]);
cpu_data_throttle = Array.from(cpu_data, x => x[6]);
plot_speed(
    my_data_distance, my_data_throttle, cpu_data_distance, cpu_data_throttle, 
    'div-gear', 'ギア'
);
    
my_data_throttle = Array.from(my_data, x => x[7]);
cpu_data_throttle = Array.from(cpu_data, x => x[7]);
plot_speed(
    my_data_distance, my_data_throttle, cpu_data_distance, cpu_data_throttle, 
    'div-rpm', 'エンジン回転数 (rpm)'
);    

my_data_throttle = Array.from(my_data, x => x[8]);
cpu_data_throttle = Array.from(cpu_data, x => x[8]);
plot_speed(
    my_data_distance, my_data_throttle, cpu_data_distance, cpu_data_throttle, 
    'div-steer', 'ステアリング角度 (degree, +:右 -:左)'
);

function plot_position(min_distance, max_distance) {
    my_x = Array.from(my_data.filter(v => (min_distance < v[2]) && (v[2] < max_distance)), x => x[9]);
    my_z = Array.from(my_data.filter(v => (min_distance < v[2]) && (v[2] < max_distance)), x => x[11]);

    my_pos = {
        x: my_x,
        y: my_z,
        mode: 'scatter',
        mode: 'line',
    };

    var layout = {
        xaxis: {autorange: false, range: [-600, 600]},
        yaxis: {autorange: false, range: [600, -600]},
        autosize: false,
        width: 300,
        height: 300,
        margin: {l: 50, r: 50, b: 50, t: 50, pad: 10},
        showlegend: false,
        images: [{
            source: 'pos_base.png',
            xref: 'x',
            yref: 'y',
            x: 500,
            y: 600,
            xanchor: 'right',
            yanchor: 'bottom',
            sizex: 1000,
            sizey: 1200,
            sizing: 'stretch',
            opacity: 0.4,
            layer: 'below'
        }]
    };

    Plotly.react('div-position', [my_pos], layout);
}

plot_position(0.0, 1.8);

document.querySelector('#div-speed').on(
    'plotly_relayout',
    function(eventdata) {
        if(eventdata['xaxis.autorange']) {
            x_start = 0.0;
            x_end = 1.0;
            option = {'xaxis.autorange': true};
        } else {
            x_start = eventdata['xaxis.range[0]'];
            x_end = eventdata['xaxis.range[1]'];
            option = {'xaxis.range': [x_start, x_end]}
        }

        Plotly.relayout('div-throttle', option);
        Plotly.relayout('div-brake', option);
        Plotly.relayout('div-gear', option);
        Plotly.relayout('div-rpm', option);
        Plotly.relayout('div-steer', option);

        plot_position(x_start, x_end);
    }
);